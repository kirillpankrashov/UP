import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updateProfile } from '@/modules/Streamer/views/Link/api'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'

import { useLinkProfileStore } from '../profile'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

const updatedLinkProfileData = {
	...linkProfileData,
	linkName: 'newLinkName',
}

describe('Link Profile Store updateProfile', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const profileStore = useLinkProfileStore()

		profileStore.profile = linkProfileData

		return { profileStore }
	}

	it('updateProfile – success', async () => {
		const { profileStore } = await factory()

		expect(profileStore.isLoadingData).toBe(false)

		const promise = profileStore.updateProfile(updatedLinkProfileData)

		expect(profileStore.isLoadingData).toBe(false)

		await promise

		expect(updateProfile).toHaveBeenCalled()
		expect(profileStore.profile).toStrictEqual(updatedLinkProfileData)
		expect(profileStore.isLoadingData).toBe(false)
	})

	it('updateProfile – fail, no profile yet', async () => {
		const { profileStore } = await factory()
		profileStore.profile = null

		expect(profileStore.isLoadingData).toBe(false)

		const promise = profileStore.updateProfile(updatedLinkProfileData)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(updateProfile).not.toHaveBeenCalled()
		expect(profileStore.profile).toStrictEqual(null)
		expect(profileStore.isLoadingData).toBe(false)
	})

	it('updateProfile – fail, request error', async () => {
		const { profileStore } = await factory();

		(updateProfile as Mock).mockRejectedValueOnce({ status: false })

		expect(profileStore.isLoadingData).toBe(false)

		const promise = profileStore.updateProfile(updatedLinkProfileData)

		expect(profileStore.isLoadingData).toBe(false)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(updateProfile).toHaveBeenCalled()
		expect(profileStore.profile).toStrictEqual(linkProfileData)
		expect(profileStore.isLoadingData).toBe(false)
	})
})
