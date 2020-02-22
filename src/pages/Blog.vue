<template>
  <Layout>
    <section class="container-inner mx-auto py-16" v-if="$page">
      <ul>
        <li
          v-for="{ node } in $page.posts.edges"
          :key="node.id"
          class="post border-gray-400 border-b mb-12"
        >
          <h2 class="text-3xl font-bold">
            <g-link :to="node.path">{{ node.title }}</g-link>
          </h2>
          <div class="mb-4">
            <span>{{ node.date }}</span>
            <span> &middot; </span>
            <span>{{ node.timeToRead }} min read</span>
          </div>
          <div class="text-lg mb-8">
            {{ node.excerpt }}
          </div>
          <div class="mb-8">
            <g-link :to="node.path" class="btn border border-blue-500"
              >Read More</g-link
            >
          </div>
        </li>
      </ul>
      <pager
        class="flex justify-evenly"
        v-if="$page.posts.pageInfo.totalPages > 1"
        linkClass="btn"
        :info="$page.posts.pageInfo"
      />
    </section>
  </Layout>
</template>

<page-query>
  query Posts($page: Int) {
    posts: allPost(sortBy: "date", order: DESC, perPage: 3, page: $page)
      @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          timeToRead
          excerpt
          path
          date(format: "MMMM D, Y")
        }
      }
    }
  }
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
  metaInfo() {
    const title = 'Blog'

    return {
      title: title,
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        {
          hid: 'keywords',
          property: 'keywords',
          content: `Blog,blog,Lucien Bénié,lbenie,Lucien,Bénié,benie,personalblog,`,
        },
      ],
    }
  },
  components: {
    Pager,
  },
}
</script>
