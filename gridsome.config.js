// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
// const tailwind = require('tailwindcss')
// const purgecss = require('@fullhuman/postcss-purgecss')

// const postcssPlugins = [tailwind()]

// if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss())

module.exports = {
  titleTemplate: '%s',
  siteUrl: 'https://lbenie.xyz',
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-99037201-2',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000,
      },
    },
    {
      use: 'gridsome-plugin-robots-txt',
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_ACCESS_TOKEN,
        host: 'cdn.contentful.com',
        environment: 'master',
        typeName: 'Contentful',
      },
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        shouldPurge: false,
      },
    },
  ],

  transformers: {
    remark: {
      plugins: [
        [
          'gridsome-plugin-remark-prismjs-all',
          {
            showLineNumbers: true,
            prompt: {
              user: 'root',
              host: 'localhost',
              global: false,
            },
          },
        ],
      ],
    },
  },

  templates: {
    Post: '/blog/:slug',
    Tag: '/tag/:id',
    ContentfulProject: '/projects/:slug',
    ContentfulContribution: '/contributions/:slug',
    ContentfulExperience: '/resume/:slug',
  },

  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: postcssPlugins,
  //     },
  //   },
  // },
}
