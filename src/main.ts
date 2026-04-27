import './styles.css'

import { APP_ROOT_SELECTOR } from './constants'
import { registerPartials } from './partials'
import { renderCurrentRoute } from './router/router'

const rootNode = document.querySelector<HTMLDivElement>(APP_ROOT_SELECTOR)

if (!rootNode) {
  throw new Error('rootNode не найден в DOM')
}

const render = () => {
  rootNode.replaceChildren(renderCurrentRoute())
}

registerPartials()

window.addEventListener('hashchange', render)

if (!window.location.hash) {
  window.location.hash = '#/'
}

render()
