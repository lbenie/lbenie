<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { SocialCollection } from '~/models'

const query = `
  {
    socialCollection {
      items {
        title
        uri
        icon
      }
    }
  }
`
const { data } = useContentful<SocialCollection>(query)
</script>

<template>
  <ul
    class="p-0 list-none inline-flex flex-col self-end items-center justify-center after:content-[''] after:block after:w-[1px] after:h-24 after:my-0 after:mx-auto after:bg-white"
  >
    <li
      v-for="({ title, uri }, index) in data?.items"
      :key="index"
      class="m-auto"
    >
      <Link
        :href="uri"
        :label="title"
        is-external
        class="no-underline text-white"
      />
    </li>
  </ul>
</template>
