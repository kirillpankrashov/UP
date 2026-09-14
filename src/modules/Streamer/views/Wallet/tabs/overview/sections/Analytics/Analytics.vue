<template>
  <DashboardSection
    v-loading="analyticsStore.isFetchingData"
    :title="t('wallet.analytics.heading')"
    :no-left="true"
  >
    <DatePicker />
    <Graph />
    <Line />
  </DashboardSection>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletAnalyticsStore } from '@/modules/Streamer/views/Wallet/store'

import {
	DatePicker,
	Graph,
	Line,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const analyticsStore = useWalletAnalyticsStore()

const month = computed(() => analyticsStore.month)

watch(month, () => {
	analyticsStore.fetchAnalytics()
})
</script>
