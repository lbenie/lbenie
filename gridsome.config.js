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
    {
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['Post'],
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: `Lucien Bénié's Blog Feed`,
          description: 'Personal blog',
        },
        rss: {
          enabled: true,
          output: '/feed.xml',
        },
        atom: {
          enabled: true,
          output: '/feed.atom',
        },
        json: {
          enabled: true,
          output: '/feed.json',
        },
        maxItems: 25,
        // Optional: an array of properties passed to `Feed.addItem()` that will be parsed for
        // URLs in HTML (ensures that URLs are full `http` URLs rather than site-relative).
        // To disable this functionality, set to `null`.
        htmlFields: ['description', 'content'],
        // Optional: if you wish to enforce trailing slashes for site URLs
        enforceTrailingSlashes: false,
        // Optional: a method that accepts a node and returns true (include) or false (exclude)
        // Example: only past-dated nodes: `filterNodes: (node) => node.date <= new Date()`
        filterNodes: () => true,
        // Optional: a method that accepts a node and returns an object for `Feed.addItem()`
        // See https://www.npmjs.com/package/feed#example for available properties
        // NOTE: `date` field MUST be a Javascript `Date` object
        nodeToFeedItem: ({ title, date, fields, content }) => ({
          title: title,
          date: date || fields.date,
          content: content,
        }),
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
