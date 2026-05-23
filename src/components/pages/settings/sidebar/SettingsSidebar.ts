import Block from '../../../../system/Block'
import template from './settings-sidebar.hbs?raw'
import type { SettingsSidebarProps } from './types'

export default class SettingsSidebar extends Block<SettingsSidebarProps> {
  static componentName = 'SettingsSidebar'

  protected template = template
}
