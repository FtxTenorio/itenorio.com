// Drawn "tech" background (career intro on /career and the home page's
// "who is behind it" band): circuit-board traces (grid
// steps with 45° bends, ending in solder pads) over a faint dot grid, with
// small pulses of light running along some of them. The traces come from a
// seeded random walk, so the server-rendered HTML and the browser draw the
// exact same picture (no hydration mismatch).

const W = 1440;
const H = 820;
const STEP = 40;

function random(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const DIRECTIONS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

function buildTraces() {
  const rand = random(20260815);
  const traces = [];
  for (let i = 0; i < 26; i += 1) {
    // more traces on the right, where the text isn't
    const x0 = Math.round((0.25 + rand() * 0.75) * (W / STEP)) * STEP;
    const y0 = Math.round(rand() * (H / STEP)) * STEP;
    let dir = Math.floor(rand() * 4) * 2; // start straight
    let x = x0;
    let y = y0;
    const points = [[x, y]];
    const segments = 2 + Math.floor(rand() * 3);
    for (let s = 0; s < segments; s += 1) {
      const length = 2 + Math.floor(rand() * 5);
      x += DIRECTIONS[dir][0] * STEP * length;
      y += DIRECTIONS[dir][1] * STEP * length;
      points.push([x, y]);
      dir = (dir + (rand() < 0.5 ? 1 : 7)) % 8; // turn 45°
    }
    traces.push({
      d: points.map(([px, py], index) => `${index ? "L" : "M"}${px} ${py}`).join(" "),
      start: points[0],
      end: points[points.length - 1],
      pulse: i % 3 === 0,
      delay: (rand() * 6).toFixed(2),
    });
  }
  return traces;
}

const TRACES = buildTraces();

export const TechBackdrop = ({ id = "tech-dots" }) => (
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox={`0 0 ${W} ${H}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    style={{
      maskImage: "linear-gradient(100deg, transparent 5%, black 55%, black 85%, transparent)",
      WebkitMaskImage: "linear-gradient(100deg, transparent 5%, black 55%, black 85%, transparent)",
    }}
  >
    <defs>
      <pattern id={id} width={STEP} height={STEP} patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
      </pattern>
    </defs>
    <rect width={W} height={H} fill={`url(#${id})`} />

    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {TRACES.map((trace) => (
        <path key={trace.d} d={trace.d} stroke="rgba(56,189,248,0.16)" strokeWidth="1.5" />
      ))}
      {TRACES.filter((trace) => trace.pulse).map((trace) => (
        <path
          key={`pulse-${trace.d}`}
          d={trace.d}
          pathLength="100"
          stroke="#38bdf8"
          strokeWidth="2"
          className="circuit-pulse"
          style={{ animationDelay: `${trace.delay}s` }}
        />
      ))}
    </g>

    <g>
      {TRACES.flatMap((trace) => [trace.start, trace.end]).map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}-${index}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#0b0f19"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="1.5"
        />
      ))}
    </g>
  </svg>
);
