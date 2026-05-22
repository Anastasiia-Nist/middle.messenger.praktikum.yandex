import { error500PageData } from '../../pages/error/500/data'
import Error500Page from '../../pages/error/500/Error500Page'
import RouteController from '../RouteController'

export default class Error500Controller extends RouteController<Error500Page> {
  render(): HTMLElement {
    return this.renderPage(new Error500Page(error500PageData), 'Error500Page')
  }
}
