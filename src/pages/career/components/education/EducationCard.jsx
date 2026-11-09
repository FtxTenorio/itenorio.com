import { TimelineDot } from "../ui/TimelineDot";

export const EducationCard = ({ edu }) => (
  <div className="relative group">
    <TimelineDot color={edu.accentColor} />

    <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 md:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <i className={`fas ${edu.icon} text-purple-400 text-base`} />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {edu.degree}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-medium">
              <span style={{ color: edu.accentColor }} className="font-bold">
                {edu.institution}
              </span>
              <span className="text-gray-500">•</span>
              <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-md">
                {edu.levelBadge}
              </span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right shrink-0 pl-13 md:pl-0">
          <div className="text-xs md:text-sm font-semibold text-gray-200">
            {edu.period}
          </div>
          <div className="text-[11px] text-gray-400">
            {edu.duration} · Completed
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-gray-300 text-xs md:text-sm mt-4 leading-relaxed">
        {edu.summary}
      </p>

      {/* Topics */}
      <div className="mt-5 pt-4 border-t border-white/5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
          Core Curriculum & Focus Areas
        </span>
        <div className="flex flex-wrap gap-2">
          {edu.focusTopics.map((topic, idx) => (
            <span
              key={idx}
              className="bg-black/30 border border-white/10 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: edu.accentColor }}
              />
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
