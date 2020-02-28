<template>
  <a
    :href="url"
    class="embedly-card"
    rel="noopener noreferrer"
    data-card-width="100%"
    data-card-controls="0"
    >{{ title }}</a
  >
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
