# AI-Powered Applicant Tracker (Resume Analyzer Mind)

A modern, full-stack application built with React Router and Puter.js that provides AI-powered feedback on resumes. Optimize your job applications with smart ATS scoring and improvement suggestions.

## 🚀 Features

- **AI Resume Analysis**: Get detailed feedback, ATS scores, and improvement tips for your resume based on specific job descriptions.
- **PDF to Image Conversion**: Seamlessly handles PDF resumes by converting them for AI visual analysis.
- **Persistent Storage**: Securely stores your resumes and analysis history using Puter.js Key-Value storage and File System.
- **Authentication**: Built-in authentication powered by Puter.js.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and React Router.
- **Real-time Processing**: Visual feedback during resume scanning and AI analysis.

## 🛠️ Tech Stack

- **Framework**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Cloud Services**: [Puter.js](https://puter.com/) (Auth, KV Storage, File System, AI)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js installed on your machine.
- A [Puter.com](https://puter.com/) account (the app uses Puter.js for cloud features).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Ai-Powered-Applicant-Track
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

## 🐳 Docker Deployment

To build and run using Docker:
```bash
docker build -t ai-applicant-tracker .

# Run the container
docker run -p 3000:3000 ai-applicant-tracker
```

## 📂 Project Structure

- `app/components/`: Reusable UI components (FileUploader, ResumeCard, Navbar, etc.).
- `app/routes/`: Application pages (Home, Upload, Resume Details, Auth).
- `app/lib/`: Integration with Puter.js and other libraries.
- `app/utils/`: Helper functions.
- `constants/`: Global constants and AI prompt instructions.

---

Built with ❤️ using React Router and Puter.js.
