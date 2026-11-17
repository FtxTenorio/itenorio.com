import { techStack } from "../../data/techStack";

// Illustrations for the room left at the bottom of the home page bands on
// phones (Section's `art` prop). Each one is about its band and animated
// softly; they scale down to the room there is (max-h) and are hidden from
// lg up, where the bands use full-width backdrops instead.

const box = "h-full max-h-56 w-full max-w-xs"; // fills the room, never more

/** Contact: an envelope sending out signal waves. */
export function SignalArt() {
  return (
    <svg viewBox="0 0 300 220" className={box} fill="none">
      <g transform="translate(150 110)">
        {[0, 1, 2, 3].map((index) => (
          <circle
            key={index}
            r="105"
            stroke="rgba(56,189,248,0.45)"
            strokeWidth="1.5"
            className="signal-wave"
            style={{ animationDelay: `${index * -1.5}s` }}
          />
        ))}
        <rect x="-44" y="-30" width="88" height="60" rx="9" fill="#0b0f19" stroke="#38bdf8" strokeOpacity="0.7" strokeWidth="2" />
        <path d="M-44 -27 L0 6 L44 -27" stroke="#38bdf8" strokeOpacity="0.7" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Services: a tiny architecture with requests flowing through it. */
export function ArchitectureArt() {
  const node = (x, y, w, label) => (
    <g key={label} transform={`translate(${x} ${y})`}>
      <rect width={w} height="30" rx="7" fill="#0b0f19" stroke="rgba(56,189,248,0.45)" strokeWidth="1.5" />
      <text x={w / 2} y="19.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="rgba(186,230,253,0.75)">
        {label}
      </text>
    </g>
  );
  const links = [
    "M80 35 L120 35",
    "M190 50 C190 75, 75 75, 75 100",
    "M190 50 L190 100",
    "M190 50 C190 75, 255 75, 255 100",
    "M75 130 C75 155, 125 155, 125 170",
    "M190 130 L190 170",
  ];
  return (
    <svg viewBox="0 0 300 210" className={box} fill="none">
      <g stroke="rgba(56,189,248,0.25)" strokeWidth="1.5">
        {links.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* packets of data running along the links */}
      <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
        {links.map((d, index) => (
          <path key={`f-${d}`} d={d} pathLength="100" className="flow-dash" style={{ animationDelay: `${index * -0.45}s` }} />
        ))}
      </g>
      {node(10, 20, 70, "</> web")}
      {node(120, 20, 140, "api gateway")}
      {node(30, 100, 90, "orders")}
      {node(145, 100, 90, "payments")}
      {node(240, 100, 55, "queue")}
      {node(80, 170, 90, "postgres")}
      {node(180, 170, 80, "cache")}
    </svg>
  );
}

/** Who is behind it: a terminal printing the stack. */
export function TerminalArt() {
  const stack = techStack.map((tech) => tech.name).join(" · ");
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-ink/80 font-mono text-[11.5px] leading-relaxed shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[10px] text-gray-500">~/paulo</span>
      </div>
      <div className="space-y-1 p-3">
        <p className="text-gray-400">
          <span className="text-brand-soft">$</span> cat stack.txt
        </p>
        <p className="text-gray-200">{stack}</p>
        <p className="text-gray-400">
          <span className="text-brand-soft">$</span> open /career
          <span className="logo-caret ml-1 inline-block h-[1em] w-[6px] translate-y-[2px] bg-brand-soft" />
        </p>
      </div>
    </div>
  );
}
