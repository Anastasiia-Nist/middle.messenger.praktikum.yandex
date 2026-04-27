import Handlebars from 'handlebars'
import pageLayoutTemplateSource from '../../components/layout/page.hbs?raw'
import containerTemplateSource from '../../components/wrapper/container.hbs?raw'
import mainTemplateSource from '../../components/wrapper/main.hbs?raw'

export const registerLayoutPartials = (): void => {
  Handlebars.registerPartial('wrapper-main', mainTemplateSource)
  Handlebars.registerPartial('wrapper-container', containerTemplateSource)
  Handlebars.registerPartial('layout-page', pageLayoutTemplateSource)
}
