<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { SocialCollection } from '~/models'
import { getYear } from 'date-fns'

const { t } = useI18n()
const currentYear = getYear(Date.now())

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
  <div class="flex flex-col justify-around items-center bg-[#d5d5d5]">
    <img
      src="/luke.jpeg"
      alt="Lucien Bénié"
      class="h-60 w-60 rounded-full ring-2 ring-white"
    />

    <div class="flex flex-col items-center">
      <h1 class="text-[color:var(--text-primary)] text-2xl font-bold">
        Lucien Bénié
      </h1>
      <p class="text-[color:var(--text-primary)] text-xl font-semibold">
        Senior Frontend Developer
      </p>
    </div>

    <ul class="inline-flex list-none">
      <li v-for="{ title, icon, uri } in data?.items" :key="title">
        {{ uri }}
      </li>
    </ul>

    <div class="text-white text-sm">
      &copy; 2019 - {{ currentYear }}. {{ t('rights') }}.
    </div>
  </div>
</template>
