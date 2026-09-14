<template>
  <ElTag
    v-if="adset.dailyActionLimit.enabled && adset.dailyActionLimit.today > 0 && adset.dailyActionLimit.limit > 0 && adset.dailyActionLimit.today >= adset.dailyActionLimit.limit"
    data-name="campaigns-adset-card-tags-brand-awareness-daily-actions-limit"
    size="small"
    type="danger"
    round
  >
    <span class="font-regular">{{ t('campaignRow.tags.dailyActionsLimitDepleted') }}</span>
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
