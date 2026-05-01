import Handlebars from 'handlebars'
import footerTemplateSource from '../../components/layout/footer/footer.hbs?raw'
import headerTemplateSource from '../../components/layout/header/header.hbs?raw'
import pageTemplateSource from '../../components/layout/page/page.hbs?raw'
import buttonTemplateSource from '../../components/ui/button/button.hbs?raw'
import formTemplateSource from '../../components/ui/form/form.hbs?raw'
import iconTemplateSource from '../../components/ui/icon/icon.hbs?raw'
import inputTemplateSource from '../../components/ui/input/input.hbs?raw'
import listTemplateSource from '../../components/ui/list/list.hbs?raw'
import navTemplateSource from '../../components/ui/nav/nav.hbs?raw'
import titleTemplateSource from '../../components/ui/title/title.hbs?raw'

export const registerUiPartials = (): void => {
  Handlebars.registerPartial('ui-button', buttonTemplateSource)
  Handlebars.registerPartial('ui-form', formTemplateSource)
  Handlebars.registerPartial('ui-icon', iconTemplateSource)
  Handlebars.registerPartial('ui-input', inputTemplateSource)
  Handlebars.registerPartial('ui-list', listTemplateSource)
  Handlebars.registerPartial('ui-nav', navTemplateSource)
  Handlebars.registerPartial('ui-title', titleTemplateSource)
}

export const registerLayoutPartials = (): void => {
  Handlebars.registerPartial('layout-footer', footerTemplateSource)
  Handlebars.registerPartial('layout-header', headerTemplateSource)
  Handlebars.registerPartial('layout-page', pageTemplateSource)
}
