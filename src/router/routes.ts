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
    path: '/projects',
    name: 'projects',
    component: 'page-projects',
    action: async () => {
      await import('../pages/projects')
    },
  },
  {
    path: '/work',
    name: 'work',
    component: 'page-work',
    action: async () => {
      await import('../pages/work')
    },
  },
  {
    path: '/open-source',
    name: 'open-source',
    component: 'page-open-source',
    action: async () => {
      await import('../pages/open-source')
    },
  },
  {
    path: '/resume',
    name: 'resume',
    component: 'page-resume',
    action: async () => {
      await import('../pages/resume')
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
