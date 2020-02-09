<template>
  <Layout>
    <div class="container-inner mx-auto my-16" v-if="$page">
      <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
      <div class="text-xl text-gray-600 mb-4">
        <span>Posted {{ $page.post.date }}</span>
        <span> &middot; </span>
        <span>{{ $page.post.timeToRead }} min read</span>
      </div>
      <ul class="flex mb-8 text-sm">
        <li v-for="tag in $page.post.tags" :key="tag.id">
          <tag :name="tag.title" />
        </li>
      </ul>
      <div class="markdown-body mb-12" v-html="$page.post.content" />
      <div class="mb-12">
        <g-link to="/blog/" class="btn border border-blue-500"
          >Back to Blog</g-link
        >
      </div>
      <div class="comments">
        <vue-disqus shortname="lucien-benie-xyz"></vue-disqus>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Post($path: String!) {
    post: post(path: $path) {
      title
      date(format: "MMMM D, Y")
      content
      timeToRead
      tags {
        title
        path
      }
    }
  }
</page-query>

<script>
import Tag from '@/components/Tag.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    }
  },
  components: {
    Tag,
  },
}
</script>
