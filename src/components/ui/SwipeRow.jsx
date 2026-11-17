import { Children, useEffect, useRef, useState } from "react";

/**
 * Row of cards that is a native swipe carousel on phones and a grid from
 * `md` up. On phones each card takes ~85% of the width, so the next one peeks
 * in and shows there is more; the scroll snaps card by card and the dots below
 * follow the swipe (and can be tapped). Most visitors are on a phone, so use
 * this instead of a plain grid whenever a row of cards would otherwise stack
 * into a long column.
 *
 * `gridClassName`: the grid used from `md` up (e.g. "md:grid-cols-3").
 * `label`: accessible name of the row.
 */
export function SwipeRow({ children, label, gridClassName = "md:grid-cols-3", className = "" }) {
  const items = Children.toArray(children);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Which card is in view: the one closest to the left edge of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = [...track.children];
        const left = track.getBoundingClientRect().left;
        let best = 0;
        cards.forEach((card, index) => {
          const distance = Math.abs(card.getBoundingClientRect().left - left);
          if (distance < Math.abs(cards[best].getBoundingClientRect().left - left)) best = index;
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  const goTo = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={className} role="region" aria-label={label}>
      <div
        ref={trackRef}
        className={`-mx-4 px-4 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 no-scrollbar md:mx-0 md:px-0 md:grid md:gap-6 md:overflow-visible ${gridClassName}`}
      >
        {items.map((child, index) => (
          <div
            key={child.key ?? index}
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-auto flex [&>*]:w-full"
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center md:hidden" aria-hidden="true">
          {items.map((_, index) => (
            // 24px tall touch target around an 8px dot.
            <button
              key={index}
              type="button"
              tabIndex={-1}
              onClick={() => goTo(index)}
              className="group h-6 px-1 flex items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  index === active ? "w-6 bg-brand-soft" : "w-2 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
