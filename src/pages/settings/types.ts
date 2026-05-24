import type { FormProps } from '../../components/ui/form/types'
import type { BlockOwnProps } from '../../types/block'

export interface SettingsPageProps extends BlockOwnProps {
  title?: string
  displayName: string
  profileForm: FormProps
  passwordForm: FormProps
  passwordFormVisible?: boolean
}
