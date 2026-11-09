import { Link } from "react-router-dom";

export const Logo = ({ className = "" }) => (
  <Link
    to="/"
    className={`inline-flex items-baseline gap-1.5 font-extrabold text-xl tracking-wide text-white hover:opacity-90 transition-opacity ${className}`}
    aria-label="iTenorio Tech — home"
  >
    <span>
      <span className="text-brand">i</span>Tenorio
    </span>
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
      Tech
    </span>
  </Link>
);
