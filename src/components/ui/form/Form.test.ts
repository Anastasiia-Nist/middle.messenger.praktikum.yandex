import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { FIELD_BLUR_EVENT, VALIDATION_MESSAGES } from '../../../constants'
import { registerComponent } from '../../../helpers/register/registerComponent'
import Button from '../button/Button'
import Input from '../input/Input'
import Form from './Form'

const FORM_FIELDS = [{
  id: 'display-name',
  name: 'display_name',
  label: 'Имя в чате',
  value: '',
}]

const createForm = (onSubmit = vi.fn()) => {
  const form = new Form({
    name: 'test-form',
    fields: FORM_FIELDS,
    actions: [{
      type: 'submit',
      text: 'Сохранить',
      buttonClass: 'button_primary',
    }],
    onSubmit,
  })

  document.body.appendChild(form.element()!)

  return { form, onSubmit }
}

const getDisplayNameInput = (form: Form) => (
  form.element()?.querySelector('[name="display_name"]') as HTMLInputElement
)

describe('Form — форма с валидацией', () => {
  beforeEach(() => {
    registerComponent(Button)
    registerComponent(Input)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('validate / validateField — проверка полей', () => {
    it('когда поле пустое — validate возвращает false и показывает ошибку', () => {
      const { form } = createForm()

      getDisplayNameInput(form).value = ''

      expect(form.validate()).toBe(false)
      expect(form.element()?.querySelector('.form-field__error')?.textContent)
        .toBe(VALIDATION_MESSAGES.display_name)
    })

    it('когда поле заполнено корректно — validate возвращает true', () => {
      const { form } = createForm()

      getDisplayNameInput(form).value = 'Мой чат'

      expect(form.validate()).toBe(true)
      expect(form.element()?.querySelector('.form-field__error')?.textContent).toBe('')
    })

    it('когда приходит field:blur — валидирует только это поле', () => {
      const { form } = createForm()

      getDisplayNameInput(form).value = ''

      form.element()?.dispatchEvent(new CustomEvent(FIELD_BLUR_EVENT, {
        bubbles: true,
        detail: { name: 'display_name' },
      }))

      expect(form.element()?.querySelector('.form-field__error')?.textContent)
        .toBe(VALIDATION_MESSAGES.display_name)
    })
  })

  describe('submit — отправка формы', () => {
    it('когда данные невалидны — не вызывает onSubmit', () => {
      const onSubmit = vi.fn()
      const { form } = createForm(onSubmit)

      getDisplayNameInput(form).value = ''
      form.element()?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('когда данные валидны — вызывает onSubmit с собранными данными', () => {
      const onSubmit = vi.fn()
      const { form } = createForm(onSubmit)

      getDisplayNameInput(form).value = 'Мой чат'
      form.element()?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit).toHaveBeenCalledWith({ display_name: 'Мой чат' })
    })
  })
})
