import { computed } from 'vue'

import { CreativesManager } from '@/modules/Widget/class/CreativesManager'

export const useTime = (creativesManager: CreativesManager) => {
	const time = computed(() => {
		const total = creativesManager.timer.total.value
		const current = creativesManager.timer.current.value
		const secondsLeft = Math.ceil((total - current) / 1000)
		let minutes: number | string = Math.floor(secondsLeft / 60)
		let seconds: number | string = secondsLeft % 60

		if (minutes < 0 || seconds < 0) {
			return null
		}

		if (minutes < 10) {
			minutes = `0${minutes}`
		}
		if (seconds < 10) {
			seconds = `0${seconds}`
		}

		return `${minutes}:${seconds}`
	})

	return { time }
}
