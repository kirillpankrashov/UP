<template>
  <div
    data-name="partner-agency-streamers"
    data-test="partner-agency-streamers"
  >
    <div class="mb-8 max-w-[256px]">
      <Search />
    </div>

    <StreamersList />
    <StreamerSettings />
    <StreamerAdsets />
    <AdsetInfo :store="adsetsActiveStore" />
    <AdsetStreamers
      :adsets-store="adsetsActiveStore"
      v-model="adsetsActiveStore.adsetStreamersSidebarVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { AdsetInfo, AdsetStreamers } from '@/modules/Partner/views/Agency/components'
import {
	useAdsetsActiveStore,
	useAgencyStreamersStore,
} from '@/modules/Partner/views/Agency/store'

import {
	Search,
	StreamerAdsets,
	StreamerSettings,
	StreamersList,
} from './sections'

const streamersStore = useAgencyStreamersStore()
const adsetsActiveStore = useAdsetsActiveStore()

onMounted(streamersStore.fetchStreamers)
</script>
