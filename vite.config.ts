import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split large dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'vendor-helmet': ['react-helmet-async'],
          // Large data files as separate chunks
          'data-glossary': ['./src/data/glossary.ts'],
          'data-faq': ['./src/data/faq.ts'],
          'data-video': ['./src/data/videoLibrary.ts'],
          'data-solutions': ['./src/data/solutionData.ts'],
        },
      },
    },
    // Increase chunk warning limit to 600KB (reasonable for SPA)
    chunkSizeWarningLimit: 600,
  },
}));
