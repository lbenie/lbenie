<template>
  <Layout>
    <section class="container-inner mx-auto py-16" v-if="$page">
      <h1 class="text-4xl font-bold mb-8">My Resume</h1>
      <h2 class="text-3xl font-bold mb-8">
        I am a veteran of 6 years in Web Development.
      </h2>
      <ul>
        <li
          v-for="{ node } in $page.experiences.edges"
          :key="node.id"
          class="mb-12"
          :class="{
            'border-4 p-3 border-green-500': !node.to,
            'border-gray-400 border-b': node.to,
          }"
        >
          <h2 class="text-2xl font-bold">
            {{ node.title }}
          </h2>
          <p class="mb-4 text-lg">{{ node.role }}</p>
          <div class="ml-5">
            <span class="mb-4 leading-5">
              <span> {{ node.from }} -</span>
              <span v-if="node.to">
                {{ node.to }}
              </span>
              <span v-else>
                Present
              </span>
            </span>
            <p class="mb-4 leading-5">{{ node.address }}</p>
          </div>
          <h4 class="text-xl my-1">Technology stack</h4>
          <ul class="flex flex-wrap">
            <li v-for="(tag, index) in node.stack" :key="index" class="my-2">
              <tag :name="tag" />
            </li>
          </ul>
          <p class="text-lg mb-8">
            {{ node.excerpt }}
          </p>
          <div class="mb-8">
            <g-link :to="node.path" class="btn border border-blue-500"
              >Read More</g-link
            >
          </div>
        </li>
      </ul>
      <pager
        class="flex justify-evenly"
        v-if="$page.experiences.pageInfo.totalPages > 1"
        linkClass="btn"
        :info="$page.experiences.pageInfo"
      />
    </section>
  </Layout>
</template>

<page-query>
query Experiences($page: Int) {
  experiences: allContentfulExperience(
    sortBy: "from"
    order: DESC
    perPage: 6
    page: $page
  ) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        company
        address
        role
        from(format: "MMMM D, Y")
        to(format: "MMMM D, Y")
        description
        stack
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
    const title = 'My Resume'

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
          content: `resume,me,cv,curriculumvitae,vue,Vue,vue.js,Vue.js,angular,Angular,angular.js,TypeScript,typescript,JavaScript,javascript,Nuxt,nuxt,Nuxt.js,nuxt.js,HTML,CSS,html,css,api,API,Lucien Bénié,lbenie,Lucien,Bénié,benie`,
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
