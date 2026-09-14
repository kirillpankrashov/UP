<template>
  <div
    id="link-analytics"
    data-name="streamer-link-analytics"
    v-loading="isLoadingData"
  >
    <Stats />
    <Tops />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'

import { Stats, Tops } from './sections'

const analyticsStore = useLinkAnalyticsStore()
const isLoadingData = computed(() => analyticsStore.analyticsLoading || analyticsStore.statisticsLoading)

onMounted(() => {
	analyticsStore.fetchAnalytics()
	analyticsStore.fetchStatistics()
	analyticsStore.fetchTops()
})
</script>
