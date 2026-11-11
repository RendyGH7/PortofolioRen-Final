import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const CSP_DIRECTIVE =
  "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules' https: blob: data: chrome-extension:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https: chrome-extension:; media-src 'self' blob: data: https:; connect-src 'self' https: wss:; worker-src 'self' blob:; object-src 'none'; base-uri 'self';"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Strictly ensure sourcemap is false in production so no eval-source-map or devtool eval is emitted
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide';
          }
        },
      },
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': CSP_DIRECTIVE,
    },
  },
  preview: {
    headers: {
      'Content-Security-Policy': CSP_DIRECTIVE,
    },
  },
})
