<template>
  <ElTag
    v-if="isVisible"
    data-name="campaigns-adset-card-tags-performance-daily-limit"
    size="small"
    type="danger"
  >
    <span class="font-regular">{{ t('campaignRow.tags.performanceDailyDepleted') }}</span>
  </ElTag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { IPerformanceAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  adset: IPerformanceAdset
}>()

const isVisible = computed(() => props.adset.adsetReady || props.adset.ready)
</script>
