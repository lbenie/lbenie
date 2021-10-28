import { createI18n } from 'vue-i18n'
import type { UserModule } from '~/types'

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../i18n/*.y(a)?ml')).map(
    ([key, value]) => [
      key
        .substr(0, key.lastIndexOf('.'))
        .substr(key.lastIndexOf('/') + 1, key.length),
      value.default,
    ],
  ),
)

export const install: UserModule = ({ app }) => {
  const html = document.querySelector('html')
  const locale = html?.getAttribute('lang')

  const i18n = createI18n({
    legacy: false,
    locale: locale ?? 'en',
    messages,
  })

  app.use(i18n)
}
