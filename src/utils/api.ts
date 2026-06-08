import type { ApiError, HttpErrorBody } from '../types/api'

export function parseApiError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Произошла ошибка'
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
