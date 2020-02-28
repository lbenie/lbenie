<template>
  <Layout>
    <section class="container-inner mx-auto py-16" v-if="$page">
      <h1 class="text-4xl font-bold">My Projects and Contributions</h1>
      <h2 class="text-3xl font-bold  my-4">Projects</h2>
      <ul>
        <li
          class="border-gray-400 border-b mb-12"
          v-for="{ node } in $page.projects.edges"
          :key="node.id"
        >
          <h3 class="text-2xl font-bold">{{ node.title }}</h3>
          <p class="text-gray-700 text-lg mb-4">
            {{ node.summary }}
          </p>
          <h4 class="text-xl my-1">Topics</h4>
          <ul class="flex flex-wrap">
            <li v-for="(tag, index) in node.tags" :key="index" class="my-2">
              <tag :name="tag" />
            </li>
          </ul>
          <div class="my-8">
            <g-link :to="node.path" class="btn border border-blue-500"
              >Read More</g-link
            >
          </div>
        </li>
      </ul>

      <pager
        class="flex justify-evenly mt-12 mb-6"
        v-if="$page.projects.pageInfo.totalPages > 1"
        linkClass="btn"
        :info="$page.projects.pageInfo"
      />
      <h2 class="text-2xl font-bold my-4">Contributions</h2>
      <ul>
        <li
          class="border-gray-400 border-b mb-12"
          v-for="{ node } in $page.contributions.edges"
          :key="node.id"
        >
          <h3 class="text-2xl font-bold">{{ node.title }}</h3>
          <p class="text-gray-700 text-lg mb-4">
            {{ node.summary }}
          </p>
          <h4 class="text-xl my-1">Topics</h4>
          <ul class="flex flex-wrap">
            <li v-for="(tag, index) in node.tags" :key="index" class="my-2">
              <tag :name="tag" />
            </li>
          </ul>
          <div class="my-8">
            <g-link :to="node.path" class="btn border border-blue-500"
              >Read More</g-link
            >
          </div>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<page-query>
  query Projects($page: Int) {
    projects: allContentfulProject(
      sortBy: "date"
      order: DESC
      perPage: 6
      page: $page
    ) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          slug
          url
          summary
          tags
          path
        }
      }
    }
    contributions: allContentfulContribution(sortBy: "date", order: DESC) {
      edges {
        node {
          id
          title
          slug
          url
          summary
          tags
          description
          path
        }
      }
    }
  }
</page-query>

<script>
import Tag from '@/components/Tag.vue'
import { Pager } from 'gridsome'

export default {
  metaInfo() {
    const title = 'Projects & Contributions'

    return {
      title: title,
      meta: [
        { key: 'og:type', name: 'og:type', content: 'website' },
        { key: 'og:title', name: 'og:title', content: title },
        { key: 'og:description', name: 'og:description', content: title },
        { key: 'description', name: 'description', content: title },
        {
          key: 'keywords',
          name: 'keywords',
          content: `Projects,projects,Contributions,contributions,vue,Vue,vue.js,Vue.js,angular,Angular,angular.js,TypeScript,typescript,JavaScript,javascript,Nuxt,nuxt,Nuxt.js,nuxt.js,HTML,CSS,html,css,api,API,Lucien Bénié,lbenie,Lucien,Bénié,benie`,
        },
      ],
    }
  },
  components: {
    Tag,
    Pager,
  },
}
</script>
