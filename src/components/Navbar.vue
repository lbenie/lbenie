<script setup lang="ts">
import type { Component } from 'vue'
import { useContentful } from '~/hooks'
import type { NavigationCollection } from '~/models'
import IconCarbonHome from '~icons/carbon/home?width=2em&height=2em'
import IconGradutation from '~icons/ph/graduation-cap-light?width=2em&height=2em'
import IconGlobe from '~icons/fluent/globe-person-20-regular?width=2em&height=2em'
import IconSuitcase from '~icons/la/suitcase?width=2em&height=2em'
import IconBook from '~icons/clarity/book-line?width=2em&height=2em'

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

const iconMap: Record<string, Component> = {
  home: IconCarbonHome,
  resume: IconGradutation,
  'open-source': IconGlobe,
  projects: IconSuitcase,
  blog: IconBook,
}
</script>

<template>
  <nav class="flex flex-col self-start justify-end">
    <ol class="p-0 inline-flex flex-col list-none text-[#fff]">
      <li
        v-for="({ name, slug }, index) in data?.items"
        :key="index"
        class="my-2 mr-1 ml-1 text-inherit flex flex-col items-center"
      >
        <router-link :to="`/${slug ?? ''}`" class="p-1 no-underline capitalize">
          <component :is="iconMap[name]" />
        </router-link>
        <p class="text-xs">{{ name }}</p>
      </li>
      <!-- <li
        v-if="resume"
        class="text-blue-300 border border-solid border-[#fff] rounded-md px-3 py-3 pr-4 pl-4 text-xl"
      >
        <Link
          :href="resume.slug"
          class="my-auto mr-1 ml-1 text-inherit capitalize"
          :label="resume.name"
        />
      </li> -->
    </ol>
  </nav>
</template>
