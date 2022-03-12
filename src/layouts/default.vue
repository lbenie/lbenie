<template>
  <main class="h-screen grid">
    <Navbar class="navbar" />

    <Header class="header" />

    <div class="content p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-template-columns: 0.25fr 0.75fr 2fr;
  grid-template-areas: 'navbar header content';
}

.header {
  grid-area: header;
}

.navbar {
  grid-area: navbar;
}

.content {
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
