<script setup lang="ts">
const props = defineProps<{
  left: {
    date: string
    text: string
  }
  right: {
    title: string
    content: string
    slug: string
  }
  isRemote?: boolean
}>()
</script>

<template>
  <div
    class="table relative pb-4 w-full table-fixed"
    :class="
      props.isRemote
        ? `after:content-['Remote'] after:text-[color:var(--icon-color-active)] after:absolute after:right-0`
        : ''
    "
  >
    <div class="table-cell pr-6 w-[30%] text-right align-top">
      <h5
        class="my-1 mx-0 text-base font-semibold leading-6 text-[color:var(--timeline-date)]"
      >
        {{ props.left.date }}
      </h5>
      <p
        class="mb-1 ml-4 h-24 text-sm leading-6 text-[color:var(--timeline-text-company)]"
      >
        {{ props.left.text }}
      </p>
    </div>
    <div
      class="before:block after:block absolute before:absolute after:absolute inset-y-0 left-[30%] before:z-0 before:mt-1 after:mt-2 before:-ml-2 after:-ml-1 w-[1px] before:w-4 after:w-2 before:h-4 after:h-2 before:content-[''] bg-[color:var(--header-background)] before:bg-[color:var(--icon-color-active)] after:bg-[color:var(--main-background)] before:rounded-lg after:rounded after:border-2 after:border-[color:var(--icon-color-active)] after:border-solid before:opacity-25"
    ></div>
    <div class="table-cell pr-4 pl-6 w-[70%] align-top">
      <router-link
        :to="`/resume/${props.right.slug}`"
        class="mb-1 text-lg font-semibold text-[color:var(--timeline-text-title)] underline decoration[#04b4e0]"
      >
        {{ props.right.title }}
      </router-link>
      <p class="mb-2 text-sm text-[color:var(--timeline-text-content)]">
        {{ props.right.content }}
      </p>
    </div>
  </div>
</template>
