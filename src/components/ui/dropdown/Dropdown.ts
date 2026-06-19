import { ACTIONS, BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import { isCustomEventWithStringDetail } from '../../../utils/events'
import template from './dropdown.hbs?raw'
import type { DropdownItem, DropdownProps } from './types'

const DEFAULT_TRIGGER_CLASS = 'dropdown__trigger-button'

function mapItemsWithButtonClass(items: DropdownItem[]): Array<DropdownItem & { buttonClass: string }> {
  return items.map((item) => {
    if (item.disabled) {
      return {
        ...item,
        buttonClass: 'dropdown__button dropdown__button_disabled',
      }
    }

    if (item.danger) {
      return {
        ...item,
        buttonClass: 'dropdown__button dropdown__button_danger',
      }
    }

    return {
      ...item,
      buttonClass: 'dropdown__button',
    }
  })
}

export default class Dropdown extends Block<DropdownProps> {
  static componentName = 'Dropdown'

  protected template = template

  private outsideClickHandler = (event: MouseEvent) => {
    const element = this.element()

    if (!element?.contains(event.target as Node) && this.props.isMenuOpen) {
      this.setMenuOpen(false)
    }
  }

  constructor(props: DropdownProps) {
    super({
      ...props,
      isMenuOpen: props.isMenuOpen ?? false,
      triggerButtonClass: props.triggerButtonClass ?? DEFAULT_TRIGGER_CLASS,
      toggleAction: props.toggleAction ?? ACTIONS.DROPDOWN_TOGGLE,
      items: mapItemsWithButtonClass(props.items),
    })
  }

  public setProps(props: Partial<DropdownProps>): void {
    const nextProps = { ...props }
    const openStateChanged = 'isMenuOpen' in nextProps && nextProps.isMenuOpen !== this.props.isMenuOpen

    if (nextProps.items) {
      nextProps.items = mapItemsWithButtonClass(nextProps.items)
    }

    super.setProps(nextProps)

    if (openStateChanged) {
      this.syncMenuOpenState()
    }
  }

  protected componentDidMount(): void {
    this.syncMenuOpenState()
  }

  protected componentWillUnmount(): void {
    document.removeEventListener('click', this.outsideClickHandler)
  }

  private setMenuOpen(isOpen: boolean): void {
    if (this.props.isMenuOpen === isOpen) {
      return
    }

    this.props.isMenuOpen = isOpen
    this.syncMenuOpenState()
  }

  private syncMenuOpenState(): void {
    const isOpen = !!this.props.isMenuOpen

    this.element()?.classList.toggle('dropdown_open', isOpen)
    document.removeEventListener('click', this.outsideClickHandler)

    if (isOpen) {
      document.addEventListener('click', this.outsideClickHandler)
    }
  }

  protected events = {
    [BUTTON_CLICK_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'action')) {
        return
      }

      const { action } = event.detail

      if (action === this.props.toggleAction) {
        event.stopPropagation()
        this.setMenuOpen(!this.props.isMenuOpen)
        return
      }

      const item = this.props.items.find(({ id }) => id === action)

      if (!item || item.disabled) {
        return
      }

      this.setMenuOpen(false)
      this.props.onItemClick?.(action)
    },
  }
}
