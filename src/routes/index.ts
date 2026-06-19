import ChatsController from '../controllers/chats/ChatsController'
import ErrorController from '../controllers/error/ErrorController'
import SettingsController from '../controllers/settings/SettingsController'
import SignInController from '../controllers/auth/SignInController'
import SignUpController from '../controllers/auth/SignUpController'
import { APP_ROOT_SELECTOR, ERROR_CODES, ROUTES } from '../constants'
import Router from '../system/router/Router'

export const router = new Router(APP_ROOT_SELECTOR)
  .use(ROUTES.SIGN_IN, () => new SignInController().getView())
  .use(ROUTES.MESSENGER, () => new ChatsController().getView())
  .use(ROUTES.SIGN_UP, () => new SignUpController().getView())
  .use(ROUTES.SETTINGS, () => new SettingsController().getView())
  .use(ROUTES.ERROR_404, () => new ErrorController(ERROR_CODES.NOT_FOUND).getView())
  .use(ROUTES.ERROR_500, () => new ErrorController(ERROR_CODES.SERVER_ERROR).getView())
