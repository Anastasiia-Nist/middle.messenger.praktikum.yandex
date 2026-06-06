import type Block from '../Block'
import { render } from '../../utils/renderDOM'

export type RouteProps = {
  rootQuery: string
}

export type BlockFactory = () => Block

export default class Route {
  private _pathname: string

  private _blockFactory: BlockFactory

  private _block: Block | null = null

  private _props: RouteProps

  constructor(pathname: string, blockFactory: BlockFactory, props: RouteProps) {
    this._pathname = pathname
    this._blockFactory = blockFactory
    this._props = props
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave(): void {
    if (!this._block) {
      return
    }

    const element = this._block.element()
    element?.remove()
    this._block.destroy()
    this._block = null
  }

  match(pathname: string): boolean {
    return pathname === this._pathname
  }

  render(): void {
    if (!this._block) {
      this._block = this._blockFactory()
      render(this._props.rootQuery, this._block)
    }
  }
}
