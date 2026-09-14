<template>
  <div
    v-if="value"
    data-name="campaigns-adset-card-indicators-brand-awareness-daily-actions-limit"
  >
    <div class="_text-caption mb-1">
      {{ t('campaignRow.dailyActionsLimit') }}
      <QuestionTooltip :size="12">
        <div class="_text-m-regular">
          {{ t('campaignRow.dailyActionsLimitLabel') }}
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

import { StrategyPayment } from '@/core/types'
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
	// if ([StrategyPayment.CPM, StrategyPayment.PPVA].includes(props.adset.strategyPayment)) {
	if ([StrategyPayment.PPVA].includes(props.adset.strategyPayment)) {
		return `${formatNumber(props.adset.dailyActionLimit.today, false)} ${t('campaignRow.of')} ${formatNumber(props.adset.dailyActionLimit.limit, false)}`
	}
	if ([StrategyPayment.CPA, StrategyPayment.CPC].includes(props.adset.strategyPayment)) {
		return `${formatNumber(props.adset.impressions.dailyLimitRest, false)} ${t('campaignRow.of')} ${formatNumber(props.adset.impressions.dailyLimit, false)}`
	}
	return null
})
</script>
