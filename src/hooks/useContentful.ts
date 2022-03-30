import { useContentful as useContentfulHook } from 'vue-contentful-hook'
import { useI18n } from 'vue-i18n'

export const useContentful = <T>(query: string, withLocale = false) => {
  const { locale } = $(useI18n())

  const parenthesis = query.lastIndexOf(')')

  const localeQuery = `${query.slice(
    0,
    parenthesis,
  )},locale:"${locale}"${query.slice(parenthesis)}`

  return useContentfulHook<T>(withLocale ? localeQuery : query, {
    spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    token: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  })
}
