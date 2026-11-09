import { techStack } from "../../../../data/techStack";

export const TechSummaryCard = ({ onSelectTech }) => (
  <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0078d7]" />
            Tech Arsenal
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Click any stack item to inspect technical scope
          </p>
        </div>
        <span className="bg-[#0078d7]/15 border border-[#0078d7]/40 text-blue-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
          {techStack.length} Technologies
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {techStack.map((stack) => (
          <button
            key={stack.id}
            onClick={() => onSelectTech(stack)}
            className="bg-black/30 hover:bg-[#1a2235] border border-white/10 hover:border-[#0078d7]/50 rounded-xl p-3 flex items-center justify-between transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <img
                src={stack.icon}
                alt={stack.name}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="text-xs font-bold text-gray-200 group-hover:text-white">
                  {stack.name}
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  Since {stack.startedYear}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-[#0078d7]/15 text-blue-300 border border-[#0078d7]/30 px-2 py-0.5 rounded-md">
              {stack.years} {stack.years === 1 ? "yr" : "yrs"}
            </span>
          </button>
        ))}
      </div>
    </div>

    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
      <span>Primary Focus: Backend & Cloud IaC</span>
      <span className="text-blue-400 font-mono">2021 — Present</span>
    </div>
  </div>
);
