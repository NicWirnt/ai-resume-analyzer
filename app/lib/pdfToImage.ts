export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    loadPromise = import("pdfjs-dist").then((lib) => {
        // In some environments, we might need to access .default
        const pdfjs = lib.default || lib;
        // Set the worker source to use local file
        const workerPath = "/pdf.worker.min.mjs";
        pdfjs.GlobalWorkerOptions.workerSrc = typeof window !== 'undefined' 
            ? window.location.origin + workerPath 
            : workerPath;

        pdfjsLib = pdfjs;
        isLoading = false;
        return pdfjs;
    }).catch(err => {
        isLoading = false;
        loadPromise = null;
        console.error("Failed to load PDF.js", err);
        throw err;
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        
        const loadingTask = lib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        
        const pages = [];
        let totalHeight = 0;
        let maxWidth = 0;

        // Load all pages and calculate total dimensions
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            pages.push({ page, viewport });
            totalHeight += viewport.height;
            maxWidth = Math.max(maxWidth, viewport.width);
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = totalHeight;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            // Set white background
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        let currentY = 0;
        for (const { page, viewport } of pages) {
            await page.render({ 
                canvasContext: context!, 
                viewport,
                transform: [1, 0, 0, 1, 0, currentY] // Offset the page vertically
            }).promise;
            currentY += viewport.height;
        }

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}