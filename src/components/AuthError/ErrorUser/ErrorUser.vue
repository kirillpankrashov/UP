<template>
  <div
    id="twitch-auth-error"
    class="_text-s-regular mt-4 text-danger"
  >
    <p v-html="t('errors.user')" />
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { messages } from '@/components/AuthError/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
