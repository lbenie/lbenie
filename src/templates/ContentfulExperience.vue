<template>
  <Layout>
    <div
      class="container-inner mx-auto my-16"
      v-if="$page && content.length > 20"
    >
      <h1 class="text-4xl font-bold leading-tight">
        {{ $page.experience.title }}
      </h1>
      <div class="text-xl text-gray-600">
        <span> {{ $page.experience.from }} -&nbsp; </span>
        <span v-if="$page.experience.to">{{ $page.experience.to }}</span>
        <span v-else>Present</span>
      </div>
      <div class="text-md font-bold text-green-700">
        {{ $page.experience.role }}
      </div>
      <div class="text-md font-bold text-gray-600">
        {{ $page.experience.address }}
      </div>
      <ul class="flex mb-8 text-sm mt-4">
        <li v-for="stack in $page.experience.stack" :key="stack.id">
          <tag :name="stack" />
        </li>
      </ul>
      <div class="markdown-body" v-html="content" />
    </div>
    <div class="container-inner mx-auto my-16 text-6xl" v-else>
      Coming soon...
    </div>
  </Layout>
</template>

<page-query>
query Experience($path: String!) {
  experience: contentfulExperience(path: $path) {
    title
    address
    role
    from(format: "MMMM D, Y")
    to(format: "MMMM D, Y")
    description
    stack
  }
}
</page-query>

<script>
import MarkdownIt from 'markdown-it'
import Tag from '@/components/Tag.vue'

export default {
  metaInfo() {
    const title = this.$page.experience.title
    const description = this.$page.experience.description

    return {
      title,
      meta: [
        { key: 'og:type', name: 'og:type', content: 'article' },
        { key: 'og:title', name: 'og:title', content: title },
        { key: 'og:locale', name: 'og:locale', content: 'en' },
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
          content: `${this.$page.experience.stack},Lucien Bénié,Blog,lbenie,Lucien,Bénié,benie`,
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
      return md.render(this.$page.experience.description)
    },
  },
}
</script>
