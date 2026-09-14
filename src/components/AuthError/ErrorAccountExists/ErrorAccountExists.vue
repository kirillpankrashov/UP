<template>
  <div class="_text-s-regular mt-4 text-danger">
    {{ t('errors.accountAlreadyExists') }}
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { messages } from '@/components/AuthError/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
