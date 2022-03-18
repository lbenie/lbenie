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
      class="w-60 h-60 rounded-full ring-2 ring-white"
    />

    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-[color:var(--text-primary)]">
        Lucien Bénié
      </h1>
      <p class="text-xl font-semibold text-[color:var(--text-primary)]">
        Senior Frontend Developer
      </p>
    </div>

    <ul class="inline-flex list-none">
      <li
        v-for="{ title, icon, uri } in data?.items"
        :key="title"
        class="p-2 mx-2 hover:bg-[color:var(--icon-background)] hover:rounded-full"
      >
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

    <button
      class="py-2 px-4 font-semibold text-[color:var(--text-primary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--icon-color-active)] rounded-3xl border-2 border-[color:var(--text-primary)] hover:border-[color:var(--icon-color-active)]"
    >
      {{ t('button.resume') }}
    </button>

    <div class="text-sm text-white">
      &copy; 2019 - {{ currentYear }}. {{ t('rights') }}.
    </div>
  </div>
</template>
