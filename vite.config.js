import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site is one React SPA (react-router). Production is a static S3 bucket
// behind CloudFront, which only serves files that exist, so `npm run build`
// also runs scripts/prerender.mjs: one pre-rendered HTML file per route
// (dist/career/index.html, ...), 404.html and sitemap.xml.
// Routes are declared in src/config/routes.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The blog (/blog/) is a separate Ghost site on the same bucket; in dev,
  // proxy it so the home page can read its RSS feed (src/data/blog.js).
  server: {
    proxy: {
      "/blog": { target: "https://itenorio.com", changeOrigin: true },
    },
  },
});
