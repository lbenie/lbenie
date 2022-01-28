<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="flex align-middle justify-center flex-wrap h-screen">
    <div
      class="w-screen flex justify-center self-center text-white text-6xl uppercase font-bold"
    >
      <router-view />
    </div>
    <div class="w-screen flex justify-center self-start">
      <button
        class="text-4xl text-white uppercase font-bold border border-white border-solid p-3 rounded-md"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
