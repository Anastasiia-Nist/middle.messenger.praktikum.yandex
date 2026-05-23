import { type ErrorCode, errorPageDataByCode } from '../../pages/error/data'
import ErrorPage from '../../pages/error/ErrorPage'
import RouteController from '../RouteController'

export default class ErrorController extends RouteController<ErrorPage> {
  constructor(private readonly code: ErrorCode) {
    super()
  }

  render(): HTMLElement {
    const data = errorPageDataByCode[this.code]

    return this.renderPage(new ErrorPage(data), `Error${this.code}Page`)
  }
}
