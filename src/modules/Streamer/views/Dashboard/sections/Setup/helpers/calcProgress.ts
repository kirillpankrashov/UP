import type { TCheckList } from '@/modules/Streamer/views/Dashboard/api'

export const calcProgress = (checkList: TCheckList, freemiumActive: boolean) => {
	let stepsLeft = 4
	let timeLeft = 20

	if (freemiumActive) {
		stepsLeft = 5
		timeLeft = 25
	}

	if (checkList.filledProfile) {
		stepsLeft -= 1
		timeLeft -= 5
	}

	if (checkList.configuredWidget) {
		stepsLeft -= 1
		timeLeft -= 5
	}

	if (checkList.connectedChatbot) {
		stepsLeft -= 1
		timeLeft -= 5
	}

	if (checkList.displayedAd) {
		stepsLeft -= 1
		timeLeft -= 5
	}

	if (freemiumActive && checkList.goalCreated) {
		stepsLeft -= 1
		timeLeft -= 5
	}

	return {
		stepsLeft,
		timeLeft,
	}
}
