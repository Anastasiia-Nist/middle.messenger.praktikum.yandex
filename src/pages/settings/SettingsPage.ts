import Block from '../../block/block'
import type { FormProps } from '../../components/ui/form/Form'
import type { BlockOwnProps } from '../../types/block'
import template from './template.hbs?raw'

export interface SettingsPageProps extends BlockOwnProps {
  title?: string
  displayName: string
  profileForm: FormProps
}

export default class SettingsPage extends Block<SettingsPageProps> {
  protected template = template
}
