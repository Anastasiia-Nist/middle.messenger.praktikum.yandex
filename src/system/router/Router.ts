import { ROUTES } from '../../constants'
import Route, { type BlockFactory } from './Route'

export default class Router {
  private static __instance: Router | undefined

  private routes: Route[] = []

  private history = window.history

  private _currentRoute: Route | null = null

  private _rootQuery!: string

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this._rootQuery = rootQuery
    Router.__instance = this
  }

  use(pathname: string, blockFactory: BlockFactory): this {
    const route = new Route(pathname, blockFactory, { rootQuery: this._rootQuery })

    this.routes.push(route)

    return this
  }

  start(): void {
    window.onpopstate = (event) => {
      const target = event.currentTarget

      if (target instanceof Window) {
        this._onRoute(target.location.pathname)
      }
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname) ?? this.getRoute(ROUTES.ERROR_404)

    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}
