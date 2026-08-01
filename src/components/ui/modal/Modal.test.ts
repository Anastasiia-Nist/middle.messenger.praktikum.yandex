import { afterEach, describe, expect, it, vi } from 'vitest'

import { ACTIONS, BUTTON_CLICK_EVENT } from '../../../constants'
import Modal from './Modal'

const MODAL_TEST_TEMPLATE = `
<div class="modal-host">
  {{#if isOpen}}
    <div class="modal {{modalClass}}">
      <div class="modal__overlay" ref="overlay"></div>
      <div class="modal__dialog" role="dialog" aria-modal="true">
        <h2 class="modal__title">{{title}}</h2>
      </div>
    </div>
  {{/if}}
</div>
`

class TestModal extends Modal {
  protected template = MODAL_TEST_TEMPLATE
}

const createModal = (onClose = vi.fn()) => {
  const modal = new TestModal({
    isOpen: true,
    title: 'Заголовок модалки',
    onClose,
  })

  document.body.appendChild(modal.element()!)

  return { modal, onClose }
}

describe('Modal — модальное окно', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('рендер — отображение', () => {
    it('когда isOpen false — модалка не отображается', () => {
      const modal = new TestModal({
        isOpen: false,
        title: 'Скрытая модалка',
      })

      expect(modal.element()?.querySelector('.modal')).toBeNull()
    })

    it('когда isOpen true — отображает заголовок', () => {
      const { modal } = createModal()

      expect(modal.element()?.querySelector('.modal__title')?.textContent).toBe('Заголовок модалки')
    })
  })

  describe('close — закрытие модалки', () => {
    it('когда клик по overlay — вызывает onClose', () => {
      const onClose = vi.fn()
      const { modal } = createModal(onClose)
      const overlay = modal.element()?.querySelector('.modal__overlay')

      overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('когда нажата клавиша Escape — вызывает onClose', () => {
      const onClose = vi.fn()
      const { modal } = createModal(onClose)

      modal.element()?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('когда приходит button:click с closeAction — вызывает onClose', () => {
      const onClose = vi.fn()
      const { modal } = createModal(onClose)

      modal.element()?.dispatchEvent(new CustomEvent(BUTTON_CLICK_EVENT, {
        bubbles: true,
        detail: { action: ACTIONS.MODAL_CLOSE },
      }))

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('когда приходит button:click с cancelAction — вызывает onClose', () => {
      const onClose = vi.fn()
      const modal = new TestModal({
        isOpen: true,
        title: 'Подтверждение',
        cancelAction: 'custom-cancel',
        onClose,
      })

      document.body.appendChild(modal.element()!)

      modal.element()?.dispatchEvent(new CustomEvent(BUTTON_CLICK_EVENT, {
        bubbles: true,
        detail: { action: 'custom-cancel' },
      }))

      expect(onClose).toHaveBeenCalledOnce()
    })
  })
})
