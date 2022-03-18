<script setup lang="ts">
import { useContentful } from '~/hooks'
import type { ExperienceCollection } from '~/models'
import Skill from '~/components/Skill.vue'
import type { SkillsCollection } from '~/models/skillCollection'

const { t } = useI18n()

const resume = t('resume')
const content = `Lucien Bénié's ${resume}`

useHead({
  title: resume,
  meta: [
    { name: 'description', content },
    { name: 'og:description', content },
  ],
})

type Result = {
  experienceCollection: ExperienceCollection['experienceCollection']
  skillsCollection: SkillsCollection['skillsCollection']
}

const query = `
  {
    experienceCollection(order:from_DESC) {
      items {
        company
        from
        to
        address
        description
        role
        slug
        stack
        isRemote
        exerpt
      }
    }
    skillsCollection {
      items {
        name
        percentage
      }
    }
  }
`

const { data } = useContentful<Result>(query)
</script>

<template>
  <section class="flex flex-col h-full">
    <div class="px-4">
      <page-title>
        {{ resume }}
      </page-title>
    </div>
    <div class="flex">
      <div class="flex-col px-4 w-2/3">
        <block-title>Education</block-title>
        <timeline-item
          v-for="{ company, from, to, role, isRemote, exerpt, slug } in data
            .experienceCollection?.items"
          :key="company"
          :left="{
            date: `${new Date(from).getFullYear()} - ${
              !!to ? new Date(to).getFullYear() : 'Present'
            }`,
            text: company,
          }"
          :right="{
            content: exerpt,
            title: role,
            slug,
          }"
          :is-remote="isRemote"
        />
      </div>
      <div class="px-4 w-1/3">
        <block-title>{{ t('skills') }}</block-title>
        <skill
          v-for="{ name, percentage } in data.skillsCollection?.items"
          :key="name"
          :title="name"
          :percentage="`${percentage}%`"
        />
      </div>
    </div>
  </section>
</template>
