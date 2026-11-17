import { useEffect } from "react";

const LOCK_MS = 750; // ignore further input while the page glides
const QUIET_MS = 180; // trackpad inertia: wait for the wheel to go quiet
const THRESHOLD = 30; // px of wheel delta before we move
const SWIPE = 40; // px of vertical finger travel that counts as a swipe
const SETTLE_MS = 650; // after gliding, check the landing and fix it

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isLargeScreen = () =>
  window.matchMedia("(min-width: 1024px) and (min-height: 700px)").matches && !reducedMotion();
const isTouchScreen = () => window.matchMedia("(max-width: 1023px)").matches && !reducedMotion();

/**
 * Height of the *large* viewport (browser bar hidden), measured with a probe:
 * on phones the bands are that tall (100lvh), so while the bar shows they are
 * taller than window.innerHeight without having any more content.
 */
let probe = null;
const largeViewport = () => {
  if (!probe) {
    probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
  }
  return Math.max(window.innerHeight, probe.offsetHeight || 0);
};

/** Bottom of the fixed navbar, measured (h-16 on phones, h-20 from md). */
const navbarBottom = () => {
  const navbar = document.querySelector("header.fixed");
  return navbar ? Math.round(navbar.getBoundingClientRect().bottom) : 64;
};

/**
 * Full-screen sections with a "lock" (used by the home page and the
 * shortener). Adds html.section-paging, so .snap-section fills the screen
 * (index.css), and one gesture moves exactly one section, so the reader never
 * stops halfway between two:
 * - large screens: one wheel gesture (or PageDown/Up, arrow keys, Space);
 * - phones and tablets: one vertical swipe. The page is moved by script, not
 *   by CSS scroll snapping, which on phones landed a strip too high (the
 *   browser bar showing/hiding changes the viewport mid-scroll); after the
 *   glide the landing is measured again and corrected.
 * A section taller than the screen scrolls normally until its edge first.
 * Sections are the elements with .snap-section, then the footer (its top is a
 * stop and, when it's taller than the screen, it scrolls freely), then the
 * very bottom of the page.
 */
export function useSectionPaging() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("section-paging");
    let lockedUntil = 0;
    let lastWheel = 0;
    let accumulated = 0;
    let settleTimer = 0;
    let touch = null;

    const stops = () => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const offset = navbarBottom();
      const tops = [...document.querySelectorAll(".snap-section, footer")].map((el) =>
        Math.round(el.getBoundingClientRect().top + window.scrollY - offset),
      );
      return [...new Set([...tops.map((y) => Math.max(0, Math.min(y, maxY))), maxY])].sort(
        (a, b) => a - b,
      );
    };

    /** Glides to the next stop below (direction 1) or above (-1). */
    const go = (direction) => {
      const list = stops();
      const y = window.scrollY;
      const index =
        direction > 0
          ? list.findIndex((stop) => stop > y + 2)
          : list.findLastIndex((stop) => stop < y - 2);
      if (index < 0) return;
      window.scrollTo({ top: list[index], behavior: "smooth" });
      lockedUntil = performance.now() + LOCK_MS;

      // land exactly: the viewport may have changed while gliding
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const target = stops()[index];
        if (target !== undefined && Math.abs(window.scrollY - target) > 1) {
          window.scrollTo({ top: target, behavior: "instant" });
        }
      }, SETTLE_MS);
    };

    /** True when a section taller than the screen still has content in `direction`. */
    const tallSectionHasRoom = (direction) => {
      const sections = [...document.querySelectorAll(".snap-section, footer")];
      const offset = navbarBottom();
      // "tall" = more than a full screen of content; a band that is only
      // taller by the phone's browser bar (100lvh) is not tall
      const full = largeViewport() - offset;
      return sections.some((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height <= full + 24) return false;
        const top = rect.top - offset;
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

    // Touch: decide on the first moves whether the gesture is ours (vertical,
    // one finger, not inside a tall section with room); if so, hold the page
    // still and page once when the finger lifts.
    const onTouchStart = (event) => {
      if (!isTouchScreen() || event.touches.length !== 1) {
        touch = null;
        return;
      }
      const point = event.touches[0];
      touch = { x: point.clientX, y: point.clientY, mode: null };
    };

    const onTouchMove = (event) => {
      if (!touch || event.touches.length !== 1) return;
      const point = event.touches[0];
      const dx = point.clientX - touch.x;
      const dy = point.clientY - touch.y;
      if (!touch.mode) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dx) > Math.abs(dy)) touch.mode = "native"; // carousels
        else touch.mode = tallSectionHasRoom(dy < 0 ? 1 : -1) ? "native" : "page";
      }
      if (touch.mode === "page" && event.cancelable) event.preventDefault();
    };

    const onTouchEnd = (event) => {
      if (!touch) return;
      const { mode, y } = touch;
      touch = null;
      if (mode !== "page") return;
      const dy = (event.changedTouches[0]?.clientY ?? y) - y;
      if (Math.abs(dy) < SWIPE || performance.now() < lockedUntil) return;
      go(dy < 0 ? 1 : -1);
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
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      probe?.remove();
      probe = null;
      root.classList.remove("section-paging");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);
}
