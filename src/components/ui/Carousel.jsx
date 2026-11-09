import { useRef, useState } from "react";

/**
 * Horizontal carousel: one slide at a time, arrows, dots, ←/→ keys and swipe.
 * `items` are rendered with `renderSlide(item, isActive)`; `getLabel(item)`
 * names each dot. `accent(item)` colors the active dot. `header` (optional)
 * is shown above the slides with the controls on its right on large screens.
 */
export function Carousel({
  items,
  renderSlide,
  getLabel,
  accent = () => "#0078d7",
  label,
  header,
}) {
  const [index, setIndex] = useState(0);
  const pointer = useRef(null);
  const count = items.length;
  const goTo = (next) => setIndex(((next % count) + count) % count);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const onPointerDown = (event) => {
    pointer.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event) => {
    if (!pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
      goTo(index + (dx < 0 ? 1 : -1));
  };

  const arrow =
    "w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30";

  const controls = (className) =>
    count > 1 && (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        <button
          type="button"
          className={arrow}
          onClick={() => goTo(index - 1)}
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left text-sm" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={getLabel(item)}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${getLabel(item)}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8" : "w-2 bg-white/20 hover:bg-white/40"}`}
              style={
                i === index ? { backgroundColor: accent(item) } : undefined
              }
            />
          ))}
        </div>
        <button
          type="button"
          className={arrow}
          onClick={() => goTo(index + 1)}
          aria-label="Next"
        >
          <i className="fas fa-chevron-right text-sm" aria-hidden="true" />
        </button>
      </div>
    );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="w-full"
      onKeyDown={onKeyDown}
    >
      {header ? (
        <div className="mb-6 lg:mb-5 flex items-end justify-between gap-8">
          <div className="min-w-0">{header}</div>
          {controls("hidden lg:flex shrink-0 pb-1")}
        </div>
      ) : null}
      <div
        className="overflow-hidden rounded-2xl touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={getLabel(item)}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${getLabel(item)}`}
              aria-hidden={i !== index}
              inert={i !== index ? true : undefined}
            >
              {renderSlide(item, i === index)}
            </div>
          ))}
        </div>
      </div>

      {controls(header ? "mt-5 lg:hidden" : "mt-5")}
    </section>
  );
}
