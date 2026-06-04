import ChatsController from '../controllers/chats/ChatsController'
import ErrorController from '../controllers/error/ErrorController'
import RouteController from '../controllers/RouteController'
import SettingsController from '../controllers/settings/SettingsController'
import SignInController from '../controllers/auth/SignInController'
import SignUpController from '../controllers/auth/SignUpController'

type RouteFactory = () => RouteController

const routes: Record<string, RouteFactory> = {
  '/': () => new ChatsController(),
  '/chats': () => new ChatsController(),
  '/sign-in': () => new SignInController(),
  '/sign-up': () => new SignUpController(),
  '/settings': () => new SettingsController(),
  '/404': () => new ErrorController('404'),
  '/500': () => new ErrorController('500'),
}

let currentController: RouteController | null = null

export const renderCurrentRoute = (): HTMLElement => {
  const path = window.location.hash.slice(1) || '/'
  const createController = routes[path] ?? routes['/404']

  currentController?.destroy?.()
  currentController = createController()

  const page = currentController.render()

  if (!page) {
    throw new Error('Контроллер не вернул DOM-элемент страницы')
  }

  return page
}
