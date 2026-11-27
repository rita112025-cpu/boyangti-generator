import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const ENTRY = "index.src.html";

// Inlines the built JS and CSS into one index.html, so GitHub Pages can serve
// it straight from the repo root and it also works when opened as a local file.
function inlineSingleFile(): Plugin {
  return {
    name: "inline-single-file",
    enforce: "post",
    generateBundle(_options, bundle) {
      const html = bundle[ENTRY];
      if (!html || html.type !== "asset") {
        this.error(`${ENTRY} not found in bundle`);
      }

      let source = String(html.source);
      let styles = "";
      let scripts = "";

      for (const [fileName, item] of Object.entries(bundle)) {
        if (item.type === "chunk" && item.isEntry) {
          scripts += item.code.replace(/<\/script/gi, "<\\/script");
          delete bundle[fileName];
        } else if (item.type === "asset" && fileName.endsWith(".css")) {
          styles += String(item.source);
          delete bundle[fileName];
        }
      }

      // Function replacers keep "$" sequences in the bundle from being read as patterns
      source = source
        .replace(/\s*<script type="module"[^>]*src="[^"]*"[^>]*><\/script>/, () => "")
        .replace(/\s*<link rel="stylesheet"[^>]*>/, () => "")
        .replace("</head>", () => `    <style>${styles}</style>\n  </head>`)
        .replace("</body>", () => `    <script type="module">${scripts}</script>\n  </body>`);

      html.source = source;
      html.fileName = "index.html";
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), inlineSingleFile()],
  build: {
    outDir: ".",
    emptyOutDir: false,
    copyPublicDir: false,
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: ENTRY,
      output: { inlineDynamicImports: true },
    },
  },
});
