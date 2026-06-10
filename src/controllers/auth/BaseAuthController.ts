import { ROUTES } from '../../constants'
import { router } from '../../routes'
import Block from '../../system/Block'
import RouteController from '../RouteController'

export default abstract class BaseAuthController<T extends Block> extends RouteController<T> {
  protected async handleAuthSubmit(
    action: () => Promise<void>,
  ): Promise<void> {
    try {
      await action()
      router.go(ROUTES.MESSENGER)
    } catch (error) {
      console.error(error)
    }
  }
}
