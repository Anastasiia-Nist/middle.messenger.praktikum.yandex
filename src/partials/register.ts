import { registerLayoutPartials, registerUiPartials } from './components'
import { registerHelpers } from './helpers'

export const registerPartials = () => {
  registerHelpers()
  registerUiPartials()
  registerLayoutPartials()
}
