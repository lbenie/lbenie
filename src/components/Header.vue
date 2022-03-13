<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { SocialCollection } from '~/models'
import { getYear } from 'date-fns'
import type { Component } from 'vue'
import IconMail from '~icons/ic/outline-attach-email?width=2em&height=2em'
import IconGithub from '~icons/codicon/github-inverted?width=2em&height=2em'
import IconLinkedIn from '~icons/akar-icons/linkedin-v1-fill?width=2em&height=2em'

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

const iconMap: Record<string, Component> = {
  email: IconMail,
  github: IconGithub,
  linkedin: IconLinkedIn,
}
</script>

<template>
  <div
    class="flex flex-col justify-around items-center bg-[color:var(--header-background)]"
  >
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
      <li v-for="{ title, icon, uri } in data?.items" :key="title" class="mx-2">
        <Link
          :href="uri"
          is-external
          :a11y-label="title"
          class="text-[color:var(--text-primary)]"
        >
          <component :is="iconMap[icon]" />
        </Link>
      </li>
    </ul>

    <div class="text-white text-sm">
      &copy; 2019 - {{ currentYear }}. {{ t('rights') }}.
    </div>
  </div>
</template>
