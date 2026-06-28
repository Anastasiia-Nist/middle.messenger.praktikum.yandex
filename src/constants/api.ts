const DEFAULT_API_HOST = 'https://ya-praktikum.tech'

export const API_HOST = import.meta.env.VITE_API_HOST || DEFAULT_API_HOST

export const API_PREFIX = '/api/v2'

export const REQUEST_TIMEOUT_MS = 5000

export const API_BASE = import.meta.env.DEV
  ? API_PREFIX
  : `${API_HOST}${API_PREFIX}`

export const WS_PING_INTERVAL_MS = 30000

export const WS_MESSAGES_PAGE_SIZE = 20

export function buildChatWsUrl(userId: number, chatId: number, token: string): string {
  if (import.meta.env.DEV) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'

    return `${protocol}//${window.location.host}/ws/chats/${userId}/${chatId}/${token}`
  }

  const host = API_HOST.replace(/^https?:\/\//, '')

  return `wss://${host}/ws/chats/${userId}/${chatId}/${token}`
}

export function resolveResourceUrl(path: string): string {
  if (!path) {
    return ''
  }

  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${API_BASE}/resources${normalizedPath}`
}
