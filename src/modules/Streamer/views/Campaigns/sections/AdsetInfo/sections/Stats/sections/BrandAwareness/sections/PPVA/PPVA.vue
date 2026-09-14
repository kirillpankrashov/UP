<template>
  <div
    data-name="campaigns-stats-brand-awareness-ppva"
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

    <!-- Actions -->
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-actions"
          class="_headline-2"
        >{{ formatNumber(adset.dailyActionLimit.current || 0, false) }}</span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.deliveredDailyActions') }}
      </div>
    </div>
    <!-- End of Actions -->

    <!-- Impressions -->
    <div>
      <div class="mb-2">
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

const targetCtr = computed(() => {
	if (props.adset.ctr.target !== null) {
		return props.adset.ctr.target
	}

	return props.adset.ctr.global || 0
})

const ctr = computed(() => props.adset.ctr.current)
</script>
