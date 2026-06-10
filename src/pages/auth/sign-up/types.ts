import type { FormProps } from '../../../components/ui/form/types'
import type { BlockOwnProps } from '../../../types/block'
import type { SignUpRequest } from '../../../types/user'

export interface SignUpPageProps extends BlockOwnProps {
  form: FormProps<SignUpRequest>
  redirectLink: {
    href: string
    text: string
  }
}
