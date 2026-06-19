import { REQUEST_TIMEOUT_MS } from '../../constants/api'
import { HTTP_METHODS } from '../../constants/httpMethods'
import type { RequestOptions } from '../../types/api'
import { queryStringify, resolveUrl } from '../../utils/api'

type HTTPMethod = <R = unknown>(
  url: string,
  options?: Omit<RequestOptions, 'method'>,
) => Promise<R>

export default class HTTPTransport {
  private readonly base: string

  constructor(base: string) {
    this.base = base
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: HTTP_METHODS.GET })
  }

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: HTTP_METHODS.POST })
  }

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: HTTP_METHODS.PUT })
  }

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: HTTP_METHODS.DELETE })
  }

  request = <T = unknown>(
    url: string,
    options: RequestOptions = {},
    timeout = REQUEST_TIMEOUT_MS,
  ): Promise<T> => {
    const { headers = {}, method, data, responseType } = options
    const requestTimeout = options.timeout ?? timeout

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === HTTP_METHODS.GET
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
