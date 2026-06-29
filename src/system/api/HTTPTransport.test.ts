import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { API_HOST, API_PREFIX } from '../../constants/api'
import { HTTP_METHODS } from '../../constants/httpMethods'
import HTTPTransport from './HTTPTransport'

const TEST_API_BASE = `${API_HOST}${API_PREFIX}`

class MockXHR {
  status = 200

  statusText = 'OK'

  responseText = '{"id":1}'

  responseType = ''

  response: unknown = null

  withCredentials = false

  timeout = 0

  open = vi.fn()

  send = vi.fn()

  setRequestHeader = vi.fn()

  getResponseHeader = vi.fn((header: string) => (
    header === 'Content-Type' ? 'application/json' : null
  ))

  onload: (() => void) | null = null

  onerror: (() => void) | null = null

  ontimeout: (() => void) | null = null

  onabort: (() => void) | null = null

  triggerLoad() {
    this.onload?.()
  }
}

let lastXhr: MockXHR

const createMockXHR = () => {
  lastXhr = new MockXHR()

  return lastXhr
}

describe('HTTPTransport — HTTP-запросы', () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', vi.fn(() => createMockXHR()))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('создание экземпляра', () => {
    it('при инициализации — предоставляет методы get и post', () => {
      const http = new HTTPTransport(TEST_API_BASE)

      expect(typeof http.get).toBe('function')
      expect(typeof http.post).toBe('function')
    })
  })

  describe('request — базовый запрос', () => {
    it('когда HTTP-метод не указан — отклоняет запрос с ошибкой', async () => {
      const http = new HTTPTransport(TEST_API_BASE)

      await expect(http.request('/users')).rejects.toThrow('HTTP-метод обязателен')
    })
  })

  describe('get — GET-запрос', () => {
    it('когда сервер отвечает 200 с JSON — возвращает распарсенные данные', async () => {
      const http = new HTTPTransport(TEST_API_BASE)
      const responsePromise = http.get<{ id: number }>('/users/1')

      lastXhr.triggerLoad()

      await expect(responsePromise).resolves.toEqual({ id: 1 })
      expect(lastXhr.open).toHaveBeenCalledWith(HTTP_METHODS.GET, `${TEST_API_BASE}/users/1`)
      expect(lastXhr.withCredentials).toBe(true)
    })
  })

  describe('post — POST-запрос', () => {
    it('когда передаются данные — отправляет JSON-тело и заголовок Content-Type', async () => {
      const http = new HTTPTransport(TEST_API_BASE)
      const responsePromise = http.post('/users', { data: { name: 'Малфой' } })

      lastXhr.triggerLoad()
      await responsePromise

      expect(lastXhr.send).toHaveBeenCalledWith(JSON.stringify({ name: 'Малфой' }))
      expect(lastXhr.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json')
    })
  })

  describe('ошибки — неуспешный ответ сервера', () => {
    it('когда сервер отвечает 400 — отклоняет запрос с данными об ошибке', async () => {
      let xhr!: MockXHR

      vi.stubGlobal('XMLHttpRequest', vi.fn(() => {
        xhr = new MockXHR()
        xhr.status = 400
        xhr.statusText = 'Bad Request'
        xhr.responseText = '{"reason":"Invalid data"}'

        return xhr
      }))

      const http = new HTTPTransport(TEST_API_BASE)
      const responsePromise = http.get('/users')

      xhr.triggerLoad()

      await expect(responsePromise).rejects.toMatchObject({
        status: 400,
        statusText: 'Bad Request',
        response: '{"reason":"Invalid data"}',
      })
    })
  })
})
