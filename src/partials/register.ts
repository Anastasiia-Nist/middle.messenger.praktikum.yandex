import { registerLayoutPartials, registerUiPartials } from './components'

export const registerPartials = () => {
  registerUiPartials()
  registerLayoutPartials()
}
