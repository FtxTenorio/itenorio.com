import { Link } from "react-router-dom";

// "iT" + "enorio": the brand is a play on IT (information technology) and
// Tenorio, so the whole name sits in a terminal-style box, with "iT"
// highlighted and a blinking caret at the end.
export const Logo = ({ className = "" }) => (
  <Link
    to="/"
    className={`group inline-flex items-center gap-2.5 text-white hover:opacity-95 transition-opacity ${className}`}
    aria-label="iTenorio Tech — home"
  >
    <span
      className="inline-flex items-center rounded-md border border-brand-soft/40 bg-brand/15 px-2 py-1 font-mono text-[1.05rem] font-bold leading-none tracking-tight shadow-[0_0_14px_rgba(56,189,248,0.25)] transition-shadow group-hover:shadow-[0_0_20px_rgba(56,189,248,0.45)]"
      aria-hidden="true"
    >
      <span className="mr-1 text-[0.8em] text-brand-soft/50">&gt;</span>
      <span className="text-brand-soft">iT</span>
      <span className="text-white">enorio</span>
      <span className="logo-caret ml-[3px] h-[1em] w-[2px] bg-brand-soft" />
    </span>
    <span
      className="font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.25em] text-gray-500"
      aria-hidden="true"
    >
      Tech
    </span>
  </Link>
);
