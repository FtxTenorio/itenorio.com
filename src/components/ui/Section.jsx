/**
 * Consistent page section: max width, gutters, vertical rhythm, heading.
 * `fullScreen`: on large screens the section fills the viewport below the
 * navbar and is a scroll-snap stop (see .snap-section / html.home-snap).
 */
export const Section = ({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  fullScreen = false,
}) => (
  <section
    id={id}
    className={`py-16 sm:py-24 ${fullScreen ? "snap-section lg:py-4" : ""} ${className}`}
  >
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {(eyebrow || title || intro) && (
        <header className={`max-w-2xl ${fullScreen ? "mb-10 lg:mb-6" : "mb-10 sm:mb-14"}`}>
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
          )}
          {intro && <p className="mt-4 text-gray-400 leading-relaxed">{intro}</p>}
        </header>
      )}
      {children}
    </div>
  </section>
);
