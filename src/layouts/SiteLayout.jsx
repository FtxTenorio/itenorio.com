import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageLoader } from "../components/ui/PageLoader";
import { PageBackdrop } from "../components/ui/SectionDecor";
import { HOME_BG } from "../config/theme";
import { findRoute, normalizePath, notFoundMeta } from "../config/routes";

// Pages that draw their own section backgrounds (bands with waves); every
// other page gets the shared PageBackdrop.
const OWN_BACKGROUND = new Set(["/", "/career", "/shortener"]);

/** Keeps <title> and the meta description in sync with the current route. */
function usePageMeta(pathname) {
  useEffect(() => {
    const meta = findRoute(pathname) ?? notFoundMeta;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [pathname]);
}

const scrollPositions = new Map();

// html has scroll-behavior: smooth (for in-page anchors); page changes must jump.
const jumpTo = (top) => window.scrollTo({ top, left: 0, behavior: "instant" });

/**
 * Back/forward (POP) returns to where the reader was on that page; a new
 * navigation goes to the top, or to the #anchor when there is one.
 */
function useScrollRestoration(location) {
  const navigationType = useNavigationType();
  const { key, hash } = location;

  // Remember the scroll position of the current page while the reader scrolls
  // (by the time the route changes, the browser has already clamped it to the
  // height of the next page).
  useEffect(() => {
    const save = () => scrollPositions.set(key, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [key]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    if (navigationType === "POP" && scrollPositions.has(key)) {
      const target = scrollPositions.get(key);
      // Lazy pages may still be loading: retry until the page is tall enough.
      let tries = 0;
      const restore = () => {
        jumpTo(target);
        if (Math.abs(window.scrollY - target) > 2 && tries++ < 30) requestAnimationFrame(restore);
      };
      restore();
      return;
    }
    if (hash) {
      // Wait a frame so the target section is rendered.
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }
    jumpTo(0);
  }, [key, hash, navigationType]);
}

export function SiteLayout() {
  const location = useLocation();
  usePageMeta(location.pathname);
  useScrollRestoration(location);

  return (
    <div className="bg-ink text-white min-h-screen flex flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-brand focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex flex-grow flex-col pt-16 md:pt-20">
        <Suspense fallback={<PageLoader />}>
          {OWN_BACKGROUND.has(normalizePath(location.pathname)) ? (
            <Outlet />
          ) : (
            <PageBackdrop background={HOME_BG.base} footer={HOME_BG.footer}>
              <Outlet />
            </PageBackdrop>
          )}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
