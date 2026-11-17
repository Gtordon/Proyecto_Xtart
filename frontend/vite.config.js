import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

//https::vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //En desarrollo, las peticiones a api se renvian al backend de laravel
    //Asi el navegador solo habla con vite y no hay problemas
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})