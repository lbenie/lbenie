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
        class="my-2 text-inherit flex flex-col items-center border-b-gray-100 border-b-[0.01em] border-solid"
      >
        <router-link
          :to="`/${slug ?? ''}`"
          class="p-1 no-underline capitalize text-[color:var(--icon-color)] hover:text-[color:var(--icon-color-active)]"
          :aria-label="name"
        >
          <component :is="iconMap[name]" />
        </router-link>
        <p class="text-xs text-[color:var(--text-primary)] mb-4">{{ name }}</p>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss"></style>
