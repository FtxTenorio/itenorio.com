// Decorations shared by the home page sections: a layered wave that flows
// into the next section (same pattern on every section, mirrored on
// alternate ones) and soft blurred "bubbles" of light behind the content.

const WAVES = [
  // back layer (translucent), front layer
  "M0,64 C180,112 360,16 540,48 C720,80 900,128 1080,96 C1260,64 1350,32 1440,48 L1440,120 L0,120 Z",
  "M0,88 C160,56 320,40 520,72 C720,104 880,120 1080,92 C1240,70 1360,72 1440,84 L1440,120 L0,120 Z",
];

/** Wave at the bottom of a section, filled with the next section's color. */
export function SectionWave({ fill, flip = false }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 w-full sm:h-24 ${
        flip ? "-scale-x-100" : ""
      }`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={WAVES[0]} fill={fill} opacity="0.5" className="wave-drift" />
      <path d={WAVES[1]} fill={fill} />
      {/* thin highlight on the crest of the front wave */}
      <path
        d={WAVES[1].replace(/ L1440,120 L0,120 Z$/, "")}
        fill="none"
        stroke="#38bdf8"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Blurred bubbles of light. `bubbles`: [{ color, className }] where className
 * places and sizes each one (e.g. "top-10 -left-20 w-96 h-96").
 */
export function GlowBubbles({ bubbles }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className={`bubble-float absolute rounded-full blur-[110px] ${bubble.className}`}
          style={{ backgroundColor: bubble.color, animationDelay: `${index * -4}s` }}
        />
      ))}
    </div>
  );
}

const PAGE_BUBBLES = [
  { color: "#0078d7", className: "-top-40 -left-32 w-[34rem] h-[26rem]" },
  { color: "#38bdf8", className: "top-1/2 -right-40 w-[28rem] h-[28rem]" },
];

/**
 * Background for the pages that are not split into sections (extensions,
 * websites, legal, 404…): the same bubbles of light as the home page and a
 * wave flowing into the footer.
 */
export function PageBackdrop({ children, background, footer }) {
  return (
    <div
      className="relative isolate flex flex-grow flex-col pb-14 sm:pb-24"
      style={{ backgroundColor: background }}
    >
      <GlowBubbles bubbles={PAGE_BUBBLES} />
      <SectionWave fill={footer} />
      <div className="relative z-10 flex flex-grow flex-col">{children}</div>
    </div>
  );
}
