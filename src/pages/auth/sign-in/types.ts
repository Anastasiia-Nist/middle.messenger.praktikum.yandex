import type { FormProps } from '../../../components/ui/form/types'
import type { BlockOwnProps } from '../../../types/block'
import type { SignInRequest } from '../../../types/user'

export interface SignInPageProps extends BlockOwnProps {
  form: FormProps<SignInRequest>
  redirectLink: {
    href: string
    text: string
  }
}
