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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
          'motion': ['framer-motion'],
          'forms': ['react-hook-form', '@hookform/resolvers']
        }
      }
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // mode === "production" && visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
    mode === "production" && prerender({
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
        renderAfterDocumentEvent: 'custom-render-trigger',
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
