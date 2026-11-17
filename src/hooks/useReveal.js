import { useEffect } from "react";

/**
 * Scroll-in animation for a block: its `.reveal-*` children (see index.css)
 * start hidden and play in, once, when the block comes into view. Hidden only
 * after the page is running in the browser (data-reveal="pending"), so the
 * pre-rendered HTML and visitors without JavaScript see everything. Off with
 * reduced motion.
 */
export function useReveal(ref, { threshold = 0.2 } = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) return undefined; // already on screen

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);
}
