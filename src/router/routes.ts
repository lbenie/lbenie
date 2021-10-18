import type { Route } from '@vaadin/router'

export const routes: ReadonlyArray<Route> = [
  {
    path: '',
    name: 'home',
    component: 'page-home',
    action: async () => {
      await import('../pages/home')
    },
  },
  {
    path: '/project',
    name: 'project',
    component: 'page-project',
    action: async () => {
      await import('../pages/project')
    },
  },
  {
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found')
    },
  },
]
