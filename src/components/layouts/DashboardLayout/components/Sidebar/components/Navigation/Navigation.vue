<template>
  <component
    v-if="appStore.loaded"
    :is="module"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Role } from '@/core/types'
import { useAppStore } from '@/core/store'

import { Partner, Streamer } from './components'

const appStore = useAppStore()

const module = computed(() => {
	if (appStore.auth.role === Role.STREAMER) {
		return Streamer
	}
	if (appStore.auth.role === Role.PARTNER) {
		return Partner
	}
	return null
})
</script>
