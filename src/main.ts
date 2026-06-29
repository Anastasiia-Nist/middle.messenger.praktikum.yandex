import './styles.css'

import { ROUTES } from './constants'
import { registerComponents } from './system/registerComponents'
import { registerHandlebarsHelpers } from './helpers/register/registerHandlebarsHelpers'
import { registerHandlebarsPartials } from './helpers/register/registerHandlebarsPartials'
import { router } from './routes'
import { authService } from './services/AuthService'
import { setServerErrorHandler } from './utils/handleServerError'

registerHandlebarsHelpers()
registerHandlebarsPartials()
registerComponents()

document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest('a')

  if (!link || link.origin !== window.location.origin) {
    return
  }

  const pathname = link.pathname

  if (!pathname || pathname === window.location.pathname) {
    return
  }

  event.preventDefault()
  router.go(pathname)
})

setServerErrorHandler(() => {
  if (window.location.pathname !== ROUTES.ERROR_500) {
    router.go(ROUTES.ERROR_500)
  }
})

const init = async (): Promise<void> => {
  await authService.checkAuth()
  router.start()
}

void init()
