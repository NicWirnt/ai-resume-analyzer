interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  let bgColor = "from-red-100";
  let icon = "/icons/ats-bad.svg";

  if (score > 70) {
    bgColor = "from-green-100";
    icon = "/icons/ats-good.svg";
  } else if (score > 49) {
    bgColor = "from-yellow-100";
    icon = "/icons/ats-warning.svg";
  }

  return (
    <div
      className={`bg-gradient-to-b ${bgColor} to-white rounded-2xl shadow-md p-6 flex flex-col gap-6`}
    >
      <div className="flex flex-row items-center gap-4">
        <img src={icon} alt="ATS Icon" className="w-12 h-12" />
        <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold">ATS Compatibility</h3>
          <p className="text-gray-500 text-sm">
            This section analyzes how well your resume is optimized for
            Applicant Tracking Systems.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex flex-row gap-3 items-start">
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type}
                className="w-5 h-5 mt-0.5"
              />
              <p className="text-gray-700">{suggestion.tip}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium text-gray-600 italic text-center">
        Keep improving your resume to increase your chances of getting noticed!
      </p>
    </div>
  );
};

export default ATS;