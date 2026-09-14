<template>
  <div
    v-if="value"
    data-name="campaigns-adset-card-indicators-brand-awareness-streamer-day-limit"
  >
    <div class="_text-caption mb-1">
      {{ t('campaignRow.streamerDayLimit') }}
      <QuestionTooltip
        :size="12"
        class="!ml-0 align-text-bottom"
      >
        <div class="_text-s-regular">
          {{ t('campaignRow.streamerDayLimitLabel') }}
        </div>
      </QuestionTooltip>
    </div>

    <div class="_text-m-regular whitespace-nowrap">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { QuestionTooltip } from '@/components'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: IBrandAwarenessAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()

const value = computed(() => {
	if (props.adset.streamerDayLimit === null || props.adset.streamerDayLimitShown === null) {
		return null
	}
	return `${formatNumber(props.adset.streamerDayLimitShown, false)} ${t('campaignRow.of')} ${formatNumber(props.adset.streamerDayLimit, false)}`
})
</script>
