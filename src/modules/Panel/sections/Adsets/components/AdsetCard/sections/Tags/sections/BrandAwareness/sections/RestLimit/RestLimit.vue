<template>
  <ElTag
    v-if="adset.restLimitPercent <= REST_LIMIT_PERCENT"
    data-name="campaigns-adset-card-tags-brand-awareness-rest-limit"
    size="small"
    type="danger"
    round
  >
    <span class="font-regular">{{ t('campaignRow.tags.totalLimitDepleted') }}</span>
  </ElTag>
</template>

<script setup lang="ts">
import { REST_LIMIT_PERCENT } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IBrandAwarenessAdset
}>()
</script>
