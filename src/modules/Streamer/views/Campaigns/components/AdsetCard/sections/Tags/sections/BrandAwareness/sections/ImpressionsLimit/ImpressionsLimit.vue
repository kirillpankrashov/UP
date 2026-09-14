<template>
  <ElTag
    v-if="adset.impressions.current >= adset.impressions.dailyLimit"
    data-name="campaigns-adset-card-tags-brand-awareness-impressions-limit"
    size="small"
    type="warning"
    round
  >
    <span class="font-regular">{{ t('campaignRow.tags.dailyLimitDepleted') }}</span>
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
