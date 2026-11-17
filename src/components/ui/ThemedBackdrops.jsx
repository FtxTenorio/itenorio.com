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

const SHORT_LINKS = ["CRUNCHY", "GITHUB", "LINKEDIN", "CREDLY", "INSTAGRAM", "BLOG", "DOCS", "CV"];

/**
 * One star of short links around (cx, cy) (see LinkBackdrop). `hub`: draw a
 * small link icon in the middle; otherwise the middle is left clear (masked)
 * for the content sitting there.
 */
function LinkStar({ width, height, cx = width / 2, cy = height / 2, rx, ry, inner, count, pill, font, offset, hub = false, align = "xMidYMid" }) {
  const clearMiddle = {
    maskImage: "radial-gradient(ellipse at center, transparent 22%, black 55%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, transparent 22%, black 55%)",
  };
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={`${align} slice`}
      aria-hidden="true"
      style={hub ? undefined : clearMiddle}
    >
      <g fill="none" strokeLinecap="round">
        {SHORT_LINKS.slice(0, count).map((label, index) => {
          const angle = offset + (index / count) * Math.PI * 2;
          const x = cx + Math.cos(angle) * rx;
          const y = cy + Math.sin(angle) * ry;
          const x0 = cx + Math.cos(angle) * rx * inner;
          const y0 = cy + Math.sin(angle) * ry * inner;
          const ray = `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)}`;
          const w = pill * (0.55 + label.length * 0.09);
          return (
            <g key={label}>
              <path d={ray} stroke="rgba(255,107,0,0.14)" strokeWidth="1.5" strokeDasharray="3 7" />
              <path
                d={ray}
                pathLength="100"
                stroke="#ff6b00"
                strokeWidth="2"
                className="flow-dash"
                style={{ animationDelay: `${index * -0.37}s` }}
              />
              <rect
                x={x - w / 2}
                y={y - pill * 0.22}
                width={w}
                height={pill * 0.44}
                rx={pill * 0.22}
                fill="rgba(11,15,25,0.85)"
                stroke="rgba(255,107,0,0.4)"
              />
              <text
                x={x}
                y={y + font * 0.35}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize={font}
                fill="rgba(253,186,116,0.7)"
              >
                /{label}
              </text>
            </g>
          );
        })}
      </g>
      {hub && (
        <g transform={`translate(${cx} ${cy})`}>
          <circle r="17" fill="#0b0f19" stroke="rgba(255,107,0,0.55)" strokeWidth="1.5" />
          <circle r="17" fill="none" stroke="rgba(255,107,0,0.35)" className="signal-wave" />
          {/* two chain links */}
          <g fill="none" stroke="rgba(253,186,116,0.85)" strokeWidth="2" strokeLinecap="round" transform="rotate(-45)">
            <rect x="-9" y="-3.5" width="10" height="7" rx="3.5" />
            <rect x="-1" y="-3.5" width="10" height="7" rx="3.5" />
          </g>
        </g>
      )}
    </svg>
  );
}

/**
 * Shortener: short links shoot out of the form like a star (the form sits in
 * the middle, the rays carry data outwards to /CRUNCHY, /GITHUB...). On
 * phones the form takes the whole width, so a smaller star with its own hub
 * sits in the free room at the bottom of the screen instead.
 */
export function LinkBackdrop() {
  return (
    <>
      <div className="absolute inset-0 hidden md:block">
        <LinkStar width={1440} height={820} rx={560} ry={330} inner={0.52} count={8} pill={110} font={13} offset={-Math.PI / 2 + Math.PI / 8} />
      </div>
      <div className="absolute inset-0 md:hidden">
        <LinkStar width={390} height={780} cy={680} rx={140} ry={62} inner={0.3} count={6} pill={70} font={9} offset={-Math.PI / 2 + Math.PI / 6} hub align="xMidYMax" />
      </div>
    </>
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
