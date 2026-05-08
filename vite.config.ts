import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// In production, build under /gpautolease-web/ for github.io subpath.
// Override with VITE_BASE=/ when deploying to a custom domain root.
const base = process.env.VITE_BASE ?? '/gpautolease-web/';

export default defineConfig({
  plugins: [react()],
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
