import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://b320-2405-201-29-d86c-10bb-7f75-541f-3aa4.ngrok-free.app ',
       
      }
    }
  }

})
