import type Block from '../block/block'

export interface BlockOwnProps {
  __children?: Array<{
    component: Block<object>
    embed(node: DocumentFragment): void
  }>
  __refs?: Record<string, Element>
}

export interface BlockComponentClass<P extends object = object> {
  new (props: P): Block<P>
  readonly componentName: string
}
