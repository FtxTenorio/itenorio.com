import { useEffect, useRef, useState } from "react";

/**
 * The career page drawn as one git branch. A line leaves the terminal's
 * `cd ./experience` caret ([data-trace-start]) and, as the visitor scrolls,
 * draws itself through every part of the page: a node beside each section
 * heading ([data-trace-stop], in page order) and a last one at the end
 * (the Credly link). A glowing HEAD tag rides the tip of the line and each
 * node lights up once it has been passed. Meanwhile the intro text
 * (.career-hero; the terminal stays put) lifts and fades.
 *
 * Render it inside a `relative` wrapper that holds all the sections; it covers
 * the wrapper and ignores the pointer. On phones the line runs in the left
 * gutter. With reduced motion the line is drawn in full and nothing moves.
 */
export function CareerTrace() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const headRef = useRef(null);
  const [geometry, setGeometry] = useState(null);
  const [reached, setReached] = useState(0);

  // The route: measured from the anchors, in wrapper coordinates.
  useEffect(() => {
    const wrapper = svgRef.current?.parentElement;
    if (!wrapper) return undefined;

    const measure = () => {
      const start = wrapper.querySelector("[data-trace-start]");
      const stops = [...wrapper.querySelectorAll("[data-trace-stop]")];
      if (!start || !stops.length) return;
      const box = wrapper.getBoundingClientRect();
      const narrow = box.width < 640;
      const s = start.getBoundingClientRect();
      const first = { x: s.left + s.width / 2 - box.left, y: s.bottom - box.top + 6 };
      const nodes = stops.map((stop) => {
        const r = stop.getBoundingClientRect();
        return {
          x: narrow ? 8 : r.left - box.left - 28,
          y: r.top - box.top + r.height / 2,
        };
      });

      // vertical runs joined by S-curves where the column changes
      let d = `M ${first.x} ${first.y}`;
      let from = first;
      nodes.forEach((to) => {
        if (Math.abs(to.x - from.x) < 2) {
          d += ` L ${to.x} ${to.y}`;
        } else {
          const span = Math.min(240, (to.y - from.y) * 0.7);
          d += ` L ${from.x} ${to.y - span}`;
          d += ` C ${from.x} ${to.y - span * 0.35}, ${to.x} ${to.y - span * 0.65}, ${to.x} ${to.y}`;
        }
        from = to;
      });
      setGeometry({ d, width: box.width, height: box.height, nodes, startY: first.y, narrow });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    window.addEventListener("resize", measure);
    const late = setTimeout(measure, 1600); // fonts, terminal animation, images
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(late);
    };
  }, []);

  // Scroll → the tip follows the reading line (70% down the screen).
  useEffect(() => {
    const path = pathRef.current;
    const head = headRef.current;
    const wrapper = svgRef.current?.parentElement;
    if (!geometry || !path || !head || !wrapper) return undefined;
    const hero = wrapper.querySelector(".career-hero");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    const endY = geometry.nodes[geometry.nodes.length - 1].y;
    path.style.strokeDasharray = `${length}`;

    /** Length along the path where it reaches height `y` (the path only goes down). */
    const lengthAtY = (y) => {
      let low = 0;
      let high = length;
      for (let i = 0; i < 22; i += 1) {
        const mid = (low + high) / 2;
        if (path.getPointAtLength(mid).y < y) low = mid;
        else high = mid;
      }
      return high;
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = wrapper.getBoundingClientRect().top;
      // near the bottom of the page the reading line can't reach the last
      // node, so it slides down to the screen's bottom edge there
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const y = reduced || atBottom ? endY : window.innerHeight * 0.7 - top;
      const drawn = y <= geometry.startY ? 0 : y >= endY ? length : lengthAtY(y);

      path.style.strokeDashoffset = `${length - drawn}`;
      const point = path.getPointAtLength(drawn);
      head.setAttribute("transform", `translate(${point.x} ${point.y})`);
      head.style.opacity = drawn > 4 && drawn < length - 1 ? "1" : "0";
      setReached(geometry.nodes.filter((node) => node.y <= point.y + 1).length);

      if (hero && !reduced) {
        const leave = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
        hero.style.transform = `translateY(${-leave * 60}px) scale(${1 - leave * 0.04})`;
        hero.style.opacity = `${1 - leave * 0.75}`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      if (hero) {
        hero.style.transform = "";
        hero.style.opacity = "";
      }
    };
  }, [geometry]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      width={geometry?.width}
      height={geometry?.height}
      aria-hidden="true"
    >
      {geometry && (
        <>
          <defs>
            <linearGradient id="career-trace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0078d7" />
            </linearGradient>
          </defs>
          {/* faint full route, so the way ahead is hinted */}
          <path d={geometry.d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" strokeDasharray="4 6" />
          <path
            ref={pathRef}
            d={geometry.d}
            fill="none"
            stroke="url(#career-trace)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }}
          />
          {geometry.nodes.map((node, index) => {
            const lit = index < reached;
            const last = index === geometry.nodes.length - 1;
            return (
              <circle
                key={index}
                cx={node.x}
                cy={node.y}
                r={lit ? (last ? 8 : 6) : 4.5}
                fill={lit ? "#38bdf8" : "#0b0f19"}
                stroke="#38bdf8"
                strokeWidth="2"
                className="transition-all duration-500"
                style={lit ? { filter: "drop-shadow(0 0 8px #38bdf8)" } : undefined}
              />
            );
          })}
          <g ref={headRef} style={{ opacity: 0 }} className="transition-opacity duration-300">
            <circle r="6" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 8px #38bdf8)" }} />
            {/* the tag sits left of the line, in the empty gutter; phones
                have no room for it, so they get the glowing tip only */}
            <g transform="translate(-58 -10)" className={geometry.narrow ? "hidden" : undefined}>
              <rect width="44" height="20" rx="4" fill="#0b0f19" stroke="rgba(56,189,248,0.6)" />
              <text x="22" y="14" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#38bdf8">
                HEAD
              </text>
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
