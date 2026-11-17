import { GlowBubbles, SectionWave } from "./SectionDecor";

/**
 * Consistent page section: max width, gutters, vertical rhythm, heading.
 * Optional decoration: `background` (color), `bubbles` (GlowBubbles) and
 * `wave` (color of the next section, drawn as a wave at the bottom).
 * `backdrop`: a drawing placed behind the content, covering the section
 * (`backdropOnPhones={false}`: only from lg up, for drawings made for wide
 * screens).
 * `art`: phones/tablets only (below lg), an illustration that fills whatever
 * room a full-screen band has left under its content, so the band never
 * ends in a big empty space; it shrinks away when there is no room.
 * `fullScreen`: on large screens the section fills the viewport below the
 * navbar and is a scroll-snap stop (see .snap-section / html.section-paging).
 */
export const Section = ({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  fullScreen = false,
  background,
  bubbles,
  wave,
  waveFlip = false,
  backdrop,
  backdropOnPhones = true,
  art,
}) => (
  <section
    id={id}
    className={`relative isolate ${
      fullScreen
        ? // full-screen bands also fit a phone screen: tighter padding there
          `snap-section pt-8 sm:py-24 lg:py-4 ${wave ? "pb-16 sm:pb-32" : "pb-8"}`
        : `py-16 sm:py-24 ${wave ? "pb-24 sm:pb-32" : ""}`
    } ${className}`}
    style={background ? { backgroundColor: background } : undefined}
  >
    {bubbles && <GlowBubbles bubbles={bubbles} />}
    {backdrop && (
      <div
        className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${backdropOnPhones ? "" : "hidden lg:block"}`}
        aria-hidden="true"
      >
        {backdrop}
      </div>
    )}
    {wave && <SectionWave fill={wave} flip={waveFlip} />}
    <div
      className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${
        art ? "flex flex-1 flex-col lg:block" : ""
      }`}
    >
      {(eyebrow || title || intro) && (
        <header className={`max-w-2xl ${fullScreen ? "mb-6 sm:mb-10 lg:mb-6" : "mb-10 sm:mb-14"}`}>
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
          {intro && (
            <p
              className={`mt-4 text-gray-400 leading-relaxed ${
                fullScreen ? "text-sm sm:text-base line-clamp-3 sm:line-clamp-none" : ""
              }`}
            >
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
      {art && (
        <div className="flex min-h-0 flex-1 basis-0 items-center justify-center overflow-hidden pt-4 lg:hidden" aria-hidden="true">
          {art}
        </div>
      )}
    </div>
  </section>
);
