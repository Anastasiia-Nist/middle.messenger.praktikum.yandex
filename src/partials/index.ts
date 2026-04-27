import { registerUiPartials } from './components/register-ui-partials'
import { registerLayoutPartials } from './components/register-wrapper-partials'

export const registerPartials = () => {
  registerUiPartials()
  registerLayoutPartials()
}
