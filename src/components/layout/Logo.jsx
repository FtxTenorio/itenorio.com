import { Link } from "react-router-dom";

// "iT" + "enorio": the brand is a play on IT (information technology) and
// Tenorio, so the "iT" is drawn as a terminal-style chip.
export const Logo = ({ className = "" }) => (
  <Link
    to="/"
    className={`group inline-flex items-center gap-2 text-white hover:opacity-95 transition-opacity ${className}`}
    aria-label="iTenorio Tech — home"
  >
    <span className="inline-flex items-center font-extrabold text-xl tracking-tight">
      <span
        className="relative mr-0 inline-flex items-center rounded-md border border-brand-soft/40 bg-brand/15 pl-1.5 pr-[3px] py-0.5 font-mono text-[1.05rem] leading-none text-brand-soft shadow-[0_0_14px_rgba(56,189,248,0.25)] transition-shadow group-hover:shadow-[0_0_20px_rgba(56,189,248,0.45)]"
        aria-hidden="true"
      >
        <span className="text-brand-soft/50 mr-0.5 text-[0.8rem]">&gt;</span>
        iT
        <span className="logo-caret ml-[2px] inline-block h-[0.9em] w-[2px] bg-brand-soft" />
      </span>
      <span aria-hidden="true">enorio</span>
    </span>
    <span
      className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-gray-500"
      aria-hidden="true"
    >
      Tech
    </span>
  </Link>
);
