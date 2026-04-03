/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  routes: {
    fr: {
      about: 'a-propos',
      blog: 'blogue',
      projects: 'projets',
      experience: 'experience',
      contact: 'contact',
    },
  },
  showDefaultLocale: false,
  namespaces: ['common', 'navigation', 'home', 'blog', 'projects', 'experience'],
  defaultNamespace: 'common',
  i18nextServer: {
    debug: false,
    backend: {
      loadPath: './public/locales/{{lng}}/{{ns}}.json',
    },
  },
  i18nextClient: {
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  },
};
