import Block from '../system/Block'

export default abstract class RouteController<T extends Block = Block> {
  protected page: T | null = null

  abstract render(): HTMLElement

  protected renderPage(page: T, pageName: string): HTMLElement {
    this.page = page
    const element = page.element()

    if (!element) {
      throw new Error(`${pageName} не создал DOM-элемент`)
    }

    return element as HTMLElement
  }

  getView(): T {
    if (!this.page) {
      this.render()
    }

    if (!this.page) {
      throw new Error('Контроллер не создал страницу')
    }

    return this.page
  }

  destroy(): void {
    this.page?.destroy()
    this.page = null
  }
}
