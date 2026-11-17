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

/**
 * Shortener: long URLs on the left run through a funnel and come out as
 * short links on the right; the middle (where the form is) stays clear.
 */
export function LinkBackdrop() {
  const long = [120, 260, 400, 540, 680];
  return (
    <svg
      {...svgProps}
      style={{
        maskImage: "linear-gradient(90deg, black 0%, black 22%, transparent 40%, transparent 60%, black 78%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, black 0%, black 22%, transparent 40%, transparent 60%, black 78%, black 100%)",
      }}
    >
      <g fill="none" strokeLinecap="round">
        {long.map((y, index) => (
          <g key={y}>
            {/* a long URL: a wide bar of "path segments" */}
            <rect x="40" y={y - 14} width={300 + (index % 3) * 40} height="28" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" />
            {[0, 1, 2, 3, 4].map((segment) => (
              <rect key={segment} x={62 + segment * 58} y={y - 3} width={36 + ((segment + index) % 3) * 8} height="6" rx="3" fill="rgba(148,163,184,0.12)" />
            ))}
            {/* into the funnel */}
            <path
              d={`M ${380 + (index % 3) * 40} ${y} C 520 ${y}, 560 410, 720 410`}
              stroke="rgba(255,107,0,0.16)"
              strokeWidth="1.5"
              strokeDasharray="3 7"
            />
          </g>
        ))}
        {/* out of the funnel: short links */}
        {long.map((y, index) => (
          <g key={`s-${y}`}>
            <path d={`M 720 410 C 880 410, 920 ${y}, 1060 ${y}`} stroke="rgba(56,189,248,0.16)" strokeWidth="1.5" />
            <path d={`M 720 410 C 880 410, 920 ${y}, 1060 ${y}`} pathLength="100" stroke="#ff6b00" strokeWidth="2" className="flow-dash" style={{ animationDelay: `${index * -0.6}s` }} />
            <rect x="1060" y={y - 16} width="150" height="32" rx="16" fill="rgba(255,107,0,0.06)" stroke="rgba(255,107,0,0.35)" />
            <text x="1135" y={y + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="rgba(253,186,116,0.55)">
              /{["CRUNCHY", "GITHUB", "LINKEDIN", "CREDLY", "DOCS"][index]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Shortener statistics: a faint chart grid with a trend line drawing itself. */
export function ChartBackdrop() {
  const trend =
    "M0 640 C 120 600, 200 660, 320 560 S 520 520, 640 470 S 860 520, 980 380 S 1200 300, 1440 220";
  return (
    <svg {...svgProps} style={fade("180deg")}>
      <g stroke="rgba(255,255,255,0.035)">
        {[160, 280, 400, 520, 640, 760].map((y) => (
          <line key={y} x1="0" x2="1440" y1={y} y2={y} />
        ))}
        {[120, 360, 600, 840, 1080, 1320].map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="820" />
        ))}
      </g>
      <path d={trend} fill="none" stroke="rgba(255,107,0,0.05)" strokeWidth="3" />
      <path d={trend} fill="none" stroke="rgba(255,107,0,0.16)" strokeWidth="2" pathLength="1" className="ink-write" strokeLinecap="round" />
    </svg>
  );
}
