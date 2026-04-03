import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';

// https://astro.build/config
export default defineConfig({
  site: 'https://lbenie.me',
  output: 'static',
  trailingSlash: 'always',

  integrations: [
    astroI18next(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  adapter: netlify(),

  vite: {
    optimizeDeps: {
      exclude: ['astro-i18next'],
    },
  },

  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      defaultColor: false,
      transformers: [
        transformerMetaHighlight(),
        {
          name: 'add-line-numbers',
          line(node, line) {
            node.properties['data-line'] = line;
          },
          pre(node) {
            node.properties['data-line-numbers'] = '';
          },
        },
      ],
    },
    syntaxHighlight: 'shiki',
  },
});
