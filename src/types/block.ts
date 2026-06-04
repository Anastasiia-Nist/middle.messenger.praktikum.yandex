import type Block from '../system/Block'

export interface BlockChild {
  component: Block<BlockOwnProps>
  embed(node: DocumentFragment): void
}

export interface BlockOwnProps {
  __children?: BlockChild[]
  __refs?: Record<string, Element>
}

export interface BlockComponentClass<P extends BlockOwnProps = BlockOwnProps> {
  new (props: P): Block<P>
  readonly componentName: string
}
