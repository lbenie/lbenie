<template>
  <Layout>
    <div class="container-inner mx-auto my-16" v-if="$page">
      <h1 class="text-4xl font-bold leading-tight mb-4">
        {{ $page.project.title }}
      </h1>
      <ul class="flex mb-8 text-sm">
        <li v-for="(tag, index) in $page.project.tags" :key="index">
          <tag :name="tag" />
        </li>
      </ul>
      <div class="markdown-body mb-8" v-html="content" />
      <a
        :href="$page.project.url"
        class="embedly-card"
        rel="noopener noreferrer"
        data-card-width="100%"
        data-card-controls="0"
        >{{ $page.project.title }}</a
      >
      <div class="mb-8">
        <g-link class="btn border border-blue-500" to="/projects"
          >Back to Projects</g-link
        >
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Project($path: String!) {
    project: contentfulProject(path: $path) {
      title
      url
      description
      funFact
      tags
    }
  }
</page-query>

<script>
import Tag from '@/components/Tag.vue'
import MarkdownIt from 'markdown-it'

export default {
  metaInfo() {
    const title = this.$page.project.title
    const description = this.$page.project.description

    return {
      title,
      meta: [
        { key: 'og:type', name: 'og:type', content: 'article' },
        { key: 'og:title', name: 'og:title', content: title },
        { key: 'og:url', name: 'og:url', content: `${location.href}` },
        { key: 'og:locale', name: 'og:locale', content: 'en_CA' },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'description',
          name: 'description',
          content: description,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: `${this.$page.project.tags},Lucien Bénié,Blog,lbenie,Lucien,Bénié,benie`,
        },
      ],
    }
  },
  components: {
    Tag,
  },
  computed: {
    content() {
      const md = new MarkdownIt()

      return md.render(this.$page.project.description)
    },
  },
}
</script>
