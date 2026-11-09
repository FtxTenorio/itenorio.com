import { useEffect } from "react";

const NAVBAR = 80; // md:h-20
const LOCK_MS = 750; // ignore further input while the page glides
const QUIET_MS = 180; // trackpad inertia: wait for the wheel to go quiet
const THRESHOLD = 30; // px of wheel delta before we move

const isLargeScreen = () =>
  window.matchMedia("(min-width: 1024px) and (min-height: 700px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Home page "lock": on large screens one wheel gesture (or PageDown/Up, arrow
 * keys, Space) moves exactly one section, so the reader never stops halfway
 * between two. A section taller than the screen scrolls normally until its
 * edge first. Sections are the elements with .snap-section; the footer is the
 * last stop.
 */
export function useSectionPaging() {
  useEffect(() => {
    let lockedUntil = 0;
    let lastWheel = 0;
    let accumulated = 0;

    const stops = () => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const tops = [...document.querySelectorAll(".snap-section")].map((el) =>
        Math.round(el.getBoundingClientRect().top + window.scrollY - NAVBAR),
      );
      return [...new Set([...tops.map((y) => Math.max(0, Math.min(y, maxY))), maxY])].sort(
        (a, b) => a - b,
      );
    };

    /** Glides to the next stop below (direction 1) or above (-1). */
    const go = (direction) => {
      const list = stops();
      const y = window.scrollY;
      const target =
        direction > 0
          ? list.find((stop) => stop > y + 2)
          : [...list].reverse().find((stop) => stop < y - 2);
      if (target === undefined) return;
      window.scrollTo({ top: target, behavior: "smooth" });
      lockedUntil = performance.now() + LOCK_MS;
    };

    /** True when a section taller than the screen still has content in `direction`. */
    const tallSectionHasRoom = (direction) => {
      const sections = [...document.querySelectorAll(".snap-section")];
      const visible = window.innerHeight - NAVBAR;
      return sections.some((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height <= visible + 4) return false;
        const top = rect.top - NAVBAR;
        const bottom = rect.bottom - window.innerHeight;
        const inside = top < 2 && bottom > -2;
        if (!inside) return false;
        return direction > 0 ? bottom > 2 : top < -2;
      });
    };

    const onWheel = (event) => {
      if (!isLargeScreen() || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }
      const direction = Math.sign(event.deltaY);
      if (direction === 0 || tallSectionHasRoom(direction)) return;

      event.preventDefault();
      const now = performance.now();
      const quiet = now - lastWheel > QUIET_MS;
      lastWheel = now;
      if (now < lockedUntil) return; // gliding: swallow inertia
      if (quiet) accumulated = 0;
      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) return;
      accumulated = 0;
      go(direction);
    };

    const KEYS = { PageDown: 1, ArrowDown: 1, " ": 1, PageUp: -1, ArrowUp: -1 };

    const onKeyDown = (event) => {
      if (!isLargeScreen() || event.altKey || event.ctrlKey || event.metaKey) return;
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || document.activeElement?.isContentEditable) {
        return;
      }
      let direction = KEYS[event.key];
      if (!direction) return;
      if (event.key === " " && event.shiftKey) direction = -1;
      if (tallSectionHasRoom(direction)) return;
      event.preventDefault();
      if (performance.now() < lockedUntil) return;
      go(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
