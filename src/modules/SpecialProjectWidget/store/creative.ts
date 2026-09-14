import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { AdFormat } from '@/core/types'
import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'
import { checkCreative, fetchCreative as fetchCreativeApi } from '@/modules/SpecialProjectWidget/api'

export const useCreativeStore = defineStore('sp-creative', () => {
	const creative = ref<ISpCreative | null>(null)
	const widgetSlug = ref('')
	const adsetSlug = ref('')

	const isVideo = computed(() => {
		const path = creative.value?.attachments.video?.path
		if (!path) return false
		return path.includes('.mp4') || path.includes('.webm')
	})

	const isImage = computed(() => {
		if (!creative.value) return false
		const { video, unit } = creative.value.attachments
		if (video && isVideo.value) return false
		return !!(video || unit)
	})

	const duration = computed<number | null>(() => {
		if (!creative.value) return null

		if (isVideo.value) {
			return creative.value.attachments.video?.properties?.duration ?? null
		}

		return creative.value.adSet.duration
	})

	const frequency = computed<number | null>(() => {
		return creative.value?.adSet.frequency ?? null
	})

	const hasCyclicDisplay = computed(() => {
		return duration.value != null && frequency.value != null && frequency.value > 0
	})

	const format = computed(() => creative.value?.adSet.format ?? null)

	const isFullscreen = computed(() => format.value === AdFormat.SP_FULLSCREEN)
	const isCustom = computed(() => format.value === AdFormat.SP_CUSTOM)

	function setSlug (widget: string, adset: string) {
		widgetSlug.value = widget
		adsetSlug.value = adset
	}

	async function fetchCreative (): Promise<boolean> {
		const result = await fetchCreativeApi(widgetSlug.value, adsetSlug.value)
		creative.value = result
		return result !== null
	}

	async function checkAvailability (): Promise<boolean> {
		return checkCreative(widgetSlug.value, adsetSlug.value)
	}

	function clearCreative () {
		creative.value = null
	}

	return {
		creative,
		widgetSlug,
		adsetSlug,
		isVideo,
		isImage,
		duration,
		frequency,
		hasCyclicDisplay,
		format,
		isFullscreen,
		isCustom,
		setSlug,
		fetchCreative,
		checkAvailability,
		clearCreative,
	}
})
