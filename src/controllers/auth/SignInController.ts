import { ROUTES } from '../../constants'
import { signInPageData } from '../../pages/auth/sign-in/data'
import SignInPage from '../../pages/auth/sign-in/SignInPage'
import { router } from '../../routes'
import { authService } from '../../services/AuthService'
import type { SignInRequest } from '../../types/user'
import RouteController from '../RouteController'

export default class SignInController extends RouteController<SignInPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignInPage({
        ...signInPageData,
        form: {
          ...signInPageData.form,
          onSubmit: (data: SignInRequest) => {
            void this.handleSubmit(data)
          },
        },
      }),
      'SignInPage',
    )
  }

  private async handleSubmit(data: SignInRequest): Promise<void> {
    try {
      await authService.signIn(data)
      router.go(ROUTES.MESSENGER)
    } catch (error) {
      console.error(error)
    }
  }
}
