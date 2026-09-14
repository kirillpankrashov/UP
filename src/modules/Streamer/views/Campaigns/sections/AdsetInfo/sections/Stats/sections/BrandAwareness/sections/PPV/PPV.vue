<template>
  <div
    data-name="campaigns-stats-brand-awareness-ppv"
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
      <div class="_text-s-regular">
        {{ t('campaignSidebar.totalRevenue') }}
        <br>
        <a
          data-test="campaigns-stats-total-revenue-link"
          :href="$t('links.howIsItCalculated')"
          target="_blank"
        >
          {{ t('campaigns.advice.potentialIncome.link') }}
        </a>
      </div>
    </div>
    <!-- End of Revenue -->

    <!-- CTR -->
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-ctr"
          class="_headline-2"
          :class="{'text-success': ctr >= targetCtr, 'text-danger': ctr < targetCtr}"
        >{{ ctr }}%</span>
        <span
          data-test="campaigns-stats-ctr-target"
          class="_headline-1"
        > / {{ targetCtr }}%</span>
      </div>

      <div class="_text-s-regular">
        {{ t('campaignSidebar.ctr') + ' / ' + t('campaignSidebar.target_ctr') }}
        <br>
        <a
          data-test="campaigns-stats-ctr-link"
          :href="$t('links.howToIncreaseCtr')"
          target="_blank"
        >
          {{ t('campaignSidebar.howToIncreaseCtr') }}
        </a>
      </div>
    </div>
    <!-- End of CTR -->

    <!-- Impressions -->
    <div>
      <div
        v-if="isExternalFormat(adset.format.id)"
        class="mb-2"
      >
        <span
          data-test="campaigns-stats-total-impressions"
          class="_headline-2"
        >{{ formatNumber(adset.impressions.total, false) }} </span>
        <span class="text-m-bold"> / ∞</span>
      </div>
      <div
        v-else
        class="mb-2"
      >
        <span
          data-test="campaigns-stats-total-impressions"
          class="_headline-2"
        >{{ formatNumber(adset.impressions.total, false) }} </span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.deliveredImpressions') }}
      </div>
    </div>
    <!-- End of Impressions -->

    <!-- Clicks -->
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
    <!-- End of Clicks -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { isExternalFormat } from '@/core/helpers'
import { useCurrency, useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: IBrandAwarenessAdsetInfo
	containerClass: string
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, formatNumber } = useCurrency()

const targetCtr = computed(() => {
	if (props.adset.ctr.target !== null) {
		return props.adset.ctr.target
	}

	return props.adset.ctr.global || 0
})

const ctr = computed(() => props.adset.ctr.current)
</script>
