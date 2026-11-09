import { useState } from "react";
import { MilestoneItem } from "./MilestoneItem";

export const CareerMilestones = ({
  milestones,
  onSelectTech,
  onSelectCert,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!milestones || milestones.length === 0) return null;
  const years = milestones.map((ms) => Number(ms.year)).filter(Boolean);
  const range = `${Math.min(...years)} – ${Math.max(...years)}`;

  return (
    <div className="mt-5">
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-2 mb-3"
      >
        <i
          className={`fas fa-chevron-${isExpanded ? "down" : "right"} text-[10px]`}
        />
        <span>
          {isExpanded ? "Hide" : "Show"} year by year ({range})
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
