import { Link } from "react-router-dom";
import { yearsOfExperience } from "../../../data/careerTrajectory";
import { GlowBubbles, SectionWave } from "../../../components/ui/SectionDecor";
import { HOME_BG } from "../../../config/theme";

const FACTS = [
  { value: "Brazil", label: "São Paulo-based LTDA" },
  { value: "Remote", label: "Working with people worldwide" },
  { value: `${yearsOfExperience()}+ yrs`, label: "Backend & cloud engineering" },
];

export const HeroSection = () => (
  <section
    className="snap-section relative isolate overflow-hidden pb-8 sm:pb-16"
    style={{ backgroundColor: HOME_BG.base }}
  >
    <GlowBubbles
      bubbles={[
        { color: "#0078d7", className: "-top-32 left-1/3 w-[36rem] h-[24rem]" },
        { color: "#38bdf8", className: "bottom-[10%] -right-32 w-[24rem] h-[24rem]" },
      ]}
    />
    <SectionWave fill={HOME_BG.alt} />
    {/* phones: one swipe moves one band (useSectionPaging); say so */}
    <div className="swipe-hint pointer-events-none absolute inset-x-0 bottom-16 z-10 flex flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 lg:hidden" aria-hidden="true">
      <i className="fas fa-chevron-up text-brand-soft" />
      Swipe up
    </div>
    {/* Subtle grid + glow background */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] bg-brand/20 blur-[120px] rounded-full pointer-events-none"
      aria-hidden="true"
    />

    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-28 sm:pb-24 lg:py-4">
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-gray-300 mb-5 sm:mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        Independent software studio · São Paulo, Brazil
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-3xl">
        Focused software,{" "}
        <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
          built with care.
        </span>
      </h1>

      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
        iTenorio Tech is a small software development company. We build
        browser extensions people use every day, websites for small
        businesses, and the backend systems behind them.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href="#product"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand hover:bg-[#0a86ee] font-semibold transition-colors"
        >
          See our featured product
          <i className="fas fa-arrow-down text-sm" aria-hidden="true" />
        </a>
        <Link
          to="/#contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:bg-white/5 font-semibold text-gray-200 transition-colors"
        >
          Get in touch
        </Link>
      </div>

      <dl className="mt-8 sm:mt-14 grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-line bg-line max-w-3xl">
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse justify-end bg-ink px-3 py-3 sm:px-5 sm:py-4">
            <dt className="text-[11px] leading-snug text-gray-500 sm:text-xs">{fact.label}</dt>
            <dd className="text-base font-semibold text-white sm:text-lg">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
