<script setup lang="ts">
const props = defineProps<{
  href: string
  isExternal?: boolean
  label: string
}>()
</script>

<template>
  <a
    :href="props.href"
    :target="props.isExternal ? '_blank' : undefined"
    rel="noreferrer"
    >{{ props.label }}</a
  >
</template>
