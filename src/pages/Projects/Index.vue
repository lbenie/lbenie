<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { ProjectCollection } from '~/models'

useHead({
  title: 'Projects',
  meta: [{ name: 'description', content: `Lucien Benie's projects` }],
})

const query = `
  {
    projectCollection {
      total
      limit
      skip
      items {
        slug
        name
        summary
        tags
      }
    }
  }
`

const { data, isLoading } = useContentful<ProjectCollection>(query)
</script>

<template>
  <div v-if="!isLoading">
    <h1 class="text-white">Projects</h1>
    <ul class="list-none">
      <li
        v-for="{ name, slug, tags } in data?.projectCollection.items"
        :key="slug"
      >
        <router-link class="text-white uppercase" :to="`/projects/${slug}`">
          {{ name }}
        </router-link>
        <div class="flex flex-wrap content-start items-center">
          <Tag v-for="(tag, index) in tags" :key="index" :label="tag" />
        </div>
      </li>
    </ul>
  </div>
</template>
