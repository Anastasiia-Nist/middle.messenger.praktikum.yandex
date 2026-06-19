import Handlebars from 'handlebars'

import containerLayout from '../../components/ui/container/container.hbs?raw'
import layout from '../../components/layouts/layout/layout.hbs?raw'
import modalLayout from '../../components/ui/modal/modal.hbs?raw'
import pageLayout from '../../components/layouts/page/page.hbs?raw'

export const registerHandlebarsPartials = (): void => {
  Handlebars.registerPartial('page', pageLayout)
  Handlebars.registerPartial('layout', layout)
  Handlebars.registerPartial('container', containerLayout)
  Handlebars.registerPartial('modal', modalLayout)
}
