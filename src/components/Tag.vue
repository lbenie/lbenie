<template>
  <g-link
    :to="`tag/${name}`"
    class="bg-gray-200 rounded-full px-4 py-2 mr-4 text-sm font-semibold text-gray-700 hover:bg-green-300"
    >{{ name }}</g-link
  >
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
