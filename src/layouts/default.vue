<template>
  <main>
    <Sidebar class="sidebar" />

    <Navbar class="navbar" />

    <router-view class="content" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: repeat(3, minmax(10px, 1fr));
  grid-template-rows: auto;
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
  grid-area: content;
}
</style>
