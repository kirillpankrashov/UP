<template>
  <div
    data-name="campaigns-stats-extension"
    class="relative mb-8 grid gap-y-6 rounded bg-primary-50 px-2 py-5 text-center sm:grid-cols-2 sm:before:absolute sm:before:inset-y-2 sm:before:left-1/2 sm:before:w-[1px] sm:before:bg-light-gray sm:before:content-['']"
  >
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-revenue"
          class="_headline-2"
        >{{ formatCurrency(adset.income.current) }} </span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.revenue') }}
        <br>
        <a
          data-test="campaigns-stats-revenue-link"
          :href="$t('links.howIsItCalculated')"
          target="_blank"
        >
          {{ t('campaigns.advice.potentialIncome.link') }}
        </a>
      </div>
    </div>

    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-ctr"
          class="_headline-2"
          :class="{'text-danger': adset.ctr.current < targetCtr, 'text-success': adset.ctr.current >= targetCtr}"
        >
          {{ adset.ctr.current }}%
        </span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.ctr') }}
        <br>
        <a
          data-test="campaigns-stats-ctr-link"
          :href="$t('links.howToIncreaseCtr')"
          target="_blank"
        >
          {{ t('campaigns.advice.ctr.link') }}
        </a>
      </div>
    </div>

    <div>
      <div
        class="mb-2"
      >
        <span
          data-test="campaigns-stats-total-impressions"
          class="_headline-2"
        >{{ formatNumber(adset.impressions, false) }} </span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.deliveredImpressions') }}
      </div>
    </div>

    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-clicks"
          class="_headline-2"
        >{{ formatNumber(adset.clicks, false) }}</span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.clicks') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import type { IExtensionAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: IExtensionAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, formatNumber } = useCurrency()

const targetCtr = computed(() => {
	if (props.adset.ctr.target !== null) {
		return props.adset.ctr.target
	}

	return props.adset.ctr.global || 0
})
</script>
