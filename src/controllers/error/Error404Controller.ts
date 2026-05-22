import { error404PageData } from '../../pages/error/404/data'
import Error404Page from '../../pages/error/404/Error404Page'
import RouteController from '../RouteController'

export default class Error404Controller extends RouteController<Error404Page> {
  render(): HTMLElement {
    return this.renderPage(new Error404Page(error404PageData), 'Error404Page')
  }
}
