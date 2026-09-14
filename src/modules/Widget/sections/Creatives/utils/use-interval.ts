export const useInterval = (
	video: HTMLVideoElement,
	emit: {
    (e: 'start-time'): void
    (e: 'end-time'): void
    (e: 'update-current-time', value: number): void
  },
) => {
	let interval: ReturnType<typeof setInterval>
	let oldTime = 0

	const startInterval = () => {
		emit('start-time')

		interval = setInterval(() => {
			const currentTime = video.currentTime
			const duration = video.duration
			const deltaTime = currentTime - oldTime
			oldTime = currentTime

			emit('update-current-time', deltaTime)

			if (currentTime >= duration) {
				emit('end-time')
				clearInterval(interval)
			}
		}, 1000 / 30)
	}

	return { startInterval }
}
