import { useEffect } from "react";

/**
 * Scroll effect for a list of sticky cards (see .stack-item in index.css):
 * while the next card slides up over the current one, the current one shrinks
 * and dims, so only the card being read stays in focus.
 *
 * Sets each item's sticky `top` and a --stack-progress (0 → 1) CSS variable;
 * CSS does the rest.
 */
export function useStackedCards(listRef) {
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const items = [...list.querySelectorAll("[data-stack-item]")];
      const navbar = document.querySelector("header")?.offsetHeight ?? 64;
      items.forEach((item, index) => {
        // Cards that fit stick under the navbar, slightly offset so the stack
        // shows. Taller cards (phones) scroll to their end first and then
        // stick by their bottom edge, so all of their content can be read.
        const baseTop = navbar + 16 + index * 14;
        const fitTop = window.innerHeight - item.offsetHeight - 16;
        item.style.top = `${Math.min(baseTop, fitTop)}px`;

        const next = items[index + 1];
        let progress = 0;
        if (next) {
          const itemTop = item.getBoundingClientRect().top;
          const nextTop = next.getBoundingClientRect().top;
          // 0 when the next card is a full card-height below, 1 when it covers this one.
          progress = 1 - (nextTop - itemTop) / item.offsetHeight;
          progress = Math.min(1, Math.max(0, progress));
        }
        item.style.setProperty("--stack-progress", progress.toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Card heights change when a card is expanded or fonts load.
    const resizeObserver = new ResizeObserver(schedule);
    list.querySelectorAll("[data-stack-item]").forEach((item) => resizeObserver.observe(item));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, [listRef]);
}
