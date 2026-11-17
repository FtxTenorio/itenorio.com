import { useState } from "react";
import { CareerCardHeader } from "./CareerCardHeader";
import { CareerMilestones } from "./CareerMilestones";
import { CareerCardFooter } from "./CareerCardFooter";

/**
 * One job of the experience stack. On phones the details (highlights, the
 * year by year milestones, stack and certifications) start folded behind
 * "Show details", so every card fits the screen and the sticky stack works
 * there as on desktop (useStackedCards); from md up they are always shown.
 */
export const CareerCard = ({ job, index, total, onSelectTech, onSelectCert }) => {
  const [open, setOpen] = useState(false);
  const details = open ? "block" : "hidden md:block";

  return (
    <article className="stack-card relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-5 md:p-8 shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.8)]">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: job.accentColor }}
        aria-hidden="true"
      />
      <p className="mb-3 font-mono text-[11px] text-gray-500" aria-hidden="true">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <CareerCardHeader job={job} />

      <p className="text-gray-300 text-sm mt-4 leading-relaxed">{job.summary}</p>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-semibold text-gray-200 md:hidden"
      >
        <i className={`fas fa-chevron-${open ? "up" : "down"} text-[10px]`} aria-hidden="true" />
        {open ? "Hide details" : "Show details"}
      </button>

      <div className={details}>
        {job.highlights && (
          <ul className="mt-4 space-y-2">
            {job.highlights.map((item) => (
              <li key={item} className="text-sm text-gray-400 flex items-start gap-2.5 leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: job.accentColor }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <CareerMilestones
          milestones={job.milestones}
          onSelectTech={onSelectTech}
          onSelectCert={onSelectCert}
        />

        <CareerCardFooter job={job} onSelectTech={onSelectTech} onSelectCert={onSelectCert} />
      </div>
    </article>
  );
};
