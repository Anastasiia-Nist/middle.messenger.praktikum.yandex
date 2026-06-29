import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ROUTES } from '../../constants'
import { authService } from '../../services/AuthService'
import type Block from '../Block'
import Router from './Router'

vi.mock('../../services/AuthService', () => ({
  authService: {
    isAuth: vi.fn(() => false),
  },
}))

const ROOT_QUERY = '#app'

const resetRouter = () => {
  ;(Router as unknown as { __instance?: Router }).__instance = undefined
}

const createMockBlock = () => ({
  element: () => document.createElement('div'),
  destroy: vi.fn(),
}) as unknown as Block

describe('Router — навигация приложения', () => {
  let pushStateSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    resetRouter()
    document.body.innerHTML = '<div id="app"></div>'
    pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {})
    vi.mocked(authService.isAuth).mockReturnValue(false)
  })

  afterEach(() => {
    pushStateSpy.mockRestore()
    document.body.innerHTML = ''
    resetRouter()
  })

  describe('use / getRoute — регистрация маршрутов', () => {
    it('когда маршрут зарегистрирован через use — getRoute его находит', () => {
      const router = new Router(ROOT_QUERY)

      router.use('/test', createMockBlock)

      expect(router.getRoute('/test')).toBeDefined()
    })

    it('когда маршрут не зарегистрирован — getRoute возвращает undefined', () => {
      const router = new Router(ROOT_QUERY)

      expect(router.getRoute('/unknown')).toBeUndefined()
    })
  })

  describe('go — переход по URL', () => {
    it('когда вызывается go — обновляет history через pushState', () => {
      const router = new Router(ROOT_QUERY)

      router.use('/test', createMockBlock)
      router.go('/test')

      expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/test')
    })
  })

  describe('auth guard — защита приватных страниц', () => {
    it('когда пользователь не авторизован — перенаправляет с /messenger на страницу входа', () => {
      const router = new Router(ROOT_QUERY)

      router
        .use(ROUTES.SIGN_IN, createMockBlock)
        .use(ROUTES.MESSENGER, createMockBlock)

      router.go(ROUTES.MESSENGER)

      expect(pushStateSpy).toHaveBeenCalledWith({}, '', ROUTES.SIGN_IN)
    })
  })

  describe('404 — неизвестный адрес', () => {
    it('когда pathname не найден — рендерит страницу 404', () => {
      const notFoundFactory = vi.fn(createMockBlock)
      const router = new Router(ROOT_QUERY)

      router
        .use(ROUTES.SIGN_IN, createMockBlock)
        .use(ROUTES.ERROR_404, notFoundFactory)

      router.go('/unknown-page')

      expect(notFoundFactory).toHaveBeenCalledOnce()
    })
  })
})
