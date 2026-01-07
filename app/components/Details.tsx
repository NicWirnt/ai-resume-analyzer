import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { cn } from "~/utils/utils";
import { Check, AlertCircle } from "lucide-react";

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const isGood = score > 70;
  const isAverage = score > 49;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold",
        isGood
          ? "bg-green-100 text-green-700"
          : isAverage
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      )}
    >
      {isGood && <Check className="w-4 h-4" />}
      <span>{score}/100</span>
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader = ({ title, categoryScore }: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent = ({ tips }: CategoryContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border",
              tip.type === "good"
                ? "bg-green-50/50 border-green-100"
                : "bg-red-50/50 border-red-100"
            )}
          >
            <div
              className={cn(
                "mt-0.5",
                tip.type === "good" ? "text-green-600" : "text-red-600"
              )}
            >
              {tip.type === "good" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-700">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg",
              tip.type === "good" ? "bg-green-50" : "bg-red-50"
            )}
          >
            <h4
              className={cn(
                "text-sm font-bold mb-1",
                tip.type === "good" ? "text-green-800" : "text-red-800"
              )}
            >
              {tip?.tip}
            </h4>
            <p
              className={cn(
                "text-sm",
                tip.type === "good" ? "text-green-700" : "text-red-700"
              )}
            >
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {

  const sections = [
    {
      id: "tone-and-style",
      title: "Tone & Style",
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
    },
    {
      id: "content",
      title: "Content",
      score: feedback.content.score,
      tips: feedback.content.tips,
    },
    {
      id: "structure",
      title: "Structure",
      score: feedback.structure.score,
      tips: feedback.structure.tips,
    },
    {
      id: "skills",
      title: "Skills",
      score: feedback.skills.score,
      tips: feedback.skills.tips,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Accordion allowMultiple>
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            id={section.id}
            className="border border-gray-200 rounded-xl mb-4 overflow-hidden"
          >
            <AccordionHeader itemId={section.id} className="hover:bg-gray-50/50">
              <CategoryHeader
                title={section.title}
                categoryScore={section.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={section.id}>
              <CategoryContent tips={section.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;