<template>
  <div class="flex justify-between text-xl items-center">
    <g-link
      :to="previousPage"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showPreviousPage,
      }"
      >&larr; Prev {{ showPreviousPage }}</g-link
    >
    <div class="text-base">Page {{ currentPage }} of {{ total }}</div>
    <g-link
      :to="nextPage"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showNextPage,
      }"
      >Next &rarr; {{ showNextPage }}</g-link
    >
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  props: {
    base: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup({ currentPage, total, base }) {
    const showPreviousPage = computed(() => currentPage !== 1)
    const previousPage = computed(() =>
      [0, 1].includes(currentPage - 1) ? base : `${base}/${currentPage - 1}/`,
    )
    const showNextPage = computed(() => currentPage !== total)
    const nextPage = computed(() =>
      total > currentPage
        ? `${base}/${currentPage + 1}/`
        : `${base}/${currentPage}/`,
    )

    return {
      showPreviousPage,
      previousPage,
      showNextPage,
      nextPage,
      currentPage,
    }
  },
}
</script>
