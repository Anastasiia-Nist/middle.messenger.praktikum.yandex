import { defineConfig, loadEnv } from 'vite'

const DEFAULT_API_HOST = 'https://ya-praktikum.tech'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiHost = env.VITE_API_HOST ?? DEFAULT_API_HOST

  return {
    server: {
      port: 3000,
      proxy: {
        '/api/v2': {
          target: apiHost,
          changeOrigin: true,
          cookieDomainRewrite: '',
        },
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
  }
})
