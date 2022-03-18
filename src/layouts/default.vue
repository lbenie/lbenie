<template>
  <main class="grid grid-cols-layout h-screen grid-areas-layout">
    <Navbar class="grid-in-navbar" />

    <Header class="grid-in-header" />

    <div class="right-0 p-16 w-full h-full bg-transparent grid-in-content">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="transform-gpu transition  duration-75 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transform-gpu transition duration-3 ease-[cubic-bezier(1, 0.5, 0.8, 1)]"
          leave-class="opacity-0"
          leave-to-class="opacity-50"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>
