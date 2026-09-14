import { ref } from 'vue'

export class CreativeTimer {
	interval: ReturnType<typeof setInterval> | null = null
	current = ref(0)
	total = ref(0)

	stop () {
		if (this.interval) clearInterval(this.interval)
	}

	reset (time = 0) {
		this.stop()
		this.total.value = time
		this.current.value = 0
	}

	play (_limit?: number): Promise<void> {
		return new Promise(resolve => {
			const limit = _limit || this.total.value
			const delay = 1000 / 60
			let sumTime = 0
			let oldTime = new Date().getTime()

			this.interval = setInterval(() => {
				const nowTime = new Date().getTime()
				const deltaTime = nowTime - oldTime
				sumTime += deltaTime
				oldTime = nowTime
				this.current.value += deltaTime

				if (sumTime >= limit) {
					this.stop()
					resolve()
				}
			}, delay)
		})
	}
}
