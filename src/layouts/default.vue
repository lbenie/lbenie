<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch, nextTick } from 'vue'

const route = useRoute()

nextTick(() => {
  watch(
    () => route.name,
    () => {
      document
        .querySelector('.content')
        ?.querySelectorAll('a')
        .forEach((anchor) => {
          anchor.target = '_blank'
          anchor.rel = 'noreferrer noopener'
        })
    },
    {
      immediate: true,
    },
  )
})
</script>

<template>
  <main>
    <Sidebar class="sidebar" />

    <Navbar class="navbar" />

    <div class="content">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 3fr 0;
  grid-template-rows: 2fr 3fr 0;
  grid-template-areas:
    'header header header'
    'sidebar content content'
    'sidebar content content';
}

.sidebar {
  grid-area: sidebar;
}

.navbar {
  grid-area: header;
}

.content {
  padding: 1rem;
  color: var(--gainsboro);
  grid-area: content;
}

.fade-enter-active {
  transition: all 0.8s ease-out;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
