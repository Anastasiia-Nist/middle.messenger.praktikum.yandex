import { parseApiError } from './api'

export async function withApiError<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    throw new Error(parseApiError(error))
  }
}
