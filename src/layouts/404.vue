<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="flex flex-wrap justify-center h-screen align-middle">
    <div
      class="flex justify-center self-center w-screen text-6xl font-bold text-white uppercase"
    >
      <router-view />
    </div>
    <div class="flex justify-center self-start w-screen">
      <button
        class="p-3 text-4xl font-bold text-white uppercase rounded-md border border-white border-solid"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
