import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        extensions: resolve(__dirname, "extensions/index.html"),
        shortener: resolve(__dirname, "shortener/index.html"),
        websites: resolve(__dirname, "websites/index.html"),
      },
    },
  },
});
