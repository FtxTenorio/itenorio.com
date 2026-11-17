// Soft drawings behind the home page bands, each about what its band says.
// They are faint on purpose (they must never compete with the text) and fade
// out towards the side where the content sits. Pure SVG, no images; used via
// the `backdrop` prop of <Section>.

const fade = (direction) => ({
  maskImage: `linear-gradient(${direction}, transparent 0%, black 45%, black 80%, transparent)`,
  WebkitMaskImage: `linear-gradient(${direction}, transparent 0%, black 45%, black 80%, transparent)`,
});

const svgProps = {
  className: "absolute inset-0 h-full w-full",
  viewBox: "0 0 1440 820",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
};

/** Featured product: the Simulcasts grid of posters, a few lit up by the dub filter. */
export function PosterGridBackdrop() {
  const lit = new Set([3, 9, 14, 22, 27, 33]);
  const cells = [];
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const index = row * 8 + col;
      cells.push(
        <g key={index} transform={`translate(${760 + col * 86 - (row % 2) * 20} ${40 + row * 156})`}>
          <rect
            width="70"
            height="104"
            rx="8"
            fill={lit.has(index) ? "rgba(255,107,0,0.06)" : "rgba(255,255,255,0.018)"}
            stroke={lit.has(index) ? "rgba(255,107,0,0.28)" : "rgba(255,255,255,0.045)"}
            strokeWidth="1.5"
          />
          {lit.has(index) && (
            <rect x="8" y="8" width="26" height="12" rx="3" fill="rgba(255,107,0,0.22)" />
          )}
          <rect x="8" y="114" width="54" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
        </g>,
      );
    }
  }
  return (
    <svg {...svgProps} style={fade("100deg")}>
      {cells}
    </svg>
  );
}

/** Blog: a ruled notebook page with paragraphs and a big quote mark. */
export function NotebookBackdrop() {
  const lines = [];
  for (let i = 0; i < 18; i += 1) {
    const y = 60 + i * 42;
    lines.push(<line key={`l${i}`} x1="0" x2="1440" y1={y} y2={y} stroke="rgba(255,255,255,0.035)" />);
  }
  // "text" on some lines, as soft bars
  const bars = [
    [2, 520], [3, 610], [4, 380], [6, 560], [7, 600], [8, 470], [9, 300],
    [11, 590], [12, 540], [13, 610], [14, 250],
  ].map(([line, width]) => (
    <rect key={`b${line}`} x="880" y={60 + line * 42 - 16} width={width * 0.8} height="7" rx="3.5" fill="rgba(56,189,248,0.07)" />
  ));
  return (
    <svg {...svgProps} style={fade("110deg")}>
      {lines}
      <line x1="840" x2="840" y1="0" y2="820" stroke="rgba(239,68,68,0.10)" strokeWidth="2" />
      {bars}
      <text x="1180" y="250" fontSize="260" fontFamily="Georgia, serif" fill="rgba(255,255,255,0.04)">
        &ldquo;
      </text>
    </svg>
  );
}

/** Services: a small architecture diagram (client → API → services → data). */
export function ArchitectureBackdrop() {
  const node = (x, y, w, label, key) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      <rect width={w} height="54" rx="10" fill="rgba(255,255,255,0.025)" stroke="rgba(56,189,248,0.22)" strokeWidth="1.5" />
      <text x={w / 2} y="33" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="rgba(148,163,184,0.35)">
        {label}
      </text>
    </g>
  );
  const link = "rgba(56,189,248,0.18)";
  return (
    <svg {...svgProps} style={fade("100deg")}>
      <g fill="none" stroke={link} strokeWidth="1.5" strokeDasharray="5 6">
        <path d="M940 133 L1040 133" />
        <path d="M1160 160 C1160 230, 1000 230, 1000 300" />
        <path d="M1160 160 L1160 300" />
        <path d="M1160 160 C1160 230, 1320 230, 1320 300" />
        <path d="M1000 354 L1000 470" />
        <path d="M1160 354 L1160 470" />
        <path d="M1320 354 C1320 420, 1240 420, 1240 470" />
      </g>
      {node(800, 106, 140, "</> web", "web")}
      {node(1040, 106, 240, "api gateway", "api")}
      {node(930, 300, 140, "orders", "orders")}
      {node(1090, 300, 140, "payments", "payments")}
      {node(1250, 300, 140, "queue", "queue")}
      {node(940, 470, 120, "postgres", "db")}
      {node(1100, 470, 200, "s3 · cache", "storage")}
      <text x="830" y="690" fontFamily="JetBrains Mono, monospace" fontSize="120" fill="rgba(255,255,255,0.03)">
        {"{ }"}
      </text>
    </svg>
  );
}

/** Contact: an envelope sending out signal waves. */
export function SignalBackdrop() {
  return (
    <svg {...svgProps} style={fade("260deg")}>
      <g transform="translate(1130 410)" fill="none">
        {[90, 160, 240, 330, 430].map((r, index) => (
          <circle key={r} r={r} stroke={`rgba(56,189,248,${0.12 - index * 0.02})`} strokeWidth="1.5" />
        ))}
        <rect x="-60" y="-40" width="120" height="80" rx="10" fill="rgba(11,15,25,0.6)" stroke="rgba(56,189,248,0.35)" strokeWidth="2" />
        <path d="M-60 -36 L0 8 L60 -36" stroke="rgba(56,189,248,0.35)" strokeWidth="2" />
      </g>
      <path
        d="M420 700 C 640 600, 860 640, 1060 470"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
    </svg>
  );
}
