<script setup lang="ts">
import { getYear } from 'date-fns'

const { t } = useI18n()
const currentYear = getYear(Date.now())
</script>

<template>
  <div class="flex justify-center text-white mb-4">
    {{ t('copyright') }} &copy; 2019 - {{ currentYear }}. {{ t('rights') }}.
  </div>
</template>
