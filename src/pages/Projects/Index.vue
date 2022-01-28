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

const { data } = useContentful<ProjectCollection>(query)
</script>

<template>
  <div>
    <h1>Projects</h1>
    <ul class="list">
      <li v-for="{ name, slug, tags } in data?.items" :key="slug">
        <router-link class="list-item" :to="`/projects/${slug}`">
          {{ name }}
        </router-link>
        <div class="tags">
          <Tag v-for="(tag, index) in tags" :key="index" :label="tag" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.list {
  list-style: none;
}

.list-item {
  text-transform: uppercase;
}

.tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
