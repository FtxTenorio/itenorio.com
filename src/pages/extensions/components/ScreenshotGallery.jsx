import { useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 6000;

/**
 * Carousel of an extension's real store screenshots (home featured product
 * and the extension detail page). Slides move sideways and follow the finger
 * while dragging; labelled tabs, swipe, ←/→ keys and (from sm up) arrows
 * change slide.
 * It plays by itself while visible and stops for good once the visitor
 * interacts (and never plays with reduced motion).
 *
 * `screenshots`: [{ src, label, caption, alt }] from src/data/extensions.js.
 * `compact`: hide the caption on phones (used where space is tight).
 */
export function ScreenshotGallery({ screenshots, accent = "#ff6b00", eager = false, compact = false }) {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const pointer = useRef(null);
  const count = screenshots?.length ?? 0;

  const goTo = (index, { user = true } = {}) => {
    if (user) setAutoplay(false);
    setActive(((index % count) + count) % count);
  };

  // Autoplay only while on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !visible || count < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setTimeout(() => setActive((index) => (index + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [autoplay, visible, active, count]);

  if (!count) return null;
  const current = screenshots[active];

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { x: event.clientX, y: event.clientY, dragging: false };
  };
  const onPointerMove = (event) => {
    const start = pointer.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) start.dragging = true;
    if (start.dragging) setDragX(dx);
  };
  const onPointerEnd = () => {
    const start = pointer.current;
    pointer.current = null;
    if (!start?.dragging) return;
    const width = viewportRef.current?.offsetWidth || 1;
    if (Math.abs(dragX) > Math.min(60, width * 0.15)) goTo(active + (dragX < 0 ? 1 : -1));
    setDragX(0);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  const arrow =
    // phones swipe instead: arrows over the image there would hide the text
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 hidden sm:inline-flex items-center justify-center rounded-full bg-ink/70 border border-white/15 text-white backdrop-blur hover:bg-ink/90 transition-colors";

  return (
    <section
      ref={rootRef}
      className="w-full"
      aria-roledescription="carousel"
      aria-label="Screenshots"
      onKeyDown={onKeyDown}
    >
      <div
        ref={viewportRef}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl aspect-[16/10] touch-pan-y select-none"
        style={{ boxShadow: `0 25px 60px -20px ${accent}40` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        <div
          className={`flex h-full ${dragX ? "" : "transition-transform duration-500 ease-out motion-reduce:transition-none"}`}
          style={{ transform: `translateX(calc(${-active * 100}% + ${dragX}px))` }}
        >
          {screenshots.map((shot, index) => (
            <div
              key={shot.src}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${shot.label}`}
              aria-hidden={index !== active}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width="1280"
                height="800"
                loading={eager && index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" className={`${arrow} left-2`} onClick={() => goTo(active - 1)} aria-label="Previous screenshot">
              <i className="fas fa-chevron-left text-sm" aria-hidden="true" />
            </button>
            <button type="button" className={`${arrow} right-2`} onClick={() => goTo(active + 1)} aria-label="Next screenshot">
              <i className="fas fa-chevron-right text-sm" aria-hidden="true" />
            </button>
            <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[11px] text-gray-300 backdrop-blur">
              {active + 1}/{count}
            </span>
          </>
        )}
      </div>

      {current.caption && (
        <p
          className={`mt-3 min-h-10 text-center text-sm text-gray-300 ${compact ? "hidden sm:block" : ""}`}
          aria-live="polite"
        >
          <span className="font-semibold text-white">{current.label}:</span> {current.caption}
        </p>
      )}

      {count > 1 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose a screenshot">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => goTo(index)}
              className={`relative overflow-hidden px-3.5 py-2.5 md:px-3 md:py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                index === active
                  ? "text-white border-transparent"
                  : "text-gray-400 border-white/10 bg-white/5 hover:text-white"
              }`}
              style={index === active ? { backgroundColor: `${accent}55` } : undefined}
            >
              {/* while autoplaying, the active tab fills up until the next slide */}
              {index === active && (
                <span
                  key={`${active}-${autoplay && visible}`}
                  className={`absolute inset-y-0 left-0 ${autoplay && visible ? "carousel-progress" : "w-full"}`}
                  style={{ backgroundColor: accent, animationDuration: `${AUTOPLAY_MS}ms` }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{shot.label}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
