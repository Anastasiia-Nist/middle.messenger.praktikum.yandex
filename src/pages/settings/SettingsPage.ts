import Block from '../../system/Block'
import template from './template.hbs?raw'
import type { SettingsPageProps } from './types'

export default class SettingsPage extends Block<SettingsPageProps> {
  protected template = template
}
