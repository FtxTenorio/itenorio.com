import { useEffect, useRef, useState } from "react";

/**
 * Transition between the career intro and the experience list, drawn as a
 * git branch: a line leaves the terminal's `cd ./experience` caret
 * ([data-trace-start]) and, as the visitor scrolls, draws itself down to the
 * "Where I've worked" heading ([data-trace-end]), carrying a glowing HEAD tag.
 * When it arrives, the merge node there lights up. Meanwhile the intro text
 * (.career-hero; the terminal stays put) lifts and fades, so the page reads as moving "into" the log.
 *
 * Render it inside a `relative` wrapper that holds both sections; it covers
 * the wrapper and ignores the pointer. With reduced motion the line is drawn
 * in full and nothing moves.
 */
export function CareerTrace() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const headRef = useRef(null);
  const [geometry, setGeometry] = useState(null);
  const [done, setDone] = useState(false);

  // Where the line goes: measured from the two anchors, in wrapper coordinates.
  useEffect(() => {
    const svg = svgRef.current;
    const wrapper = svg?.parentElement;
    if (!wrapper) return undefined;

    const measure = () => {
      const start = wrapper.querySelector("[data-trace-start]");
      const end = wrapper.querySelector("[data-trace-end]");
      if (!start || !end) return;
      const box = wrapper.getBoundingClientRect();
      const s = start.getBoundingClientRect();
      const e = end.getBoundingClientRect();
      const x1 = s.left + s.width / 2 - box.left;
      const y1 = s.bottom - box.top + 6;
      // land just left of the heading; on phones there is no room on the
      // left, so land right above its first letter instead
      const narrow = box.width < 640;
      const x2 = narrow ? e.left - box.left + 6 : e.left - box.left - 28;
      const y2 = narrow ? e.top - box.top - 14 : e.top - box.top + e.height / 2;
      const bend = y1 + (y2 - y1) * 0.55;
      const d = [
        `M ${x1} ${y1}`,
        `L ${x1} ${y1 + (bend - y1) * 0.45}`,
        `C ${x1} ${bend}, ${x2} ${y1 + (bend - y1) * 0.6}, ${x2} ${bend + (y2 - bend) * 0.35}`,
        `L ${x2} ${y2}`,
      ].join(" ");
      setGeometry({ d, width: box.width, height: box.height, x2, y2 });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    window.addEventListener("resize", measure);
    // fonts and the terminal animation can move the anchors a bit
    const late = setTimeout(measure, 1600);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(late);
    };
  }, []);

  // Scroll → how much of the line is drawn, where the HEAD tag is, hero fade.
  useEffect(() => {
    const path = pathRef.current;
    const head = headRef.current;
    const wrapper = svgRef.current?.parentElement;
    if (!geometry || !path || !head || !wrapper) return undefined;
    const hero = wrapper.querySelector(".career-hero");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = wrapper.getBoundingClientRect().top + window.scrollY;
      const startY = top + path.getPointAtLength(0).y;
      const endY = top + geometry.y2;
      // the head sits at 70% of the screen height while it travels
      const reading = window.scrollY + window.innerHeight * 0.7;
      let progress = reduced ? 1 : (reading - startY) / (endY - startY);
      progress = Math.min(1, Math.max(0, progress));

      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      const point = path.getPointAtLength(length * progress);
      head.setAttribute("transform", `translate(${point.x} ${point.y})`);
      head.style.opacity = progress > 0.02 && progress < 1 ? "1" : "0";
      setDone(progress >= 1);

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
          {/* faint full route, so the path ahead is hinted */}
          <path d={geometry.d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4 6" />
          <path
            ref={pathRef}
            d={geometry.d}
            fill="none"
            stroke="url(#career-trace)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }}
          />
          {/* merge node at the heading */}
          <circle
            cx={geometry.x2}
            cy={geometry.y2}
            r={done ? 7 : 5}
            fill={done ? "#38bdf8" : "#0b0f19"}
            stroke="#38bdf8"
            strokeWidth="2"
            className="transition-all duration-500"
            style={done ? { filter: "drop-shadow(0 0 8px #38bdf8)" } : undefined}
          />
          <g ref={headRef} style={{ opacity: 0 }} className="transition-opacity duration-300">
            <circle r="6" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 8px #38bdf8)" }} />
            <g transform="translate(12 -10)">
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
