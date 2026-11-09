import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageLoader } from "../components/ui/PageLoader";
import { findRoute, notFoundMeta } from "../config/routes";

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

/** Scrolls to top on page change, or to the #anchor when there is one. */
function useScrollRestoration({ pathname, hash }) {
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section is rendered.
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function SiteLayout() {
  const location = useLocation();
  usePageMeta(location.pathname);
  useScrollRestoration(location);

  return (
    <div className="bg-ink text-white min-h-screen flex flex-col overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-brand focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-grow pt-16 md:pt-20">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
