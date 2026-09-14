<template>
  <ElTag
    v-if="adset.dailyActionLimit.enabled && adset.dailyActionLimit.today !== null && adset.dailyActionLimit.limit !== null"
    data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"
    size="small"
    type="success"
    round
  >
    <span class="font-regular">{{ t('campaignRow.tags.actionBonus') }}</span>
  </ElTag>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IBrandAwarenessAdset
}>()
</script>
