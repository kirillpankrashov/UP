<template>
  <div
    data-name="campaigns-stats-brand-awareness-cpc"
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

    <!-- Clicks -->
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-clicks"
          class="_headline-2"
        >{{ formatNumber(adset.clicks) }}</span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.clicks') }}
      </div>
    </div>
    <!-- End of Clicks -->
  </div>
</template>

<script setup lang="ts">
import { useCurrency, useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
  adset: IBrandAwarenessAdsetInfo
	containerClass: string
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, formatNumber } = useCurrency()
</script>
