<template>
  <div data-name="partner-analytics-common">
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        :title="t('analytics.impressions')"
        :value="stats?.impressions.current || 0"
        :total="t('analytics.outOf') + ' ' + stats?.impressions.limit || 0"
      />

      <StatCard
        :title="t('analytics.spent')"
        :value="formatCurrency(stats?.spent.current || 0, false, stats?.advertiser.wallet.currency.code)"
        :total="t('analytics.outOf') + ' ' + formatCurrency(stats?.spent.limit || 0, false, stats?.advertiser.wallet.currency.code)"
      />

      <StatCard
        :title="t('analytics.CTR')"
        :value="(stats?.ctr || 0).toFixed(2) + '%'"
      />
    </div>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-6">
      <StatCardSimple
        :title="t('analytics.reach')"
        :value="stats?.reach || 0"
      />

      <StatCardSimple
        :title="t('analytics.viewability')"
        :value="99"
      />

      <StatCardSimple
        :title="t('analytics.channels')"
        :value="stats?.channels || 0"
      />

      <StatCardSimple
        :title="t('analytics.avgCPM')"
        :value="stats?.avgCpm.toFixed() || 0"
      />

      <StatCardSimple
        :title="t('analytics.totalClicks')"
        :value="stats?.clicksTotal || 0"
      />

      <StatCardSimple
        v-if="statisticsStore.campaignType === 'brand-awareness'"
        :title="t('analytics.fills')"
        :value="stats?.fills || 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

import { StatCard, StatCardSimple } from './components'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const statisticsStore = useStatisticsStore()

const stats = computed(() => statisticsStore.data)
</script>
