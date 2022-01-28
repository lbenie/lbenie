<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { NavigationCollection } from '~/models'

const query = `
  {
    navigationCollection(order: name_ASC) {
      items {
        slug
        name
      }
    }
  }
`

const { data } = useContentful<NavigationCollection>(query)

const resume = computed(() =>
  data.value?.items?.find(({ name }) => name === 'resume'),
)
const itemsNoResume = computed(() =>
  data.value?.items?.filter(({ name }) => name !== 'resume'),
)
</script>

<template>
  <nav class="flex flex-row self-start justify-end">
    <ol class="p-0 inline-flex list-none text-[#fff]">
      <li
        v-for="({ name, slug }, index) in itemsNoResume"
        :key="index"
        class="my-auto mr-1 ml-1 text-inherit"
      >
        <router-link :to="`/${slug ?? ''}`" class="p-1 no-underline capitalize">
          {{ name }}
        </router-link>
      </li>
      <li
        v-if="resume"
        class="text-blue-300 border border-solid border-[#fff] rounded-md px-3 py-3 pr-4 pl-4 text-xl"
      >
        <Link
          :href="resume.slug"
          class="my-auto mr-1 ml-1 text-inherit capitalize"
          :label="resume.name"
        />
      </li>
    </ol>
  </nav>
</template>
