// Soft drawings behind the home page bands, each about what its band says.
// (AuroraBackdrop is a div with blurred blobs rather than an SVG.)
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

/**
 * Featured product: a slow orange/violet aurora (the extension's colors) with
 * the fox logo as a huge, faint watermark. `logo`: image URL of the logo.
 */
export function AuroraBackdrop({ logo }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <span className="aurora-blob absolute -right-[10%] top-[5%] h-[34rem] w-[34rem] rounded-full bg-[#ff6b00] opacity-[0.16] blur-[120px]" />
      <span
        className="aurora-blob absolute right-[20%] bottom-[0%] h-[26rem] w-[30rem] rounded-full bg-[#a855f7] opacity-[0.12] blur-[120px]"
        style={{ animationDelay: "-7s" }}
      />
      <span
        className="aurora-blob absolute -left-[10%] bottom-[10%] h-[22rem] w-[22rem] rounded-full bg-[#f43f5e] opacity-[0.08] blur-[110px]"
        style={{ animationDelay: "-13s" }}
      />
      {logo && (
        <img
          src={logo}
          alt=""
          className="absolute -right-24 -bottom-24 hidden w-[34rem] rotate-[-12deg] opacity-[0.05] grayscale lg:block"
          style={{
            maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

/** Blog: a pen writing a line of handwriting across the page, over and over. */
export function InkBackdrop() {
  return (
    <svg {...svgProps} style={fade("110deg")}>
      <defs>
        <linearGradient id="ink-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* a cursive-ish line of "handwriting", up beside the heading where
          there is no text (the post cards are translucent) */}
      <path
        transform="translate(170 -330)"
        className="ink-write"
        pathLength="1"
        d="M640 520 C 690 430, 730 430, 720 500 C 712 560, 760 560, 790 480 C 815 410, 850 420, 840 490 C 832 550, 880 560, 905 470 C 925 400, 965 420, 955 495 C 948 560, 1010 555, 1030 470 C 1045 410, 1085 410, 1080 480 C 1075 545, 1130 560, 1160 480 C 1185 415, 1225 420, 1215 500 C 1208 565, 1270 560, 1300 470 C 1320 410, 1360 420, 1350 495 C 1345 545, 1390 540, 1440 500"
        fill="none"
        stroke="url(#ink-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* faint ruled lines under it */}
      {[250, 300].map((y) => (
        <line key={y} x1="600" x2="1440" y1={y} y2={y} stroke="rgba(255,255,255,0.04)" />
      ))}
      <text x="1250" y="840" fontSize="260" fontFamily="Georgia, serif" fill="rgba(255,255,255,0.045)">
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
