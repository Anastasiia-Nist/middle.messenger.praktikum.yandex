import { ROUTES } from '../../constants'
import { signUpPageData } from '../../pages/auth/sign-up/data'
import SignUpPage from '../../pages/auth/sign-up/SignUpPage'
import { router } from '../../routes'
import { authService } from '../../services/AuthService'
import type { SignUpRequest } from '../../types/user'
import RouteController from '../RouteController'

export default class SignUpController extends RouteController<SignUpPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignUpPage({
        ...signUpPageData,
        form: {
          ...signUpPageData.form,
          onSubmit: (data: SignUpRequest) => {
            void this.handleSubmit(data)
          },
        },
      }),
      'SignUpPage',
    )
  }

  private async handleSubmit(data: SignUpRequest): Promise<void> {
    try {
      await authService.signUp(data)
      router.go(ROUTES.MESSENGER)
    } catch (error) {
      console.error(error)
    }
  }
}
