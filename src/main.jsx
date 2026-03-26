import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- ESTO ES VITAL PARA TAILWIND 4

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- ESTO PROCESA TU CSS EN PRODUCCIÓN
  ],
})