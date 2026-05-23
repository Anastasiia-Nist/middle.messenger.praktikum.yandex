import Handlebars from 'handlebars'

import footerLayout from '../../components/layouts/footer/footer.hbs?raw'
import headerLayout from '../../components/layouts/header/header.hbs?raw'
import layout from '../../components/layouts/layout/layout.hbs?raw'
import pageLayout from '../../components/layouts/page/page.hbs?raw'

export const registerHandlebarsPartials = (): void => {
  Handlebars.registerPartial('page', pageLayout)
  Handlebars.registerPartial('layout', layout)
  Handlebars.registerPartial('header', headerLayout)
  Handlebars.registerPartial('footer', footerLayout)
}
