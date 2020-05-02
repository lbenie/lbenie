---
title: 'How To Build a static Website with Contentful and Gridsome'
slug: 'how-to-build-a-static-website-with-contentful-and-gridsome'
tags: ['Gridsome', 'Vue.js', 'Contentful', 'GraphQl']
excerpt: 'How to get started with Contentful and Gridsome. Requires a base knowledge of Vue.js and some coding background.'
date: 2020-02-08
---

I never took the time to properly build my website even though I am a Senior Software Developer Engineer. I started to look at some technologies in 2018 and 2019, I found some amazing projects (nuxt, vuepress, etc...) but I never did finish my personal website.

That trend came to an end when I found Gridsome. It has everything I was looking for. It's BYOD (bring your data), uses a single source of truth (GraphQL) and powered by `Vue.js`. Of course, it has more features, check them out at [gridsome.org](https://gridsome.org/).

> P.S. I built this website using this tutorial and I felt the need to write an article about it to help others do the same thing :)

## Tools

To build our static website we will be using three main tools:

- Gridsome for our static website, powered by Vue.js.
- Contentful to host our data.
- Netlify to host our static web site.

## Layout the foundation for our content

The first step is to setup up `Contentful` where we will store our content on their cloud. If you don't have an account on [Contentful](https://contentful.com), then create one.
Once you're provisioned with an account, log in and we will prepare our space with content models suited for a Blog and an example content.

To do this, simply click on the top left menu and click on the button to create a new space. You can opt to create an example space with a Blog example. For the sake of this tutorial that's what we'll do. Name your space and let's grab our `API` key and `Space ID`.

To grab our `API` key, click on the button `'Use the API'`. From there you will be able to grab your `Space ID` Content and `Delivery API access token`. The environment should be `master` by default. We will need these to integrate with `Gridsome`.

## Scaffold our static website

To install `Gridsome`, you can use [Yarn](https://yarnpkg.com/) or [NPM](https://nodejs.org/en/). It is recommended to use the former.

1. Install Gridsome CLI tool

- Using **YARN**

```bash
yarn global add @gridsome/cli
```

- Using **NPM**

```bash
npm install --global @gridsome/cli
```

2. Create our Gridsome project

```bash
gridsome create my-first-blog
cd my-first-blog
yarn install # or if you use npm, npm install
yarn develop # or if you use npm, npm run develop
```

Now that our project has been scaffolded, let's dive in!

## Add our Data into our website

Now that we are up and running, we can add our data from `Contentful` to our static site `Gridsome`. We have to configure `Gridsome` with the contentful plugin.

First, let's add these modules:

```bash
yarn add @gridsome/source-contentful markdown-it
```

Then let's create our `.env` file at the root of the project to hold our contentful `Space ID` and `Access Token` values.

> Make sure you never push that file on a repository. If that ever happens, anyone could use the API key and do harmful things to your data.

> It is highly recommended to add your `.env` file to your `.gitignore` file.

```bash
CTF_SPACE_ID="<YOUR_CONTENTFUL_SPACE_ID>"
CTF_ACCESS_TOKEN="<YOUR_CONTENTFUL_ACCESS_TOKEN>"
```

Now, let's head to our `gridsome.config.js` file and add this configuration.

```js{3-15}
module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-contentful',
      space: process.env.CTF_SPACE_ID,
      accessToken: process.env.CTF_ACCESS_TOKEN,
      host: 'cdn.contentful.com',
      environment: 'master',
      typeName: 'Contentful',
    },
  ],
  templates: {
    ContentfulBlog: '/blog/:slug',
  },
}
```

By default Gridsome is already setup to read data from our `.env` file.

We officially have linked our data to our static website. We can now build a page where we can list all of our blog posts. Let's create a file `pages/Blog.vue` and add this code snippet below:

```html
<template>
  <Layout>
    <section v-if="$page">
      <ul>
        <li v-for="{ node } in $page.posts.edges" :key="node.id">
          <h2>
            <g-link :to="node.path">{{ node.title }}</g-link>
          </h2>
          <div>
            <span>{{ node.date }}</span>
            <span> &middot; </span>
            <span>{{ node.timeToRead }} min read</span>
          </div>
          <div>
            {{ node.excerpt }}
          </div>
          <div>
            <g-link :to="node.path">Read More</g-link>
          </div>
        </li>
      </ul>
      <pager
        v-if="$page.posts.pageInfo.totalPages > 1"
        :info="$page.posts.pageInfo"
      />
    </section>
  </Layout>
</template>

<page-query>
  query Posts($page: Int) { posts: allContentfulBlogPost(sortBy: "date", order:
  DESC, perPage: 3, page: $page) @paginate { totalCount pageInfo { totalPages
  currentPage } edges { node { id title timeToRead excerpt path date(format:
  "MMMM D, Y") } } } }
</page-query>

<script>
  import { Pager } from 'gridsome'

  export default {
    metaInfo: {
      title: 'Blog',
    },
    components: {
      Pager,
    },
  }
</script>
```

We are now ready to add a link to our new `Blog` page. Let's head to `layouts/Default.vue` and add the following after the `/about` link:

```html
<g-link to="/blog">Blog</g-link>
```

Now we can access our `/blog` route, but all of the links on that page will forward us to the `404` page. To fix that we'll need to create a template for our `contentful` blog post. Create a file `templates/ContentfulBlogPost.vue`.

> The filename must match the collection name in the GraphQL environment. If you entered a different typeName in the `gridsome.config.js` for the contentful plugin. For example, ContentfulDataBlogPost.vue if you chose `contentfulData` as the `typeName`.

```html
<template>
  <Layout>
    <div>
      <h1>
        {{ $page.post.title }}
      </h1>
      <g-image :src="$page.post.heroImage.file.url">
      <div v-html="content" />
    </div>
  </Layout>
</template>

<page-query>
  query Post($path: String!) {
    post: contentfulBlogPost(path: $path) {
      title,
      heroImage {
        file {
          url
        }
      },
      body
    }
  }
</page-query>

<script>
import MarkdownIt from 'markdown-it'

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    }
  },
  computed: {
    content() {
      const md = new MarkdownIt()

      return md.render(this.$page.post.body)
    },
  },
}
</script>
```

With this, we should be able to navigate to `/blog` and select a blog post and navigate to `/blog/:slug` seamlessly.

## Hosting our static website

As said previously, we will be using `Netlify` to deploy our static website. If you don't have an account head over [netlify](https://netlify.com/) and create one. When provisioned with your account, click the button `'New Site from Git'`. Follow the instructions and we won't need to specify a `command` we will create a `netlify.toml` file with our configuration. Click on the `'Advanced'` tab and we will be able to create environment variables on `Netlify`. Here you'll set the values from your `.env` file because we cannot version control that file. That way `Netlify` will know to pass our static website variables to connect to `contentful`.

Let's head back to our editor and let's create the `netlify.toml` file at the root of the project.

```
[build]
  publish = "dist"
  command = "gridsome build"
```

Let's push our code to `GitHub` and `Netlify` will take care of the rest for us!

## Preview our website

Hurray! We're done, our static website has been configured and deployed. If you wish to preview your website `Netlify` provides a URL and you can pass that around to friends so they can see you're awesome work!
