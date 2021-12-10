import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Social, SocialCollection } from '~/services/contentful'
import { contentfulFetch } from '~/services/contentful'

export const socialStore = defineStore({
  id: 'social',
  state: () => ({
    socialItems: [] as readonly Social[],
  }),
  getters: {
    items: (state) => state.socialItems,
  },
  actions: {
    async getSocialItems() {
      const query = `
        {
          socialCollection {
            items {
              title
              uri
              icon
            }
          }
        }
      `

      const { items } = await contentfulFetch<SocialCollection>(query)

      this.socialItems = items
    },
  },
})

import.meta.hot?.accept(acceptHMRUpdate(socialStore, import.meta.hot))
