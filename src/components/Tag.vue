<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <span
    class="inline-flex justify-center items-center px-3 mr-2 last:mr-0 h-8 text-xs text-white bg-blue-200 rounded-md"
    >{{ props.label }}</span
  >
</template>
