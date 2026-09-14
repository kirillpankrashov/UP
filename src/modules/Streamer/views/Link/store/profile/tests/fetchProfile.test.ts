import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getProfile } from '@/modules/Streamer/views/Link/api'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'

import { useLinkProfileStore } from '../profile'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Profile Store fetchProfile', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const profileStore = useLinkProfileStore()

		return { profileStore }
	}

	it('fetchProfile – success', async () => {
		const { profileStore } = await factory()

		expect(profileStore.isLoadingData).toBe(false)

		const promise = profileStore.fetchProfile()

		expect(profileStore.isLoadingData).toBe(true)

		await promise

		expect(getProfile).toHaveBeenCalled()
		expect(profileStore.profile).toEqual(linkProfileData)
		expect(profileStore.isLoadingData).toBe(false)
	})

	it('fetchProfile – fail, request error', async () => {
		const { profileStore } = await factory();

		(getProfile as Mock).mockRejectedValueOnce({ status: false })

		expect(profileStore.isLoadingData).toBe(false)

		const promise = profileStore.fetchProfile()

		expect(profileStore.isLoadingData).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(getProfile).toHaveBeenCalled()
		expect(profileStore.profile).toEqual(null)
		expect(profileStore.isLoadingData).toBe(false)
	})
})
