import { useContentful as useContentfulHook } from 'vue-contentful-hook'

export const useContentful = <T>(query: string) =>
  useContentfulHook<T>(query, {
    spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    token: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  })
