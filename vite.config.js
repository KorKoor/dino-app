import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Subimos el límite a 1000kb para que no nos moleste
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separamos las librerías pesadas (vendor) del código de nuestra lógica
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})