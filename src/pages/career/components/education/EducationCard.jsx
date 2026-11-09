export const EducationCard = ({ edu, step }) => (
  <li className="relative pl-10 md:pl-0 md:pt-10">
    {/* node on the track */}
    <span
      className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-violet-400/60 bg-ink font-mono text-[10px] font-bold text-violet-300 md:left-0"
      aria-hidden="true"
    >
      {step}
    </span>

    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-[#151228] p-6 transition-colors hover:border-violet-400/40">
      {/* credential seal */}
      <i
        className={`fas ${edu.icon} pointer-events-none absolute -right-4 -bottom-6 text-[7rem] text-violet-500/[0.07] transition-transform duration-500 group-hover:-rotate-6`}
        aria-hidden="true"
      />

      <p className="font-mono text-xs text-violet-300">{edu.period}</p>
      <h3 className="mt-2 text-lg font-bold leading-snug text-white">{edu.degree}</h3>
      <p className="mt-1 text-sm text-gray-400">
        <span className="font-semibold" style={{ color: edu.accentColor }}>
          {edu.institution}
        </span>{" "}
        · {edu.levelBadge} · {edu.duration}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-gray-300">{edu.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Focus areas">
        {edu.focusTopics.map((topic) => (
          <li
            key={topic}
            className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-200"
          >
            {topic}
          </li>
        ))}
      </ul>
    </article>
  </li>
);
