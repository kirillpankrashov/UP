import { afterEach, beforeEach,describe, expect, it, type Mock, vi } from 'vitest'

import { Platform } from '@/core/types'
import { RouteName } from '@/modules/Streamer/router'
import { attachPlatform } from '@/modules/Streamer/views/Profile/api'

import { attach } from './attach'

vi.mock('@/modules/Streamer/views/Profile/api')

describe('attach', () => {
	let router: any
	let attachId: string
	let platform: Platform
	let fetchProfile: Mock
	let attachingPlatforms: boolean[]

	beforeEach(() => {
		router = {
			push: vi.fn(),
		}
		attachId = 'test-attach-id'
		platform = Platform.TWITCH
		fetchProfile = vi.fn()
		attachingPlatforms = [false]
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('attaches platform and fetches profile when attachingTwitch is true', async () => {
		attachingPlatforms = [true]

		await attach({
			router,
			attachId,
			platform,
			fetchProfile,
			attachingPlatforms,
		})

		expect(attachPlatform).toHaveBeenCalledWith({ provider: attachId }, platform)
		expect(fetchProfile).toHaveBeenCalled()
		expect(router.push).toHaveBeenCalledWith({ name: RouteName.PROFILE })
	})

	it('not attach any platform attachingTwitch, attachingYoutube or attachingTrovo are false', async () => {
		await attach({
			router,
			attachId,
			platform,
			fetchProfile,
			attachingPlatforms,
		})

		expect(attachPlatform).not.toHaveBeenCalled()
		expect(fetchProfile).not.toHaveBeenCalled()
		expect(router.push).not.toHaveBeenCalled()
	})
})
