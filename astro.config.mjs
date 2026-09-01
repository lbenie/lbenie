import sitemap from '@astrojs/sitemap';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lbenie.me',
  output: 'static',
  trailingSlash: 'always',

  integrations: [
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
      filter: (page) => page !== 'https://lbenie.me/' && !page.endsWith('/resume/'),
    }),
  ],

  vite: {
    build: {
      cssCodeSplit: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  compressHTML: true,

  build: {
    format: 'directory',
    inlineStylesheets: 'always',
    assets: '_astro',
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
