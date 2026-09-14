<template>
  <div
    v-if="analyticsStore.currentAdset"
    id="campaigns-analytics"
    data-name="campaigns-analytics"
    v-loading="analyticsStore.isFetchingData"
  >
    <button
      class="mb-6 flex items-center justify-center gap-1 bg-transparent text-primary"
      @click="analyticsStore.closeAnalytics"
    >
      <ArrowLeftIcon class="h-3 w-3 fill-primary" />
      {{ t('campaigns.analytics.returnBtn') }}
    </button>

    <DashboardTitle :title="analyticsStore.currentAdset.title" />

    <DatePicker />
    <Graph />
    <Table />
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

import { DatePicker, Graph, Table } from './sections'

import ArrowLeftIcon from '@/assets/img/icons/arrow-left.svg'

const { t } = useLocale<typeof messages>(messages)

const analyticsStore = useCampaignAnalyticsStore()
</script>
