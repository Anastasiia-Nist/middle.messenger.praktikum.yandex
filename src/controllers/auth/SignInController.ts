import { signInPageData } from '../../pages/auth/sign-in/data'
import SignInPage from '../../pages/auth/sign-in/SignInPage'
import { authService } from '../../services/AuthService'
import type { SignInRequest } from '../../types/user'
import BaseAuthController from './BaseAuthController'

export default class SignInController extends BaseAuthController<SignInPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignInPage({
        ...signInPageData,
        form: {
          ...signInPageData.form,
          onSubmit: (data: SignInRequest) => {
            void this.handleAuthSubmit(() => authService.signIn(data))
          },
        },
      }),
      'SignInPage',
    )
  }
}
