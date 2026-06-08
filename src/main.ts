import './styles.css'

import { registerComponents } from './system/registerComponents'
import { registerHandlebarsHelpers } from './helpers/register/registerHandlebarsHelpers'
import { registerHandlebarsPartials } from './helpers/register/registerHandlebarsPartials'
import { router } from './routes'
import { authService } from './services/AuthService'

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

const init = async (): Promise<void> => {
  await authService.checkAuth()
  router.start()
}

void init()
