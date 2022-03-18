<template>
  <div
    class="inline-block relative after:absolute after:top-[10px] after:right-0 after:z-0 pr-3 pb-2 mb-4 after:w-7 after:h-5 after:content-[''] after:bg-[length:6px_6px] after:bg-repeating-radial-gradient after:opacity-40"
  >
    <h3
      class="relative z-[1] text-xl font-semibold text-[color:var(--timeline-text-title)]"
    >
      <slot />
    </h3>
  </div>
</template>
