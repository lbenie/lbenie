import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Navigation, NavigationCollection } from '~/services/contentful'
import { contentfulFetch } from '~/services/contentful'

export const navigationStore = defineStore({
  id: 'navigation',
  state: () => ({
    navigationItems: [] as readonly Navigation[],
  }),
  getters: {
    items: (state) => state.navigationItems,
  },
  actions: {
    async getNavigationItems() {
      const query = `
        {
          navigationCollection(order: name_ASC) {
            items {
              slug
              name

            }
          }
        }
      `
      const { items } = await contentfulFetch<NavigationCollection>(query)
      this.navigationItems = items
    },
  },
})

import.meta.hot?.accept(acceptHMRUpdate(navigationStore, import.meta.hot))
