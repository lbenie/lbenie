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

const { data, isLoading } = useContentful<NavigationCollection>(query, true)

const iconMap: Record<string, Component> = {
  home: IconCarbonHome,
  resume: IconGradutation,
  'open-source': IconGlobe,
  projects: IconSuitcase,
  blog: IconBook,
}
</script>

<template>
  <nav v-if="!isLoading" class="flex flex-col justify-end self-start">
    <ol class="inline-flex flex-col p-0 mt-2 list-none text-[#fff]">
      <li
        v-for="({ name, slug }, index) in data?.navigationCollection?.items"
        :key="index"
        class="flex flex-col items-center my-2 text-inherit border-b-[0.01em] border-b-gray-100 border-solid"
      >
        <router-link
          :to="`/${slug ?? ''}`"
          class="p-1 text-[color:var(--icon-color)] hover:text-[color:var(--icon-color-active)] no-underline capitalize"
          :aria-label="name"
        >
          <component :is="iconMap[name]" />
        </router-link>
        <p class="mb-4 text-xs text-[color:var(--text-primary)]">{{ name }}</p>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss"></style>
