// Build-time renderer: scripts/prerender.mjs imports this (bundled by
// `vite build --ssr`) to turn every route into real HTML, so search engines
// and link previews see the content without running JavaScript.
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

export { routes, notFoundMeta, SITE_URL, SITE_NAME } from "./config/routes.js";
export { structuredDataFor, pageUrl } from "./config/structuredData.js";
