<template>
  <div class="flex items-center justify-between">
    <div class="_text-m-regular sm:mr-2">
      {{ title }}:
    </div>

    <ElTag
      size="small"
      effect="dark"
      round
      :type="success ? 'success' : 'danger'"
    >
      {{ success ? t('settings.header.enabled') : t('settings.header.disabled') }}
    </ElTag>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'

defineProps<{
	title: string
	success: boolean
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
