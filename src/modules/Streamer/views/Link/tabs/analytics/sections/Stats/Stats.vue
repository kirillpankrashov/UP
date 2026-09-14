<template>
  <DashboardSection
    id="link-analytics-stats"
    data-name="streamer-link-analytics-stats"
    :no-left="true"
    :no-border="true"
    :collapsable="false"
  >
    <div class="mt-6 flex flex-col flex-wrap justify-start sm:gap-3">
      <div
        class="grid w-full rounded sm:grid-cols-2"
        :class="{'sm:grid-cols-3': isPremium}"
      >
        <StatCard
          data-test="link-analytics-stats-supporters"
          :label="t('link.supporters.stats.supporters')"
          :value="formatNumber(statistics?.supporters.monthly || 0, false, currency)"
        />
        <StatCard
          data-test="link-analytics-stats-revenueDay"
          :label="t('link.supporters.stats.revenueDay')"
          :value="formatCurrency(analytics?.revenue.day || 0, true, currency)"
        />
        <StatCard
          data-test="link-analytics-stats-cpm"
          v-if="isPremium"
          :label="t('link.supporters.stats.cpm')"
          :value="formatNumber(analytics?.avgCpm || 0, true, currency)"
        />
      </div>

      <div
        class="grid w-full rounded sm:grid-cols-2"
        :class="{'sm:grid-cols-3': isPremium}"
      >
        <StatCard
          data-test="link-analytics-stats-points"
          :label="t('link.supporters.stats.points')"
          :value="formatNumber(statistics?.points.monthly || 0, false, currency)"
        />
        <StatCard
          data-test="link-analytics-stats-revenueMonth"
          :label="t('link.supporters.stats.revenueMonth')"
          :value="formatCurrency(analytics?.revenue.month || 0, true, currency)"
        />
        <StatCard
          data-test="link-analytics-stats-impressions"
          v-if="isPremium"
          :label="t('link.supporters.stats.impressions')"
          :value="formatNumber(analytics?.impressions || 0, false, currency)"
        />
      </div>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { StatCard } from '@/components'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, formatNumber } = useCurrency()

const streamerStore = useStreamerStore()
const analyticsStore = useLinkAnalyticsStore()

const analytics = computed(() => analyticsStore.analytics)
const statistics = computed(() => analyticsStore.statistics)

const isPremium = computed(() => !!analytics.value?.isPremium)
const currency = computed(() => streamerStore.profile?.currency)
</script>
