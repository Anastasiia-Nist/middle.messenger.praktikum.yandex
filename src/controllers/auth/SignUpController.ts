import { signUpPageData } from '../../pages/auth/sign-up/data'
import SignUpPage from '../../pages/auth/sign-up/SignUpPage'
import { authService } from '../../services/AuthService'
import type { SignUpRequest } from '../../types/user'
import BaseAuthController from './BaseAuthController'

export default class SignUpController extends BaseAuthController<SignUpPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignUpPage({
        ...signUpPageData,
        form: {
          ...signUpPageData.form,
          onSubmit: (data: SignUpRequest) => {
            void this.handleAuthSubmit(() => authService.signUp(data))
          },
        },
      }),
      'SignUpPage',
    )
  }
}
