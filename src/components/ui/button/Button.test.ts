import { afterEach, describe, expect, it, vi } from 'vitest'

import { BUTTON_CLICK_EVENT } from '../../../constants'
import Button from './Button'

describe('Button — кнопка действия', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('рендер — отображение', () => {
    it('когда передан текст — отображает его на кнопке', () => {
      const button = new Button({
        text: 'Войти',
        action: 'sign-in',
      })

      expect(button.element()?.textContent).toBe('Войти')
    })

    it('когда кнопка disabled — атрибут disabled установлен', () => {
      const button = new Button({
        text: 'Отправить',
        action: 'submit',
        disabled: true,
      })

      expect(button.element()).toHaveProperty('disabled', true)
    })
  })

  describe('click — обработка клика', () => {
    it('когда кнопка активна — диспатчит button:click с action', () => {
      const button = new Button({
        text: 'Создать чат',
        action: 'create-chat',
      })
      const handler = vi.fn()

      button.element()?.addEventListener(BUTTON_CLICK_EVENT, handler)
      button.element()?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(handler).toHaveBeenCalledOnce()

      const event = handler.mock.calls[0][0] as CustomEvent<{ action: string }>

      expect(event.detail.action).toBe('create-chat')
    })

    it('когда кнопка disabled — не диспатчит button:click', () => {
      const button = new Button({
        text: 'Отправить',
        action: 'submit',
        disabled: true,
      })
      const handler = vi.fn()

      button.element()?.addEventListener(BUTTON_CLICK_EVENT, handler)
      button.element()?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(handler).not.toHaveBeenCalled()
    })
  })
})
