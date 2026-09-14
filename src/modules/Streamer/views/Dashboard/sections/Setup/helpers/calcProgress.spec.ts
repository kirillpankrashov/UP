import { describe, expect, it } from 'vitest'

import type { TCheckList } from '@/modules/Streamer/views/Dashboard/api'

import { calcProgress } from './calcProgress'

describe('calcProgress', () => {
	it('should calculate progress correctly when freemiumActive is false', () => {
		const checkList: TCheckList = {
			filledProfile: true,
			configuredWidget: false,
			connectedChatbot: true,
			displayedAd: false,
			goalCreated: false,
			close: false,
			completed: false,
		}

		const freemiumActive = false

		const result = calcProgress(checkList, freemiumActive)

		expect(result.stepsLeft).toBe(2)
		expect(result.timeLeft).toBe(10)
	})

	it('should calculate progress correctly when freemiumActive is true', () => {
		const checkList: TCheckList = {
			filledProfile: true,
			configuredWidget: true,
			connectedChatbot: false,
			displayedAd: true,
			goalCreated: true,
			close: false,
			completed: false,
		}

		const freemiumActive = true

		const result = calcProgress(checkList, freemiumActive)

		expect(result.stepsLeft).toBe(1)
		expect(result.timeLeft).toBe(5)
	})
})
