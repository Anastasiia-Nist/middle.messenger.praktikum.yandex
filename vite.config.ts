import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
})
