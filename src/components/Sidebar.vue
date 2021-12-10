<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { socialStore } from '~/stores/social'

const social = socialStore()
const { items } = storeToRefs(social)

onMounted(() => {
  social.getSocialItems()
})
</script>

<template>
  <ul>
    <li v-for="({ title, uri }, index) in items" :key="index">
      <a :href="uri" rel="noreferrer" target="_blank">{{ title }}</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
  display: inline-flex;
  flex-direction: column;
  align-self: flex-end;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--gainsboro);
    margin-top: 1rem;
  }

  li {
    margin: auto 2px;

    a {
      text-decoration: none;
      color: var(--opal);

      &:visited {
        color: var(--opal);
      }
    }
  }
}
</style>
