import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  routes,
  notFoundMeta,
  SITE_URL,
} from "./src/config/routes.js";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Returns a copy of the built index.html with route-specific SEO tags. */
const withMeta = (html, { title, description, path }) => {
  const canonical = path ? `${SITE_URL}${path === "/" ? "/" : `${path}/`}` : null;
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/s,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/s,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
    )
    .replace(
      /<link rel="canonical" href=".*?" \/>/s,
      canonical ? `<link rel="canonical" href="${canonical}" />` : "",
    );
};

/**
 * The app is a single React SPA (react-router), but production is a static
 * S3 bucket behind CloudFront: a URL only works if a file exists for it.
 * This plugin copies the built index.html into one folder per route
 * (e.g. dist/career/index.html), plus 404.html and sitemap.xml.
 * Routes are declared in src/config/routes.js.
 */
const staticRoutesPlugin = () => ({
  name: "itenorio-static-routes",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const entry = bundle["index.html"];
    if (!entry) return;
    const template = String(entry.source);

    for (const route of routes) {
      const html = withMeta(template, route);
      if (route.path === "/") {
        entry.source = html;
        continue;
      }
      this.emitFile({
        type: "asset",
        fileName: `${route.path.slice(1)}/index.html`,
        source: html,
      });
    }

    this.emitFile({
      type: "asset",
      fileName: "404.html",
      source: withMeta(template, notFoundMeta),
    });

    const urls = routes
      .map(
        (route) =>
          `  <url><loc>${SITE_URL}${route.path === "/" ? "/" : `${route.path}/`}</loc></url>`,
      )
      .join("\n");
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutesPlugin()],
});
