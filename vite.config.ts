import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiHost = env.VITE_API_HOST

  if (!apiHost) {
    throw new Error('Переменная окружения VITE_API_HOST не установлена')
  }

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
