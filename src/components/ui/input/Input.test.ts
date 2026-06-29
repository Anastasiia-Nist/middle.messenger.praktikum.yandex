import { afterEach, describe, expect, it, vi } from 'vitest'

import { FIELD_BLUR_EVENT, VALIDATION_MESSAGES } from '../../../constants'
import Input from './Input'

const createInput = (value = '') => new Input({
  id: 'display-name',
  name: 'display_name',
  label: 'Имя в чате',
  value,
})

describe('Input — поле формы', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('getFieldName / getControl — доступ к полю', () => {
    it('когда компонент создан — getFieldName возвращает name из props', () => {
      const input = createInput()

      expect(input.getFieldName()).toBe('display_name')
    })

    it('когда компонент отрисован — getControl возвращает input-элемент', () => {
      const input = createInput()

      input.element()

      expect(input.getControl()).toBeInstanceOf(HTMLInputElement)
      expect(input.getControl()?.name).toBe('display_name')
    })
  })

  describe('setError — отображение ошибки', () => {
    it('когда передана ошибка — показывает текст и добавляет класс form-field_invalid', () => {
      const input = createInput()
      const errorMessage = VALIDATION_MESSAGES.display_name

      input.element()
      input.setError(errorMessage)

      expect(input.element()?.querySelector('.form-field__error')?.textContent).toBe(errorMessage)
      expect(input.element()?.classList.contains('form-field_invalid')).toBe(true)
    })

    it('когда ошибка сброшена — очищает текст и убирает класс form-field_invalid', () => {
      const input = createInput()

      input.setError(VALIDATION_MESSAGES.display_name)
      input.setError(null)

      expect(input.element()?.querySelector('.form-field__error')?.textContent).toBe('')
      expect(input.element()?.classList.contains('form-field_invalid')).toBe(false)
    })
  })

  describe('blur — событие потери фокуса', () => {
    it('когда поле теряет фокус — диспатчит field:blur с именем поля', () => {
      const input = createInput()
      const handler = vi.fn()

      document.body.appendChild(input.element()!)
      input.element()?.addEventListener(FIELD_BLUR_EVENT, handler)

      const control = input.getControl()

      control?.focus()
      control?.blur()

      expect(handler).toHaveBeenCalledOnce()

      const event = handler.mock.calls[0][0] as CustomEvent<{ name: string }>

      expect(event.detail.name).toBe('display_name')
    })
  })
})
