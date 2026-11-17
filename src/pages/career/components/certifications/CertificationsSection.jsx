import { useRef } from "react";
import { certifications, studyingFor } from "../../../../data/certifications";
import { useReveal } from "../../../../hooks/useReveal";
import { SectionHeader } from "../ui/SectionHeader";

const CREDLY_URL = "https://link.itenorio.com/CREDLY";

// Oldest year first, so the credentials pile up as the years go by.
const byYear = Object.entries(
  certifications.reduce((years, cert) => {
    (years[cert.yearEarned] ??= []).push(cert);
    return years;
  }, {}),
).sort(([a], [b]) => Number(a) - Number(b));

const DIFFICULTY = {
  easy: { label: "Foundational", className: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
  medium: { label: "Associate", className: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
  hard: { label: "Advanced", className: "text-rose-300 border-rose-400/30 bg-rose-400/10" },
};

/**
 * Certifications over the years: one column per year (a vertical timeline
 * on phones). When the section scrolls into view the years come in one after
 * the other and each badge is "earned" (flips in with a shine), in the order
 * they were obtained. The last column is the next year: the certifications
 * being studied for now (dashed, "Studying"), apart from the earned ones.
 * Ends with the link to verify every badge on Credly.
 */
export const CertificationsSection = ({ onSelectCert }) => {
  const listRef = useRef(null);
  useReveal(listRef, { threshold: 0.15 });

  return (
    <section id="certifications" className="w-full max-w-5xl mx-auto" aria-labelledby="certifications-title">
      <SectionHeader
        id="certifications-title"
        eyebrow="Certifications"
        title="Earned along the way"
        subtitle={`Cloud and infrastructure credentials, year by year, and what I'm studying for in ${studyingFor.year}. Tap a badge for what it validates.`}
      />

      <ol
        ref={listRef}
        className="relative grid gap-8 lg:grid-cols-[repeat(var(--years),minmax(0,1fr))] lg:gap-5"
        style={{ "--years": byYear.length + 1 }}
      >
        <span
          className="reveal-track absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-400/50 to-amber-400/10 lg:left-3 lg:right-3 lg:top-[11px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
          aria-hidden="true"
        />
        {byYear.map(([year, certs], yearIndex) => (
          <li
            key={year}
            className="relative pl-10 lg:pl-0 lg:pt-10"
            style={{ "--reveal-delay": `${0.2 + yearIndex * 0.35}s` }}
          >
            <span
              className="reveal-node absolute left-0 top-0 h-6 w-6 rounded-full border border-amber-400/60 bg-ink"
              aria-hidden="true"
            >
              <span className="absolute inset-1.5 rounded-full bg-amber-400/70" />
            </span>
            <p className="reveal-item mb-3 font-mono text-2xl font-bold text-white lg:text-3xl">{year}</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {certs.map((cert, certIndex) => {
                const level = DIFFICULTY[cert.difficulty];
                return (
                  <li
                    key={cert.id}
                    className="reveal-badge"
                    style={{ "--reveal-delay": `${0.45 + yearIndex * 0.35 + certIndex * 0.15}s` }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectCert(cert)}
                      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-surface/80 p-3 text-left transition-colors hover:border-amber-400/50"
                    >
                      <span className="badge-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
                      <img
                        src={cert.img}
                        alt=""
                        loading="lazy"
                        className="h-14 w-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-snug text-white">{cert.name}</span>
                        <span className="block text-xs text-gray-400">{cert.issuer}</span>
                        {level && (
                          <span className={`mt-1.5 inline-block rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${level.className}`}>
                            {level.label}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}

        {/* next year: being studied for now */}
        <li
          className="relative pl-10 lg:pl-0 lg:pt-10"
          style={{ "--reveal-delay": `${0.2 + byYear.length * 0.35}s` }}
        >
          <span
            className="reveal-node absolute left-0 top-0 h-6 w-6 rounded-full border border-dashed border-sky-400/70 bg-ink"
            aria-hidden="true"
          >
            <span className="absolute inset-1.5 animate-ping rounded-full bg-sky-400/50" />
          </span>
          <p className="reveal-item mb-3 flex items-center gap-3 font-mono text-2xl font-bold text-white lg:text-3xl">
            {studyingFor.year}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              <i className="fas fa-book-open text-[10px]" aria-hidden="true" />
              Studying
            </span>
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {studyingFor.certs.map((cert, certIndex) => (
              <li
                key={cert.id}
                className="reveal-badge"
                style={{ "--reveal-delay": `${0.45 + byYear.length * 0.35 + certIndex * 0.15}s` }}
              >
                <div className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-dashed border-sky-400/35 bg-sky-400/[0.04] p-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-ink text-xl text-sky-300">
                    <i className={`fas ${cert.icon}`} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug text-white">{cert.name}</span>
                    <span className="block text-xs text-gray-400">{cert.issuer}</span>
                    <span className="mt-1.5 inline-block whitespace-nowrap rounded border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                      {cert.level}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ol>

      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-white">{certifications.length} credentials</span>, all
          publicly verifiable.
        </p>
        <a
          href={CREDLY_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-400/20"
        >
          <i className="fas fa-certificate text-amber-300" aria-hidden="true" />
          Verify all badges on Credly
          <i className="fas fa-arrow-up-right-from-square text-xs text-amber-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
