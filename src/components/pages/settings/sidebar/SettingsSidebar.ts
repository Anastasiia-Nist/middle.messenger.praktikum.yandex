import Block from '../../../../block/block'
import type { BlockOwnProps } from '../../../../types/block'
import template from './settings-sidebar.hbs?raw'

export interface SettingsSidebarProps extends BlockOwnProps {
  backHref: string
  backAriaLabel: string
}

export default class SettingsSidebar extends Block<SettingsSidebarProps> {
  static componentName = 'SettingsSidebar'

  protected template = template
}
