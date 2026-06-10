import { BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import { isCustomEventWithStringDetail } from '../../../utils/events'
import template from './dropdown.hbs?raw'
import type { DropdownItem, DropdownProps } from './types'

const DEFAULT_TRIGGER_CLASS = 'dropdown__trigger-button'

function mapItemsWithButtonClass(items: DropdownItem[]): Array<DropdownItem & { buttonClass: string }> {
  return items.map((item) => ({
    ...item,
    buttonClass: item.disabled ? 'dropdown__button dropdown__button_disabled' : 'dropdown__button',
  }))
}

export default class Dropdown extends Block<DropdownProps> {
  static componentName = 'Dropdown'

  protected template = template

  private outsideClickHandler: ((event: MouseEvent) => void) | null = null

  constructor(props: DropdownProps) {
    super({
      ...props,
      isMenuOpen: props.isMenuOpen ?? false,
      triggerButtonClass: props.triggerButtonClass ?? DEFAULT_TRIGGER_CLASS,
      items: mapItemsWithButtonClass(props.items),
    })
  }

  public setProps(props: Partial<DropdownProps>): void {
    const nextProps = { ...props }

    if (nextProps.items) {
      nextProps.items = mapItemsWithButtonClass(nextProps.items)
    }

    super.setProps(nextProps)
  }

  protected componentDidMount(): void {
    this.outsideClickHandler = (event: MouseEvent) => {
      const element = this.element()

      if (!element?.contains(event.target as Node) && this.props.isMenuOpen) {
        this.setProps({ isMenuOpen: false })
      }
    }

    // Отложенная подписка, чтобы не перехватить клик по триггеру при монтировании
    setTimeout(() => {
      if (this.outsideClickHandler) {
        document.addEventListener('click', this.outsideClickHandler)
      }
    }, 0)
  }

  protected componentWillUnmount(): void {
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler)
      this.outsideClickHandler = null
    }
  }

  protected events = {
    [BUTTON_CLICK_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'action')) {
        return
      }

      const { action } = event.detail

      if (action === 'dropdown-toggle') {
        event.stopPropagation()

        const nextIsOpen = !this.props.isMenuOpen

        // Откладываем re-render, чтобы document click не закрыл меню из-за пересоздания DOM
        setTimeout(() => {
          this.setProps({ isMenuOpen: nextIsOpen })
        }, 0)

        return
      }

      const item = this.props.items.find(({ id }) => id === action)

      if (!item || item.disabled) {
        return
      }

      this.setProps({ isMenuOpen: false })
      this.props.onItemClick?.(action)
    },
  }
}
