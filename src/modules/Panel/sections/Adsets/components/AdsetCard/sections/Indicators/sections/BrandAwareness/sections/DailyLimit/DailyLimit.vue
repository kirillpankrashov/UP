<template>
  <div
    v-if="value"
    data-name="campaigns-adset-card-indicators-brand-awareness-daily-limit"
  >
    <div class="_text-caption mb-1">
      {{ t('campaignRow.dailyLimit') }}
    </div>
    <div class="_text-m-regular whitespace-nowrap">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { StrategyPayment } from '@/core/types'
import { isExternalFormat } from '@/core/helpers'
import { useCurrency } from '@/core/hooks'
import { useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
	adset: IBrandAwarenessAdset
}>()

const { formatNumber } = useCurrency()

const value = computed(() => {
	if (isExternalFormat(props.adset.format.id)) {
		return `${(props.adset.impressions.current)} / ∞`
	}
	// if ([StrategyPayment.CPM, StrategyPayment.CPC, StrategyPayment.PPV, StrategyPayment.PPVA].includes(props.adset.strategyPayment)) {
	if ([StrategyPayment.CPC, StrategyPayment.PPV, StrategyPayment.PPVA].includes(props.adset.strategyPayment)) {
		return `${formatNumber(props.adset.impressions.dailyLimitRest, false)} ${t('campaignRow.of')} ${formatNumber(props.adset.impressions.dailyLimit, false)}`
	}
	return null
})
</script>
