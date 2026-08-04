import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      // This repo lives on a Windows-mounted path under WSL (/mnt/c/...),
      // where native filesystem change notifications are unreliable -
      // polling is what actually makes the dev server pick up edits.
      usePolling: true,
    },
  },
  build: {
    // Keep the CRA-era output dir name so `gh-pages -d build` doesn't need to change.
    outDir: 'build',
  },
});
