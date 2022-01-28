<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { ContributionCollection } from '~/models'

useHead({
  title: 'Open-Source',
  meta: [
    {
      name: 'description',
      content: `Lucien Benie's open-source contributions`,
    },
  ],
})

const query = `
  {
    contributionCollection {
      total
      limit
      skip
      items {
        name
        slug
        summary
        tags
        funFact
      }
    }
  }
`

const { data } = useContentful<ContributionCollection>(query)
</script>

<template>
  <div>
    <h1>Open Source</h1>
    <ul class="list">
      <li v-for="{ slug, name, tags } in data?.items" :key="slug">
        <router-link class="list-item" :to="`/open-source/${slug}`">{{
          name
        }}</router-link>
        <div class="tags">
          <Tag v-for="(tag, index) in tags" :key="index" :label="tag" />
        </div>
      </li>
    </ul>
  </div>
</template>
