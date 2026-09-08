import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Required for Tauri: pin port so the Rust shell always finds the dev server,
  // and set base to './' so the production build works with file:// URLs.
  base: './',
  server: {
    port: 1420,
    strictPort: true,
  },
})
