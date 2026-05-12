import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// Phase 3.2 — sitemap + RSS / Atom / JSON Feed are generated at build time
// by `scripts/distribution/post-build.mjs`, which runs after `vite build` via
// the `build` script in package.json. The post-build script uses Vite's own
// SSR loader to hydrate the editorial JSX modules without disturbing the
// main build's transform pipeline.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Stop emitting source maps to production for now (smaller deploys, no leaks).
    sourcemap: false,
    // Manual chunk splitting — keeps the main bundle lean while routes are React.lazy'd.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
  },
})
