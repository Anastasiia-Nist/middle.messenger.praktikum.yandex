import Handlebars from 'handlebars'
import avatarTemplateSource from '../../components/ui/avatar/avatar.hbs?raw'
import footerTemplateSource from '../../components/layouts/footer/footer.hbs?raw'
import headerTemplateSource from '../../components/layouts/header/header.hbs?raw'
import layoutTemplateSource from '../../components/layouts/layout/layout.hbs?raw'
import pageTemplateSource from '../../components/layouts/page/page.hbs?raw'
import buttonTemplateSource from '../../components/ui/button/button.hbs?raw'
import formTemplateSource from '../../components/ui/form/form.hbs?raw'
import iconTemplateSource from '../../components/ui/icon/icon.hbs?raw'
import inputTemplateSource from '../../components/ui/input/input.hbs?raw'
import linkTemplateSource from '../../components/ui/link/link.hbs?raw'
import listTemplateSource from '../../components/ui/list/list.hbs?raw'
import navTemplateSource from '../../components/ui/nav/nav.hbs?raw'
import titleTemplateSource from '../../components/ui/title/title.hbs?raw'
import containerTemplateSource from '../../components/ui/container/container.hbs?raw'

export const registerUiPartials = (): void => {
  Handlebars.registerPartial('ui-avatar', avatarTemplateSource)
  Handlebars.registerPartial('ui-button', buttonTemplateSource)
  Handlebars.registerPartial('ui-form', formTemplateSource)
  Handlebars.registerPartial('ui-icon', iconTemplateSource)
  Handlebars.registerPartial('ui-input', inputTemplateSource)
  Handlebars.registerPartial('ui-link', linkTemplateSource)
  Handlebars.registerPartial('ui-list', listTemplateSource)
  Handlebars.registerPartial('ui-nav', navTemplateSource)
  Handlebars.registerPartial('ui-title', titleTemplateSource)
  Handlebars.registerPartial('ui-container', containerTemplateSource)
}

export const registerLayoutPartials = (): void => {
  Handlebars.registerPartial('layout-footer', footerTemplateSource)
  Handlebars.registerPartial('layout-header', headerTemplateSource)
  Handlebars.registerPartial('layout', layoutTemplateSource)
  Handlebars.registerPartial('layout-page', pageTemplateSource)
}
