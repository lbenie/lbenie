<template>
  <main class="grid grid-cols-layout h-screen grid-areas-layout">
    <Navbar class="grid-in-navbar" />

    <Header class="grid-in-header" />

    <div
      class="overflow-y-auto right-0 p-16 h-screen bg-transparent grid-in-content"
    >
      <router-view v-slot="{ Component }">
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opactiy-100"
          leave-to-class="scale-[0.85]"
          enter-active-class="transition-all ease-in-out duration-400"
          leave-active-class="transition-all ease-in-out duration-400"
          leave-from-class="scale-1"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>
