import './styles.css'

import { registerComponents } from './app/registerComponents'
import { APP_ROOT_SELECTOR } from './constants'
import { registerHandlebarsHelpers } from './helpers/register/registerHandlebarsHelpers'
import { renderCurrentRoute } from './router/router'

const rootNode = document.querySelector<HTMLDivElement>(APP_ROOT_SELECTOR)

if (!rootNode) {
  throw new Error('rootNode не найден в DOM')
}

const render = () => {
  rootNode.replaceChildren(renderCurrentRoute())
}

registerHandlebarsHelpers()
registerComponents()

window.addEventListener('hashchange', render)

if (!window.location.hash) {
  window.location.hash = '#/'
}

render()
