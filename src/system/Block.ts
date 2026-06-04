import Handlebars from 'handlebars'

import type { BlockOwnProps } from '../types/block'

export type { BlockOwnProps }

type EventListType = Partial<Record<keyof HTMLElementEventMap | string, (e: Event) => void>>

export default abstract class Block<Props extends BlockOwnProps = BlockOwnProps> {
  protected abstract template: string

  protected props = {} as Props

  private domElement: Element | null = null

  protected children: Block<BlockOwnProps>[] = []

  protected refs: Record<string, Element> = {}

  protected events: EventListType = {}

  protected eventsCapture: Array<keyof HTMLElementEventMap | string> = []

  constructor(props: Props = {} as Props) {
    this.props = props
  }

  public element(): Element | null {
    if (!this.domElement) {
      this.render()
    }
    return this.domElement
  }

  public destroy(): void {
    this.unmountComponent()
    this.domElement = null
  }

  public setProps(props: Partial<Props>) {
    this.props = {
      ...this.props,
      ...props,
      __children: [],
      __refs: {},
    } as Props
    this.render()
  }

  protected componentDidMount() {}

  private mountComponent() {
    this.attachListeners()
    this.componentDidMount()
  }

  protected componentWillUnmount() {}

  private unmountComponent() {
    if (this.domElement) {
      this.children.reverse().forEach((child) => child.unmountComponent())

      this.componentWillUnmount()
      this.removeListeners()
    }
  }

  private attachListeners() {
    for (const eventName of Object.keys(this.events)) {
      const eventCallback = this.events[eventName]
      if (typeof eventCallback == 'function' && this.domElement) {
        const useCapture = this.eventsCapture.includes(eventName)
        this.domElement.addEventListener(eventName, eventCallback, useCapture)
      }
    }
  }

  private removeListeners() {
    for (const eventName of Object.keys(this.events)) {
      const eventCallback = this.events[eventName]
      if (typeof eventCallback === 'function' && this.domElement) {
        const useCapture = this.eventsCapture.includes(eventName)
        this.domElement.removeEventListener(eventName, eventCallback, useCapture)
      }
    }
  }

  protected render() {
    this.unmountComponent()
    const fragment = this.compile()
    if (this.domElement && fragment) {
      this.domElement.replaceWith(fragment)
    }
    this.domElement = fragment
    this.mountComponent()
  }

  private compile(): Element | null {
    const html = Handlebars.compile(this.template)(this.props)
    const templateElement = document.createElement('template')
    templateElement.innerHTML = html
    const fragment = templateElement.content

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component)

      this.props.__children.forEach((child) => {
        child.embed(fragment)
      })
    }

    const defaultRefs = this.props?.__refs ?? {}
    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce((list, element) => {
      const key = element.getAttribute('ref') as string
      list[key] = element as HTMLElement
      element.removeAttribute('ref')
      return list
    }, defaultRefs)

    return templateElement.content.firstElementChild
  }
}
