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

const { data, isLoading } = useContentful<ContributionCollection>(query)
</script>

<template>
  <div v-if="!isLoading">
    <h1 class="text-white">Open Source</h1>
    <ul class="list-none">
      <li
        v-for="{ slug, name, tags } in data?.contributionCollection?.items"
        :key="slug"
      >
        <router-link
          class="text-white uppercase"
          :to="`/open-source/${slug}`"
          >{{ name }}</router-link
        >
        <div class="flex flex-wrap content-start items-center">
          <Tag v-for="(tag, index) in tags" :key="index" :label="tag" />
        </div>
      </li>
    </ul>
  </div>
</template>
