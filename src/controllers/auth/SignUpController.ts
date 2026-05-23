import type { FormSubmitData } from '../../components/ui/form/types'
import { signUpPageData } from '../../pages/auth/sign-up/data'
import SignUpPage from '../../pages/auth/sign-up/SignUpPage'
import RouteController from '../RouteController'

export default class SignUpController extends RouteController<SignUpPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignUpPage({
        ...signUpPageData,
        form: {
          ...signUpPageData.form,
          onSubmit: (data: FormSubmitData) => console.log(data),
        },
      }),
      'SignUpPage',
    )
  }
}
