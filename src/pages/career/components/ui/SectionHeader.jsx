export const SectionHeader = ({ id, eyebrow, title, subtitle }) => (
  <header className="mb-10 w-full">
    {eyebrow && (
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">{eyebrow}</p>
    )}
    <h2 id={id} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
      {title}
    </h2>
    {subtitle && <p className="mt-3 max-w-2xl text-gray-400 leading-relaxed">{subtitle}</p>}
  </header>
);
