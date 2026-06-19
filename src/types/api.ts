export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestOptions = {
  method?: HTTPMethod
  headers?: Record<string, string>
  data?: Record<string, unknown> | FormData | string
  timeout?: number
  responseType?: XMLHttpRequestResponseType
}

export type ApiError = {
  status?: number
  statusText?: string
  response?: string
  reason?: string
  request?: XMLHttpRequest
}

export type HttpErrorBody = {
  reason: string
}
