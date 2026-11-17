import { useEffect, useRef, useState } from "react";

/**
 * The career page drawn as one git branch. A line leaves the terminal's
 * `cd ./experience` caret ([data-trace-start]) and, as the visitor scrolls,
 * draws itself through the page: past each [data-trace-stop] in page order
 * (the section headings, then the steps 1 → 2 → 3 of the learning path,
 * sideways on desktop) and it ends on the last one, lighting up the
 * [data-trace-highlight] card there (the postgraduate degree in progress).
 * A glowing HEAD tag rides the tip and each node lights up once passed.
 * Meanwhile the intro text (.career-hero; the terminal stays put) lifts and
 * fades.
 *
 * Scrolling drives it through "triggers": the page height at which the tip
 * reaches each node. A node level with the previous one (a horizontal run)
 * gets 160px of scrolling of its own, so the tip travels sideways.
 *
 * Render it inside a `relative` wrapper that holds all the sections; it covers
 * the wrapper and ignores the pointer. On phones the line runs in the left
 * gutter. With reduced motion the line is drawn in full and nothing moves.
 */
export function CareerTrace() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const headRef = useRef(null);
  const measureRef = useRef(null); // invisible path used to measure lengths
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
        // data-trace-stop="center": pass through the element's center (the
        // learning path steps); otherwise run in the gutter left of it
        const center = stop.dataset.traceStop === "center";
        return {
          x: center ? r.left + r.width / 2 - box.left : narrow ? 8 : r.left - box.left - 28,
          y: r.top - box.top + r.height / 2,
        };
      });

      // vertical runs joined by S-curves where the column changes
      let d = `M ${first.x} ${first.y}`;
      const prefixes = [];
      let from = first;
      nodes.forEach((to) => {
        if (Math.abs(to.x - from.x) < 2) {
          d += ` L ${to.x} ${to.y}`;
        } else {
          const span = Math.min(240, (to.y - from.y) * 0.7);
          d += ` L ${from.x} ${to.y - span}`;
          d += ` C ${from.x} ${to.y - span * 0.35}, ${to.x} ${to.y - span * 0.65}, ${to.x} ${to.y}`;
        }
        prefixes.push(d);
        from = to;
      });
      setGeometry({ d, prefixes, width: box.width, height: box.height, nodes, startY: first.y, narrow });
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
    const measurer = measureRef.current;
    const wrapper = svgRef.current?.parentElement;
    if (!geometry || !path || !head || !measurer || !wrapper) return undefined;
    const hero = wrapper.querySelector(".career-hero");
    const highlight = wrapper.querySelector("[data-trace-highlight]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    // length of the line at each node, and the height that triggers it
    const lengths = [0];
    const triggers = [geometry.startY];
    geometry.prefixes.forEach((prefix, index) => {
      measurer.setAttribute("d", prefix);
      lengths.push(measurer.getTotalLength());
      const y = geometry.nodes[index].y;
      const previous = triggers[triggers.length - 1];
      triggers.push(y > previous + 1 ? y : previous + 160);
    });
    const last = triggers.length - 1;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = wrapper.getBoundingClientRect().top;
      const y = reduced ? triggers[last] : window.innerHeight * 0.7 - top;
      let drawn = 0;
      let passed = 0;
      if (y >= triggers[last]) {
        drawn = length;
        passed = last;
      } else if (y > triggers[0]) {
        let i = 0;
        while (y >= triggers[i + 1]) i += 1;
        const t = (y - triggers[i]) / (triggers[i + 1] - triggers[i]);
        drawn = lengths[i] + t * (lengths[i + 1] - lengths[i]);
        passed = i;
      }

      path.style.strokeDashoffset = `${length - drawn}`;
      const point = path.getPointAtLength(drawn);
      head.setAttribute("transform", `translate(${point.x} ${point.y})`);
      head.style.opacity = drawn > 4 && drawn < length - 1 ? "1" : "0";
      setReached(passed);
      highlight?.classList.toggle("trace-arrived", drawn >= length - 1);

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
      highlight?.classList.remove("trace-arrived");
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
          <path ref={measureRef} fill="none" stroke="none" />
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
