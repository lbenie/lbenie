---
title: 'Comment créer un site web statique avec Contentful et Gridsome'
slug: 'how-to-build-a-static-website-with-contentful-and-gridsome'
description: 'Comment démarrer avec Contentful et Gridsome. Nécessite une connaissance de base de Vue.js et une certaine expérience en programmation.'
date: 2020-02-08
tags: ['Gridsome', 'Vue.js', 'Contentful', 'GraphQl']
draft: false
locale: 'fr'
translationKey: 'gridsome-contentful'
featured: false
---

Je n'ai jamais pris le temps de construire correctement mon site web même si je suis développeur logiciel senior. J'ai commencé à explorer certaines technologies en 2018 et 2019, j'ai trouvé des projets incroyables (nuxt, vuepress, etc...) mais je n'ai jamais terminé mon site web personnel.

Cette tendance a pris fin lorsque j'ai découvert Gridsome. Il possède tout ce que je cherchais. C'est BYOD (apportez vos données), utilise une source de vérité unique (GraphQL) et est propulsé par `Vue.js`. Bien sûr, il a plus de fonctionnalités, consultez-les sur [gridsome.org](https://gridsome.org/).

> P.S. J'ai construit ce site web en utilisant ce tutoriel et j'ai ressenti le besoin d'écrire un article à ce sujet pour aider d'autres personnes à faire la même chose :)

## Outils

Pour construire notre site web statique, nous utiliserons trois outils principaux :

- Gridsome pour notre site web statique, propulsé par Vue.js.
- Contentful pour héberger nos données.
- Netlify pour héberger notre site web statique.

## Établir les fondations pour notre contenu

La première étape consiste à configurer `Contentful` où nous stockerons notre contenu sur leur cloud. Si vous n'avez pas de compte sur [Contentful](https://contentful.com), créez-en un.
Une fois que vous avez un compte, connectez-vous et nous préparerons notre espace avec des modèles de contenu adaptés à un blog et un exemple de contenu.

Pour ce faire, cliquez simplement sur le menu en haut à gauche et cliquez sur le bouton pour créer un nouvel espace. Vous pouvez choisir de créer un espace d'exemple avec un exemple de blog. Pour les besoins de ce tutoriel, c'est ce que nous ferons. Nommez votre espace et récupérons notre clé `API` et notre `ID d'espace`.

Pour récupérer notre clé `API`, cliquez sur le bouton `'Use the API'`. De là, vous pourrez récupérer votre `Space ID` Content et votre `Delivery API access token`. L'environnement devrait être `master` par défaut. Nous en aurons besoin pour intégrer avec `Gridsome`.

## Échafauder notre site web statique

Pour installer `Gridsome`, vous pouvez utiliser [Yarn](https://yarnpkg.com/) ou [NPM](https://nodejs.org/en/). Il est recommandé d'utiliser le premier.

1. Installer l'outil CLI de Gridsome

- Avec **YARN**

```bash
yarn global add @gridsome/cli
```

- Avec **NPM**

```bash
npm install --global @gridsome/cli
```

2. Créer notre projet Gridsome

```bash
gridsome create my-first-blog
cd my-first-blog
yarn install # or if you use npm, npm install
yarn develop # or if you use npm, npm run develop
```

Maintenant que notre projet a été échafaudé, plongeons-nous dedans !

## Ajouter nos données dans notre site web

Maintenant que nous sommes opérationnels, nous pouvons ajouter nos données de `Contentful` à notre site statique `Gridsome`. Nous devons configurer `Gridsome` avec le plugin contentful.

Tout d'abord, ajoutons ces modules :

```bash
yarn add @gridsome/source-contentful markdown-it
```

Ensuite, créons notre fichier `.env` à la racine du projet pour contenir nos valeurs `Space ID` et `Access Token` de contentful.

> Assurez-vous de ne jamais pousser ce fichier sur un dépôt. Si cela arrive, n'importe qui pourrait utiliser la clé API et faire des choses nuisibles à vos données.

> Il est fortement recommandé d'ajouter votre fichier `.env` à votre fichier `.gitignore`.

```bash
CTF_SPACE_ID="<YOUR_CONTENTFUL_SPACE_ID>"
CTF_ACCESS_TOKEN="<YOUR_CONTENTFUL_ACCESS_TOKEN>"
```

Maintenant, dirigeons-nous vers notre fichier `gridsome.config.js` et ajoutons cette configuration.

```js {3-15}
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

Par défaut, Gridsome est déjà configuré pour lire les données de notre fichier `.env`.

Nous avons officiellement lié nos données à notre site web statique. Nous pouvons maintenant construire une page où nous pouvons lister tous nos articles de blog. Créons un fichier `pages/Blog.vue` et ajoutons cet extrait de code ci-dessous :

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
          <div>{{ node.excerpt }}</div>
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

Nous sommes maintenant prêts à ajouter un lien vers notre nouvelle page `Blog`. Dirigeons-nous vers `layouts/Default.vue` et ajoutons ce qui suit après le lien `/about` :

```html
<g-link to="/blog">Blog</g-link>
```

Maintenant, nous pouvons accéder à notre route `/blog`, mais tous les liens sur cette page nous redirigeront vers la page `404`. Pour corriger cela, nous devrons créer un modèle pour notre article de blog `contentful`. Créez un fichier `templates/ContentfulBlogPost.vue`.

> Le nom du fichier doit correspondre au nom de la collection dans l'environnement GraphQL. Si vous avez entré un typeName différent dans le `gridsome.config.js` pour le plugin contentful. Par exemple, ContentfulDataBlogPost.vue si vous avez choisi `contentfulData` comme `typeName`.

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

Avec cela, nous devrions être en mesure de naviguer vers `/blog` et de sélectionner un article de blog et de naviguer vers `/blog/:slug` de manière transparente.

## Héberger notre site web statique

Comme mentionné précédemment, nous utiliserons `Netlify` pour déployer notre site web statique. Si vous n'avez pas de compte, rendez-vous sur [netlify](https://netlify.com/) et créez-en un. Lorsque vous disposez de votre compte, cliquez sur le bouton `'New Site from Git'`. Suivez les instructions et nous n'aurons pas besoin de spécifier une `command`, nous créerons un fichier `netlify.toml` avec notre configuration. Cliquez sur l'onglet `'Advanced'` et nous pourrons créer des variables d'environnement sur `Netlify`. Ici, vous définirez les valeurs de votre fichier `.env` car nous ne pouvons pas versionner ce fichier. De cette façon, `Netlify` saura passer les variables de notre site web statique pour se connecter à `contentful`.

Retournons à notre éditeur et créons le fichier `netlify.toml` à la racine du projet.

```
[build]
  publish = "dist"
  command = "gridsome build"
```

Poussons notre code sur `GitHub` et `Netlify` s'occupera du reste pour nous !

## Prévisualiser notre site web

Hourra ! Nous avons terminé, notre site web statique a été configuré et déployé. Si vous souhaitez prévisualiser votre site web, `Netlify` fournit une URL et vous pouvez la partager avec vos amis pour qu'ils puissent voir votre travail génial !
