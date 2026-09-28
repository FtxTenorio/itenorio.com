import { useState } from "react";
import { MilestoneItem } from "./MilestoneItem";

export const CareerMilestones = ({
  milestones,
  onSelectTech,
  onSelectCert,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="mt-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-2 mb-3"
      >
        <i
          className={`fas fa-chevron-${isExpanded ? "down" : "right"} text-[10px]`}
        />
        <span>
          {isExpanded
            ? "Hide Yearly Evolution (2021 - 2025)"
            : "Show Yearly Evolution (2021 - 2025)"}
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-4 pl-3 md:pl-4 border-l border-amber-500/30 mt-2">
          {milestones.map((ms, idx) => (
            <MilestoneItem
              key={idx}
              milestone={ms}
              onSelectTech={onSelectTech}
              onSelectCert={onSelectCert}
            />
          ))}
        </div>
      )}
    </div>
  );
};
