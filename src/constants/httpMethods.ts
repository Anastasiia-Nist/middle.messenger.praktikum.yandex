import type { HTTPMethod } from '../types/api'

export const HTTP_METHODS: Record<string, HTTPMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}
