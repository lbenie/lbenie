<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */

import { navigationStore } from '~/stores/navigation'
import { storeToRefs } from 'pinia'

const navigation = navigationStore()
const { items } = storeToRefs(navigation)

onMounted(() => {
  navigation.getNavigationItems()
})
</script>

<template>
  <ul>
    <li v-for="({ name, slug }, index) in items" :key="index">
      <router-link :to="slug">
        {{ name }}
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: inline-flex;
  justify-content: end;

  li {
    margin: auto 2px;

    a {
      padding: 5px;
      text-decoration: none;
      text-transform: capitalize;

      &:visited {
        color: inherit;
      }

      transition: border-bottom 250ms ease-out -125ms;

      &:hover,
      &:focus,
      &.router-link-exact-active {
        border-bottom: 2px solid blue;
      }
    }
  }
}
</style>
