import { CareerCardHeader } from "./CareerCardHeader";
import { CareerMilestones } from "./CareerMilestones";
import { CareerCardFooter } from "./CareerCardFooter";

export const CareerCard = ({ job, index, total, onSelectTech, onSelectCert }) => (
  <article className="stack-card relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 md:p-8 shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.8)]">
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
  </article>
);
