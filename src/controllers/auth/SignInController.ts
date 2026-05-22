import type { FormSubmitData } from '../../components/ui/form/Form'
import { signInPageData } from '../../pages/auth/sign-in/data'
import SignInPage from '../../pages/auth/sign-in/SignInPage'
import RouteController from '../RouteController'

export default class SignInController extends RouteController<SignInPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SignInPage({
        ...signInPageData,
        form: {
          ...signInPageData.form,
          onSubmit: (data: FormSubmitData) => console.log(data),
        },
      }),
      'SignInPage',
    )
  }
}
