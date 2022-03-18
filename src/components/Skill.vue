<script setup lang="ts">
const props = defineProps<{
  percentage: string
  title: string
}>()
</script>

<template>
  <div class="flex flex-col flex-wrap mb-6">
    <div class="flex justify-between">
      <h4 class="mb-1 font-semibold text-[color:var(--timeline-text-title)]">
        {{ props.title }}
      </h4>
      <span class="self-center text-xs text-[color:var(--timeline-date)]">{{
        props.percentage
      }}</span>
    </div>
    <div
      class="inline-block before:absolute relative before:content-[''] before:bg-[color:var(--icon-color-active)] bg-[color:var(--main-background)] rounded-lg border-[1px] border-[color:var(--icon-color-active)]"
    >
      <div
        :style="{ width: props.percentage }"
        class="p-0 h-2 bg-[color:var(--icon-color-active)] rounded-lg border-2 border-[color:var(--main-background)] border-solid"
      ></div>
    </div>
  </div>
</template>
