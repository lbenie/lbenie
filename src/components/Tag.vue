<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <span
    class="rounded-md h-8 items-center text-xs pr-3 pl-3 inline-flex justify-center text-white bg-blue-200 mr-2 last:mr-0"
    >{{ props.label }}</span
  >
</template>
