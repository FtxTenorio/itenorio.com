// Single source of truth for every public URL of itenorio.com.
//
// This file is plain JavaScript (no JSX, no browser APIs) because it is used in
// two places:
//   1. scripts/prerender.mjs: at build time, to write one pre-rendered
//      `index.html` per route (dist/career/index.html, ...) plus sitemap.xml.
//      The site is hosted on S3 + CloudFront, which only serves files that
//      exist, so every client-side route needs its own HTML file.
//      Optional `image: { src, alt }` sets the page's share image (1200×630).
//   2. src/App.jsx / SiteLayout: at runtime, to set <title> and the meta
//      description when navigating between pages.
//
// When you add a page: add it here AND in src/App.jsx.

export const SITE_URL = "https://itenorio.com";
export const SITE_NAME = "iTenorio Tech";

export const routes = [
  {
    path: "/",
    title: "iTenorio Tech | Software development studio",
    description:
      "iTenorio Tech is a small software development company from São Paulo, Brazil, building browser extensions, web products and backend systems. Home of Crunchyroll Navigator.",
  },
  {
    path: "/career",
    title: "Career | Paulo Tenório",
    description:
      "Career, experience, tech stack, certifications and education of Paulo Tenório, Senior Backend Engineer & Cloud Architect and founder of iTenorio Tech.",
  },
  {
    path: "/extensions",
    title: "Browser Extensions | iTenorio Tech",
    description:
      "Browser extensions built and maintained by iTenorio Tech, including Crunchyroll Navigator, a free Chrome extension for Crunchyroll.",
  },
  {
    path: "/extensions/crunchy-navigator",
    title: "Crunchyroll Navigator | Dub filter & episode list for Crunchyroll",
    image: {
      src: "/images/crunchyroll-navigator/og.jpg",
      alt: "Crunchyroll Navigator: show only dubbed anime in your language",
    },
    description:
      "Free Chrome extension that filters Crunchyroll simulcasts by dub language, adds rating, genre and length filters, and lists every episode without leaving the page.",
  },
  {
    path: "/extensions/crunchy-navigator/privacy-policy",
    title: "Privacy Policy | Crunchyroll Navigator",
    description:
      "Privacy policy of the Crunchyroll Navigator browser extension by iTenorio Tech.",
  },
  {
    path: "/legal/terms",
    title: "Terms of Service | iTenorio Tech",
    description:
      "Terms of service of iTenorio Tech for its websites, browser extensions, tools, apps and services.",
  },
  {
    path: "/legal/refund-policy",
    title: "Refund Policy | iTenorio Tech",
    description:
      "Refund policy of iTenorio Tech: full refund within 7 days, mistaken charges fixed, recurring payments cancellable at any time.",
  },
  {
    path: "/legal/privacy",
    title: "Privacy Policy | iTenorio Tech",
    description:
      "How iTenorio Tech handles personal data (LGPD): what we collect, why, who we share it with and your rights.",
  },
  {
    path: "/websites",
    title: "Websites | iTenorio Tech",
    description:
      "Websites and web platforms designed and built by iTenorio Tech.",
  },
  {
    path: "/shortener",
    title: "Link Shortener | iTenorio Tech",
    description:
      "Create short links under link.itenorio.com with the iTenorio Tech serverless URL shortener.",
  },
];

export const notFoundMeta = {
  title: "Page not found | iTenorio Tech",
  description: "The page you are looking for does not exist.",
};

/** Removes a trailing slash ("/career/" -> "/career"), keeping "/" as is. */
export const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;

export const findRoute = (pathname) =>
  routes.find((route) => route.path === normalizePath(pathname));
