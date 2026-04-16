import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import puppeteer from "@prerenderer/renderer-puppeteer";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 9002,
    hmr: {
      overlay: false,
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    // Rely on Rolldown's default chunking strategy to avoid Vercel build errors
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // mode === "production" && visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
    mode === "production" && !process.env.VERCEL && prerender({
      routes: [
        '/',
        '/finantare',
        '/comanda',
        '/buyback',
        '/contact',
        '/termeni-si-conditii',
        '/politica-de-confidentialitate',
        '/politica-cookies'
      ],
      renderer: new puppeteer({
        renderAfterTime: 5000,
        timeout: 60000,
        maxConcurrentRoutes: 4
      }),
      postProcess(renderedRoute) {
        // Strip out scripts that might double-trigger logic or analytics in the static output
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, s => (s.includes('async') || s.includes('defer') ? s : ''))
          .replace(/<link rel="modulepreload".*?>/g, '');
        return renderedRoute;
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
