<template>
  <div class="container" tabindex="0" aria-label="Loading...">
    <div class="loading-dots">
      <span class="dot one">.</span>
      <span class="dot two">.</span>
      <span class="dot three">.</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.container
  display flex
  align-items center
  justify-content center

  .loading-dots
    z-index 1

    .dot
      font-size 4.5em
      opacity 0
      animation showHideDot 1.5s ease-in-out infinite

      &.one
        animation-delay 0.2s
      &.two
        animation-delay 0.5s
      &.three
        animation-delay 0.6s

@keyframes showHideDot
  0%
    opacity 0
  50%
    opacity 1
  60%
    opacity 1
  100%
    opacity 0
</style>
