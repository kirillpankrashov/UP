import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDisplayCycleStore = defineStore('sp-display-cycle', () => {
	const isVisible = ref(true)

	let showTimer: ReturnType<typeof setTimeout> | null = null
	let hideTimer: ReturnType<typeof setTimeout> | null = null

	function runCycle (durationSec: number, frequencySec: number) {
		const durationMs = durationSec * 1000
		const pauseMs = (frequencySec - durationSec) * 1000

		isVisible.value = true

		hideTimer = setTimeout(() => {
			isVisible.value = false

			showTimer = setTimeout(() => {
				runCycle(durationSec, frequencySec)
			}, pauseMs)
		}, durationMs)
	}

	function start (durationSec: number, frequencySec: number) {
		stop()
		runCycle(durationSec, frequencySec)
	}

	function stop () {
		if (showTimer !== null) {
			clearTimeout(showTimer)
			showTimer = null
		}
		if (hideTimer !== null) {
			clearTimeout(hideTimer)
			hideTimer = null
		}
		isVisible.value = true
	}

	return {
		isVisible,
		start,
		stop,
	}
})
