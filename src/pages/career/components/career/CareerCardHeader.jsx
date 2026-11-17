export const CareerCardHeader = ({ job }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/5">
    {/* the company is the title, the role under it; at a company with
        several levels (Compass.uol) each card shows the level reached */}
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg md:text-xl font-bold" style={{ color: job.accentColor }}>
          {job.company}
        </h3>
        {job.isCurrent && (
          <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
            Active
          </span>
        )}
        {job.level && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ color: job.accentColor, borderColor: `${job.accentColor}66`, backgroundColor: `${job.accentColor}1a` }}
          >
            {job.promotedFrom && <i className="fas fa-arrow-up" aria-hidden="true" />}
            Level {job.level}
            <span className="sr-only">{job.promotedFrom ? `, promoted from ${job.promotedFrom}` : ""}</span>
          </span>
        )}
      </div>
      <p className="mt-1 text-base font-semibold text-white">{job.role}</p>
      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-300 font-medium">
        {job.promotedFrom && (
          <span className="text-xs text-gray-400">Promoted from {job.promotedFrom}</span>
        )}
        {job.badgeNote && (
          <span className="bg-white/5 border border-white/10 text-gray-300 text-[11px] px-2 py-0.5 rounded-md">
            {job.badgeNote}
          </span>
        )}
        {(job.promotedFrom || job.badgeNote) && <span className="text-gray-500">•</span>}
        <span className="text-xs text-gray-400">{job.employmentType}</span>
      </div>
    </div>

    <div className="text-left md:text-right shrink-0">
      <div className="text-xs md:text-sm font-semibold text-gray-200">
        {job.period}
      </div>
      <div className="text-[11px] text-gray-400">
        {job.duration} · {job.location}
      </div>
    </div>
  </div>
);
