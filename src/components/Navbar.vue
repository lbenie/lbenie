<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */

import { navigationStore } from '~/stores/navigation'
import { storeToRefs } from 'pinia'

const navigation = navigationStore()
const { items } = storeToRefs(navigation)

const resume = computed(() => items.value.find(({ name }) => name === 'resume'))
const itemsNoResume = computed(() =>
  items.value.filter(({ name }) => name !== 'resume'),
)

onMounted(() => {
  navigation.getNavigationItems()
})
</script>

<template>
  <nav>
    <ol>
      <li
        v-for="({ name, slug }, index) in itemsNoResume"
        :key="index"
        class="list-item"
      >
        <router-link :to="slug">
          {{ name }}
        </router-link>
      </li>
      <li v-if="resume">
        <a :href="resume.slug" class="resume">{{ resume.name }}</a>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: end;
}

ol {
  padding: 0;
  display: inline-flex;
  list-style: none;

  color: var(--opal);

  .resume {
    color: var(--magic-mint);
    border: 1px solid var(--magic-mint);
    border-radius: 4px;
    padding: 0.75rem 1rem;
    line-height: 1;

    &:hover,
    &:focus {
      background-color: var(--turquoise-green);
      outline: none;
    }
  }

  a {
    padding: 5px;
    text-decoration: none;
    text-transform: capitalize;

    &:visited {
      color: inherit;
    }
  }

  li {
    margin: auto 2px;
    color: inherit;
  }
}
</style>
