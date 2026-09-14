<template>
  <div
    data-name="sp-widget"
    class="relative h-full w-full"
    ref="rootRef"
  >
    <div
      v-if="creativeStore.creative && displayStore.isVisible"
      class="relative inline-block max-h-full max-w-full"
    >
      <component
        :is="activeComponent"
        :creative="creativeStore.creative"
      />
      <div class="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4">
        <AdvertState :creative="creativeStore.creative" />
        <QrCode :creative="creativeStore.creative" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { usePixels } from '@/modules/Widget/sections/Creatives/utils'

import { AdvertState, Custom, Fullscreen, QrCode } from './sections'
import { useCreativeStore, useDisplayCycleStore, usePollingStore } from './store'

const route = useRoute()

const creativeStore = useCreativeStore()
const pollingStore = usePollingStore()
const displayStore = useDisplayCycleStore()

const rootRef = ref<HTMLDivElement | null>(null)
const { formatPixels, callImpressionPixels } = usePixels()

const widgetSlug = route.params.widgetSlug as string
const adsetSlug = route.params.adsetSlug as string

const activeComponent = computed(() => {
	if (creativeStore.isFullscreen) return Fullscreen
	if (creativeStore.isCustom) return Custom
	return null
})

async function init () {
	creativeStore.setSlug(widgetSlug, adsetSlug)
	const found = await creativeStore.fetchCreative()

	if (found) {
		onCreativeFound()
	}
	else {
		scheduleRetry()
	}
}

function onCreativeFound () {
	const creative = creativeStore.creative!
	const pixels = formatPixels(creative.pixels.impressions || [], creative as any)
	callImpressionPixels(pixels, rootRef)

	pollingStore.startPolling(
		() => creativeStore.checkAvailability(),
		onCreativeUnavailable,
	)

	if (creativeStore.hasCyclicDisplay) {
		displayStore.start(creativeStore.duration!, creativeStore.frequency!)
	}
}

function onCreativeUnavailable () {
	displayStore.stop()
	creativeStore.clearCreative()
	scheduleRetry()
}

function scheduleRetry () {
	pollingStore.startRetry(async () => {
		const found = await creativeStore.fetchCreative()
		if (found) {
			onCreativeFound()
		}
		else {
			scheduleRetry()
		}
	})
}

onMounted(() => {
	init()
})

onBeforeUnmount(() => {
	pollingStore.stopAll()
	displayStore.stop()
})
</script>
