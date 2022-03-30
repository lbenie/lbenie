<template>
  <div
    class="inline-block relative after:absolute after:top-[10px] after:right-0 after:z-0 pr-6 pb-4 mb-8 after:w-12 after:h-7 after:content-[''] after:bg-[length:6px_6px] after:bg-repeating-radial-gradient after:opacity-40"
  >
    <h2
      class="z-[1] text-2xl font-semibold text-[color:var(--timeline-text-title)]"
    >
      <slot />
    </h2>
  </div>
</template>
