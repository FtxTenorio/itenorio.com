const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    textColor: "text-green-400",
    bars: ["bg-green-500", "bg-white/10", "bg-white/10"],
  },
  medium: {
    label: "Medium",
    textColor: "text-yellow-400",
    bars: ["bg-yellow-500", "bg-yellow-500", "bg-white/10"],
  },
  hard: {
    label: "Hard",
    textColor: "text-red-400",
    bars: ["bg-red-500", "bg-red-500", "bg-red-500"],
  },
};

export const SignalStrength = ({ difficulty }) => {
  const config = DIFFICULTY_CONFIG[difficulty];
  if (!config) return null;

  const heights = ["h-2", "h-3", "h-4"];

  return (
    <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-md border border-white/5">
      <div
        className="flex items-end gap-0.5"
        title={`Difficulty: ${config.label}`}
      >
        {config.bars.map((barColor, idx) => (
          <div
            key={idx}
            className={`w-1.5 ${heights[idx]} rounded-sm ${barColor}`}
          />
        ))}
      </div>
      <span className={`${config.textColor} text-xs font-semibold uppercase`}>
        {config.label}
      </span>
    </div>
  );
};
