import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type Block from '../Block'
import Route from './Route'

const ROOT_QUERY = '#app'

const createMockBlock = () => {
  const element = document.createElement('div')
  const destroy = vi.fn()

  return {
    element: () => element,
    destroy,
  } as unknown as Block & { destroy: ReturnType<typeof vi.fn> }
}

describe('Route — маршрут страницы', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('match — сравнение pathname', () => {
    it('когда pathname совпадает — возвращает true', () => {
      const route = new Route('/messenger', () => createMockBlock(), { rootQuery: ROOT_QUERY })

      expect(route.match('/messenger')).toBe(true)
    })

    it('когда pathname отличается — возвращает false', () => {
      const route = new Route('/messenger', () => createMockBlock(), { rootQuery: ROOT_QUERY })

      expect(route.match('/settings')).toBe(false)
    })
  })

  describe('leave — выход со страницы', () => {
    it('когда страница была отрисована — уничтожает блок и убирает элемент из DOM', () => {
      const block = createMockBlock()
      const route = new Route('/messenger', () => block, { rootQuery: ROOT_QUERY })

      route.render()

      const root = document.querySelector(ROOT_QUERY)
      const element = block.element()

      expect(root?.contains(element)).toBe(true)

      route.leave()

      expect(block.destroy).toHaveBeenCalledOnce()
      expect(root?.contains(element)).toBe(false)
    })
  })
})
