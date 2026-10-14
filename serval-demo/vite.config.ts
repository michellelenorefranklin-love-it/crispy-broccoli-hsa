import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build so dist/index.html opens directly from disk (file://) with no server.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { chunkSizeWarningLimit: 4000 },
})
