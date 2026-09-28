import { ModalWrapper } from "./ModalWrapper";

export const TechModal = ({ stack, onClose }) => (
  <ModalWrapper isOpen={Boolean(stack)} onClose={onClose} maxWidth="max-w-sm">
    {stack && (
      <>
        <div className="flex items-center gap-4 mb-5 pr-6">
          <img
            src={stack.icon}
            alt={stack.name}
            className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0"
          />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {stack.name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="inline-block bg-[#0078d7]/20 border border-[#0078d7]/30 text-[#0078d7] text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                {stack.years} {stack.years === 1 ? "Year" : "Years"} Exp.
              </span>
              <span className="inline-block bg-white/5 border border-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-md font-mono">
                Started in {stack.startedYear}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-4">
          <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-2 text-left">
            Technical Scope
          </h4>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-left">
            {stack.description}
          </p>
        </div>
      </>
    )}
  </ModalWrapper>
);
