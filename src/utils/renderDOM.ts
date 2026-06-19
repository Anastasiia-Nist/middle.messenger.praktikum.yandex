import type Block from '../system/Block'

export function render(query: string, block: Block): void {
  const root = document.querySelector(query)

  if (!root) {
    throw new Error(`Элемент ${query} не найден`)
  }

  const element = block.element()

  if (!element) {
    throw new Error('Block не создал DOM-элемент')
  }

  root.append(element)
}
