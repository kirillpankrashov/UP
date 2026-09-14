<template>
  <div
    id="streamer-link-setup"
    data-name="streamer-link-setup"
    v-loading="setupStore.isLoadingData || linkProfileStore.isUpdatingData"
  >
    <LinkName />
    <Goal />
    <Poll />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useLinkProfileStore, useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

import {
	Goal,
	LinkName,
	Poll,
} from './sections'

const linkProfileStore = useLinkProfileStore()
const setupStore = useLinkSetupStore()

const startPolling = () => {
	setupStore.fetchGoal()
	setupStore.fetchPoll()
}

onMounted(() => {
	if (!linkProfileStore.profile) {
		linkProfileStore.fetchProfile()
	}

	startPolling()
})
</script>
