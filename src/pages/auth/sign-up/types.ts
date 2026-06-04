import type { FormProps } from '../../../components/ui/form/types'
import type { BlockOwnProps } from '../../../types/block'

export interface SignUpPageProps extends BlockOwnProps {
  title?: string
  form: FormProps
  redirectLink: {
    href: string
    text: string
  }
}
