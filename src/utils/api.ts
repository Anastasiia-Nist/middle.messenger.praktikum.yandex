import { DEFAULT_API_ERROR } from '../constants/messages'
import type { ApiError, HttpErrorBody } from '../types/api'

export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Данные должны быть непустым объектом')
  }

  const pairs = Object.entries(data).reduce<string[]>((result, [key, value]) => {
    if (value === undefined || value === null) {
      return result
    }

    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(String(value))

    return [...result, `${encodedKey}=${encodedValue}`]
  }, [])

  if (pairs.length === 0) {
    return ''
  }

  return `?${pairs.join('&')}`
}

export function resolveUrl(base: string, url: string): string {
  if (/^https?:\/\//.test(url)) {
    return url
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`

  return `${normalizedBase}${normalizedUrl}`
}

export function parseApiError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return DEFAULT_API_ERROR
  }

  const apiError = error as ApiError

  if (apiError.reason) {
    return apiError.reason
  }

  if (apiError.response) {
    try {
      const body = JSON.parse(apiError.response) as HttpErrorBody

      if (body.reason) {
        return body.reason
      }
    } catch {
      return apiError.response
    }
  }

  if (apiError.statusText) {
    return apiError.statusText
  }

  return 'Произошла ошибка'
}
