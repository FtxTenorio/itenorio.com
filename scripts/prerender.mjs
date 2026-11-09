// Runs after `vite build` (client) and `vite build --ssr` (server bundle):
// writes one real HTML file per route, which S3 + CloudFront serve as-is:
//
//   dist/index.html, dist/career/index.html, dist/extensions/index.html, ...
//   dist/404.html, dist/sitemap.xml
//
// Each file has the page content already rendered (React hydrates it in the
// browser), its own <title>, description, canonical, Open Graph / Twitter
// tags and schema.org JSON-LD. Routes live in src/config/routes.js.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const { render, routes, notFoundMeta, SITE_URL, structuredDataFor, pageUrl } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const DEFAULT_IMAGE = { src: "/og-image.jpg", alt: "iTenorio Tech — software development studio" };

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Replaces the <head> placeholders of index.html with the page's metadata. */
function withMeta(html, page) {
  const url = page.path ? pageUrl(page.path) : null;
  const image = page.image ?? DEFAULT_IMAGE;
  const set = (pattern, replacement) => {
    if (!pattern.test(html)) throw new Error(`index.html is missing ${pattern}`);
    html = html.replace(pattern, replacement);
  };
  const meta = (attr, key, value) =>
    set(
      new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
      `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`,
    );

  set(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  meta("name", "description", page.description);
  meta("name", "robots", page.path ? "index, follow, max-image-preview:large" : "noindex");
  meta("property", "og:type", page.ogType ?? "website");
  meta("property", "og:title", page.title);
  meta("property", "og:description", page.description);
  meta("property", "og:url", url ?? SITE_URL);
  meta("property", "og:image", `${SITE_URL}${image.src}`);
  meta("property", "og:image:alt", image.alt);
  meta("name", "twitter:title", page.title);
  meta("name", "twitter:description", page.description);
  meta("name", "twitter:image", `${SITE_URL}${image.src}`);
  set(
    /<link rel="canonical" href="[^"]*" \/>\n?/,
    url ? `<link rel="canonical" href="${url}" />\n` : "",
  );
  return html;
}

const withJsonLd = (html, data) =>
  data
    ? html.replace(
        "</head>",
        `  <script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n  </head>`,
      )
    : html;

const withApp = (html, appHtml) => {
  if (!html.includes('<div id="root"></div>')) throw new Error("index.html has no empty #root");
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
};

const template = await readFile(resolve(dist, "index.html"), "utf8");

async function writePage(fileName, page, url) {
  const appHtml = await render(url);
  let html = withMeta(template, page);
  html = withJsonLd(html, page.path ? structuredDataFor(page.path) : null);
  html = withApp(html, appHtml);
  const target = resolve(dist, fileName);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`  ${fileName.padEnd(52)} ${(html.length / 1024).toFixed(1)} kB`);
}

console.log("Pre-rendering pages:");
for (const route of routes) {
  const fileName = route.path === "/" ? "index.html" : `${route.path.slice(1)}/index.html`;
  await writePage(fileName, route, route.path);
}
await writePage("404.html", notFoundMeta, "/404");

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map((route) => `  <url><loc>${pageUrl(route.path)}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
await writeFile(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log("  sitemap.xml");

await rm(ssrDir, { recursive: true, force: true });
