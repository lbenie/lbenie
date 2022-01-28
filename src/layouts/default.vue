<template>
  <main class="h-screen grid">
    <Sidebar class="sidebar" />

    <Navbar class="navbar" />

    <div class="content p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <Footer class="footer" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-template-columns: 0.5fr 3fr 0;
  grid-template-rows: 2fr 3fr 0;
  grid-template-areas:
    'header header header'
    'sidebar content content'
    'sidebar content content'
    'footer footer footer';
}

.sidebar {
  grid-area: sidebar;
}

.navbar {
  grid-area: header;
}

.footer {
  grid-area: footer;
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
