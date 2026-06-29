import Handlebars from 'handlebars'
import type { HelperOptions } from 'handlebars'

import type { BlockComponentClass, BlockOwnProps } from '../../types/block'

let uniqueId = 0

export function registerComponent<P extends BlockOwnProps = BlockOwnProps>(
  Component: BlockComponentClass<P>
): void {
  const dataAttribute = `data-component-hbs-id="${++uniqueId}"`

  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, { hash, data }: HelperOptions) {
      const component = new Component(hash as P)

      if ('ref' in hash) {
        ;(data.root.__refs = data.root.__refs || {})[hash.ref as string] = component.element()
      }

      ;(data.root.__children = data.root.__children || []).push({
        component,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(`[${dataAttribute}]`)

          if (!placeholder) {
            throw new Error(`Не найден data-id для компонента ${Component.componentName}`)
          }

          const element = component.element()

          if (!element) {
            throw new Error('Элемент компонента не создан')
          }

          placeholder.replaceWith(element)
        },
      })

      return `<div ${dataAttribute}></div>`
    }
  )
}
