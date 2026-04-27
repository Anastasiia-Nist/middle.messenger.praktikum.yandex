import Handlebars from 'handlebars'
import buttonTemplateSource from '../../components/ui/button.hbs?raw'
import formTemplateSource from '../../components/ui/form.hbs?raw'
import inputTemplateSource from '../../components/ui/input.hbs?raw'
import listTemplateSource from '../../components/ui/list.hbs?raw'
import navTemplateSource from '../../components/ui/nav.hbs?raw'
import titleTemplateSource from '../../components/ui/title.hbs?raw'

export const registerUiPartials = (): void => {
  Handlebars.registerPartial('ui-button', buttonTemplateSource)
  Handlebars.registerPartial('ui-input', inputTemplateSource)
  Handlebars.registerPartial('ui-form', formTemplateSource)
  Handlebars.registerPartial('ui-list', listTemplateSource)
  Handlebars.registerPartial('ui-nav', navTemplateSource)
  Handlebars.registerPartial('ui-title', titleTemplateSource)
}
