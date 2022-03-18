<script setup lang="ts">
const { locale } = $(useI18n())

useHead({
  title: 'Lucien Benie',
  htmlAttrs: {
    lang: locale,
  },
  meta: [
    { name: 'description', content: 'Lucien Benie personal website' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: 'Lucien Benie' },
    { name: 'og:description', content: 'Lucien Benie personal website' },
    { name: 'og:url', content: 'https://lbenie.me' },
    { name: 'og:site_name', content: 'Lucien Benie' },
    { name: 'og:image', content: 'https://lbenie.me/luke.jpeg' },
    // { name: 'twitter:card', content: 'summary' },
    // { name: 'twitter:title', content: 'Lucien Benie' },
    // { name: 'twitter:description', content: 'Lucien Benie personal website' },
    // { name: 'twitter:image', content: 'https://lucienbenie.com/og-image.png' },
    // { name: 'twitter:image:alt', content: 'Lucien Benie' },
  ],
})
</script>

<template>
  <router-view />
</template>
