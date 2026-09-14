<template>
  <section
    id="dashboard-values"
    class="grid grid-cols-1 gap-6 border-light-gray pb-6 pt-16 sm:grid-cols-3 sm:gap-x-2 sm:border-t sm:pt-8"
  >
    <EstimatedEarnings />
    <LinkEarnings v-if="LINK_ENABLED && streamer?.freemiumActive && linkEarnings > 0" />
    <CpaEarnings v-else />
    <!-- <ReferralsEarnings v-else /> -->
    <ActiveCampaigns />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { LINK_ENABLED } from '@/core/consts'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import {
	ActiveCampaigns,
	CpaEarnings,
	EstimatedEarnings,
	LinkEarnings,
} from './sections'

const streamerStore = useStreamerStore()
const linkAnalyticsStore = useLinkAnalyticsStore()

const streamer = computed(() => streamerStore.profile)

const linkEarnings = computed(() => linkAnalyticsStore.analytics?.revenue.month || 0)

onMounted(() => {
	if (!linkAnalyticsStore.analytics) {
		linkAnalyticsStore.fetchAnalytics()
	}
})
</script>
