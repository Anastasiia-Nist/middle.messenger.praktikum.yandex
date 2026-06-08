import type { HTTPMethod, RequestOptions } from '../../types/api'

const METHODS: Record<string, HTTPMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be a non-null object')
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

function resolveUrl(base: string, url: string): string {
  if (/^https?:\/\//.test(url)) {
    return url
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`

  return `${normalizedBase}${normalizedUrl}`
}

export default class HTTPTransport {
  private readonly base: string

  constructor(base: string) {
    this.base = base
  }

  get = <T = unknown>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.GET })
  }

  post = <T = unknown>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.POST })
  }

  put = <T = unknown>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.PUT })
  }

  delete = <T = unknown>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.DELETE })
  }

  request = <T = unknown>(
    url: string,
    options: RequestOptions = {},
    timeout = 5000,
  ): Promise<T> => {
    const { headers = {}, method, data, responseType } = options
    const requestTimeout = options.timeout ?? timeout

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET
      const fullUrl = resolveUrl(this.base, url)
      const requestUrl = isGet && data && typeof data === 'object' && !(data instanceof FormData)
        ? `${fullUrl}${queryStringify(data as Record<string, unknown>)}`
        : fullUrl

      xhr.open(method, requestUrl)
      xhr.withCredentials = true

      if (responseType) {
        xhr.responseType = responseType
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function onLoad() {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response: unknown

          if (xhr.responseType && xhr.responseType !== 'text') {
            response = xhr.response
          } else {
            try {
              const contentType = xhr.getResponseHeader('Content-Type')

              if (contentType && contentType.includes('application/json')) {
                response = JSON.parse(xhr.responseText)
              } else {
                response = xhr.responseText
              }
            } catch {
              response = xhr.responseText
            }
          }

          resolve(response as T)
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          })
        }
      }

      xhr.onabort = () => reject({
        reason: 'Request aborted',
        request: xhr,
      })

      xhr.onerror = () => reject({
        reason: 'Network error',
        request: xhr,
      })

      xhr.timeout = requestTimeout

      xhr.ontimeout = () => reject({
        reason: 'Request timeout',
        timeout: requestTimeout,
        request: xhr,
      })

      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else if (typeof data === 'object') {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json')
        }

        xhr.send(JSON.stringify(data))
      } else {
        xhr.send(data)
      }
    })
  }
}
