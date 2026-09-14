<template>
  <div
    data-name="campaigns-stats-brand-awareness-cpa"
    :class="containerClass"
  >
    <!-- Revenue -->
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-revenue"
          class="_headline-2"
        >{{ formatCurrency(adset.income.current) }} </span>
      </div>
      <div
        class="_text-s-regular"
      >
        {{ t('campaignSidebar.totalRevenue') }}
        <br>
        <a
          :href="t('links.howIsItCalculated')"
          target="_blank"
        >
          {{ t('campaigns.advice.potentialIncome.link') }}
        </a>
      </div>
    </div>
    <!-- End of Revenue -->

    <!-- EVR -->
    <div class="col-start-2 sm:row-start-1 sm:row-end-3 sm:grid-rows-2 sm:place-content-center">
      <div class="mb-2">
        <span
          data-test="campaigns-stats-evr"
          class="_headline-2"
          :class="evrLevel.level"
        >
          {{ evrLevel.text }}
        </span>
      </div>
      <div
        class="_text-s-regular"
      >
        {{ t('campaignSidebar.evr') }}
        <br>
        <a
          :href="$t('links.howToIncreaseEvr')"
          target="_blank"
        >
          {{ t('campaignSidebar.howToIncreaseEvr') }}
        </a>
      </div>
    </div>
    <!-- End of EVR -->

    <!-- Actions -->
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-delivered-daily-actions"
          class="_headline-2"
        >{{ formatNumber(adset.dailyActionLimit.current || 0, false) }}</span>
      </div>
      <div
        class="_text-s-regular"
      >
        {{ t('campaignSidebar.deliveredDailyActions') }}
      </div>
    </div>
    <!-- End of Actions -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: IBrandAwarenessAdsetInfo
	containerClass: string
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, formatNumber } = useCurrency()

const primaryEvr = computed(() => props.adset.evr.list.find(item => item.primary)?.value || 0)

const targetEvr = computed(() => {
	if (props.adset.evr.target !== null) {
		return props.adset.evr.target
	}

	return props.adset.evr.global
})

const evrLevel = computed(() => {
	if (primaryEvr.value === null || targetEvr.value === null) {
		return { text: '–', level: '' }
	}

	if (primaryEvr.value >= targetEvr.value) {
		return { text: t('campaignSidebar.scale.excellent'), level: 'text-success' }
	}
	else if (primaryEvr.value >= targetEvr.value * 0.8) {
		return { text: t('campaignSidebar.scale.veryGood'), level: 'text-success' }
	}
	else if (primaryEvr.value >= targetEvr.value * 0.5) {
		return { text: t('campaignSidebar.scale.good'), level: 'text-warning' }
	}
	else if (primaryEvr.value >= targetEvr.value * 0.2) {
		return { text: t('campaignSidebar.scale.fair'), level: 'text-danger' }
	}
	else {
		return { text: t('campaignSidebar.scale.poor'), level: 'text-danger' }
	}
})
</script>
