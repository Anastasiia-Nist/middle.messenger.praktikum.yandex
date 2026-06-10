export const API_HOST = import.meta.env.VITE_API_HOST

export const API_PREFIX = '/api/v2'

export const REQUEST_TIMEOUT_MS = 5000

export const API_BASE = import.meta.env.DEV
  ? API_PREFIX
  : `${API_HOST}${API_PREFIX}`

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
