import { ref } from 'vue'
import { defineStore } from 'pinia'

import { POLL_INTERVAL_MS } from '@/modules/SpecialProjectWidget/constants'

export const usePollingStore = defineStore('sp-polling', () => {
	const pollTimer = ref<ReturnType<typeof setInterval> | null>(null)
	const retryTimer = ref<ReturnType<typeof setTimeout> | null>(null)

	function startPolling (checkFn: () => Promise<boolean>, onFail: () => void) {
		stopAll()

		pollTimer.value = setInterval(async () => {
			const available = await checkFn()
			if (!available) {
				stopAll()
				onFail()
			}
		}, POLL_INTERVAL_MS)
	}

	function startRetry (retryFn: () => Promise<void>) {
		stopRetry()

		retryTimer.value = setTimeout(async () => {
			retryTimer.value = null
			await retryFn()
		}, POLL_INTERVAL_MS)
	}

	function stopPolling () {
		if (pollTimer.value !== null) {
			clearInterval(pollTimer.value)
			pollTimer.value = null
		}
	}

	function stopRetry () {
		if (retryTimer.value !== null) {
			clearTimeout(retryTimer.value)
			retryTimer.value = null
		}
	}

	function stopAll () {
		stopPolling()
		stopRetry()
	}

	return {
		startPolling,
		startRetry,
		stopAll,
	}
})
