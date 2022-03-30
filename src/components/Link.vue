<script setup lang="ts">
const props = defineProps<{
  href: string
  isExternal?: boolean
  label?: string
  a11yLabel?: string
}>()
</script>

<template>
  <a
    :href="props.href"
    :target="props.isExternal ? '_blank' : undefined"
    :aria-label="props.a11yLabel ?? props.label"
    rel="noreferrer"
  >
    <slot />
    {{ props.label }}
  </a>
</template>
