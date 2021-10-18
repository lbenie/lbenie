import { Router } from '@vaadin/router'

import { routes } from './routes'

export const router = new Router()

router.setRoutes([
  {
    path: '(.*)/',
    action: (context, commands) => {
      const newPath = context.pathname.slice(0, -1)
      return commands.redirect(newPath)
    },
  },
  ...routes,
])

export const attachRouter = (outlet: HTMLElement) => router.setOutlet(outlet)

export const isRouteActive = (name: string) => {
  const url = router.urlForPath(name)

  return (
    (url === 'home' && router.location.getUrl() === '') ||
    url === router.location.getUrl().replace('/', '')
  )
}
