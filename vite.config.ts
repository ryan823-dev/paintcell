import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function createManualChunk(id: string) {
  const normalizedId = id.replace(/\\/g, "/");

  if (normalizedId.includes("/src/data/videoLibrary.ts")) {
    return "data-video";
  }

  if (normalizedId.includes("/src/data/solutionData.ts")) {
    return "data-solutions";
  }

  if (
    normalizedId.includes("/node_modules/react/") ||
    normalizedId.includes("/node_modules/react-dom/") ||
    normalizedId.includes("/node_modules/react-router-dom/") ||
    normalizedId.includes("/node_modules/scheduler/")
  ) {
    return "vendor-react";
  }

  if (normalizedId.includes("/node_modules/react-helmet-async/")) {
    return "vendor-helmet";
  }

  if (normalizedId.includes("/node_modules/@tanstack/react-query/")) {
    return "vendor-query";
  }

  if (
    normalizedId.includes("/node_modules/framer-motion/") ||
    normalizedId.includes("/node_modules/motion-dom/") ||
    normalizedId.includes("/node_modules/motion-utils/")
  ) {
    return "vendor-motion";
  }

  if (
    normalizedId.includes("/node_modules/react-markdown/") ||
    normalizedId.includes("/node_modules/remark-") ||
    normalizedId.includes("/node_modules/rehype-") ||
    normalizedId.includes("/node_modules/micromark") ||
    normalizedId.includes("/node_modules/mdast-") ||
    normalizedId.includes("/node_modules/hast-") ||
    normalizedId.includes("/node_modules/unist-") ||
    normalizedId.includes("/node_modules/vfile") ||
    normalizedId.includes("/node_modules/property-information/") ||
    normalizedId.includes("/node_modules/comma-separated-tokens/") ||
    normalizedId.includes("/node_modules/space-separated-tokens/") ||
    normalizedId.includes("/node_modules/decode-named-character-reference/") ||
    normalizedId.includes("/node_modules/html-url-attributes/") ||
    normalizedId.includes("/node_modules/trough/") ||
    normalizedId.includes("/node_modules/unified/") ||
    normalizedId.includes("/node_modules/bail/") ||
    normalizedId.includes("/node_modules/is-plain-obj/")
  ) {
    return "vendor-markdown";
  }

  if (
    normalizedId.includes("/node_modules/class-variance-authority/") ||
    normalizedId.includes("/node_modules/clsx/") ||
    normalizedId.includes("/node_modules/tailwind-merge/") ||
    normalizedId.includes("/node_modules/@radix-ui/react-slot/")
  ) {
    return "vendor-ui-core";
  }

  if (normalizedId.includes("/node_modules/sonner/")) {
    return "vendor-feedback";
  }

  if (normalizedId.includes("/node_modules/cmdk/")) {
    return "vendor-command";
  }

  if (normalizedId.includes("/node_modules/embla-carousel-react/")) {
    return "vendor-carousel";
  }

  if (normalizedId.includes("/node_modules/input-otp/")) {
    return "vendor-input-otp";
  }

  if (normalizedId.includes("/node_modules/vaul/")) {
    return "vendor-drawer";
  }

  if (
    normalizedId.includes("/node_modules/recharts/") ||
    normalizedId.includes("/node_modules/victory-vendor/")
  ) {
    return "vendor-charts";
  }

  return undefined;
}

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
        manualChunks: createManualChunk,
      },
    },
    // Increase chunk warning limit to 600KB (reasonable for SPA)
    chunkSizeWarningLimit: 600,
  },
}));
