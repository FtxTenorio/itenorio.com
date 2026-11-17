import { useEffect, useState } from "react";

/**
 * How far along an in-progress course is today (0-100) and which month it is
 * in. Computed in the browser only, so the pre-rendered page (built on another
 * day) never disagrees with it.
 */
function useCourseProgress(inProgress) {
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    if (!inProgress) return;
    const start = new Date(`${inProgress.start}T00:00:00`);
    const end = new Date(`${inProgress.end}T23:59:59`);
    const now = new Date();
    const percent = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1;
    const month = Math.min(
      months,
      Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth() + 1),
    );
    setProgress({ percent, month, months });
  }, [inProgress]);
  return progress;
}

export const EducationCard = ({ edu, step, delay = 0 }) => {
  const progress = useCourseProgress(edu.inProgress);
  const current = Boolean(edu.inProgress);

  return (
    <li className="relative pl-10 lg:pl-0 lg:pt-10" style={{ "--reveal-delay": `${delay}s` }}>
      {/* node on the track */}
      {/* data-trace-stop: CareerTrace runs through steps 1 → 2 → 3 */}
      <span
        data-trace-stop="center"
        className={`reveal-node absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-ink font-mono text-[10px] font-bold ${
          current ? "border-sky-400/70 text-sky-300" : "border-violet-400/60 text-violet-300"
        }`}
        aria-hidden="true"
      >
        {current && <span className="absolute inset-0 animate-ping rounded-full border border-sky-400/50" />}
        {step}
      </span>

      {/* the in-progress course is where CareerTrace ends and lights up */}
      <article
        data-trace-highlight={current || undefined}
        className={`reveal-item group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-surface p-6 transition-colors ${
          current
            ? "border-sky-400/30 to-[#0f1d33] hover:border-sky-400/50"
            : "border-white/10 to-[#151228] hover:border-violet-400/40"
        }`}
      >
        {/* credential seal */}
        <i
          className={`fas ${edu.icon} pointer-events-none absolute -right-4 -bottom-6 text-[7rem] transition-transform duration-500 group-hover:-rotate-6 ${
            current ? "text-sky-400/[0.07]" : "text-violet-500/[0.07]"
          }`}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between gap-3">
          <p className={`font-mono text-xs ${current ? "text-sky-300" : "text-violet-300"}`}>{edu.period}</p>
          {current && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
              In progress
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug text-white">{edu.degree}</h3>
        <p className="mt-1 text-sm text-gray-400">
          <span className="font-semibold" style={{ color: edu.accentColor }}>
            {edu.institution}
          </span>{" "}
          · {edu.levelBadge} · {edu.duration}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-gray-300">{edu.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Focus areas">
          {edu.focusTopics.map((topic, index) => (
            <li
              key={topic}
              className={`reveal-chip rounded-md border px-2 py-1 text-[11px] font-medium ${
                current
                  ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
                  : "border-violet-400/20 bg-violet-500/10 text-violet-200"
              }`}
              style={{ "--reveal-delay": `${delay + 0.35 + index * 0.06}s` }}
            >
              {topic}
            </li>
          ))}
        </ul>

        {current && (
          <div className="mt-auto pt-6">
            <div className="mb-1.5 flex justify-between text-[11px] text-gray-400">
              <span>{progress ? `Month ${progress.month} of ${progress.months}` : "Under way"}</span>
              <span>Expected {edu.period.split(" - ")[1]}</span>
            </div>
            <div
              className="relative h-1.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Course progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress ? Math.round(progress.percent) : undefined}
            >
              <span
                className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-[width] duration-1000"
                style={{ width: `${Math.max(progress?.percent ?? 0, 3)}%` }}
              >
                <span className="progress-sheen absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </span>
            </div>
          </div>
        )}
      </article>
    </li>
  );
};
