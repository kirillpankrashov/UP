import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Locale } from '@/core/types'
import { Logger } from '@/core/helpers'
import { getPanels } from '@/modules/Streamer/views/Referrals/api'
import { panelsData } from '@/modules/Streamer/views/Referrals/api/getPanels/fixtures/panelsData'

import { useReferralsStore } from '../referrals'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Referrals/api')

describe('Settings Store fetchPanels', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchPanels: boolean = true) => {
		const refeferralsStore = useReferralsStore()
		if (fetchPanels) {
			await refeferralsStore.fetchPanels(Locale.RU)
		}

		return { refeferralsStore }
	}

	it('fetchPanels – success', async () => {
		const { refeferralsStore } = await factory(false)

		expect(refeferralsStore.isFetchingPanels).toBe(false)

		const promise = refeferralsStore.fetchPanels(Locale.RU)

		expect(refeferralsStore.isFetchingPanels).toBe(true)

		await promise

		vi.runAllTimers()

		expect(refeferralsStore.isFetchingPanels).toBe(false)

		expect(getPanels).toHaveBeenCalled()
		expect(refeferralsStore.panels).toEqual(panelsData)
	})

	it('fetchPanels – fail', async () => {
		const { refeferralsStore } = await factory(false);

		(getPanels as Mock).mockRejectedValueOnce({ status: false })

		expect(refeferralsStore.isFetchingPanels).toBe(false)

		const promise = refeferralsStore.fetchPanels(Locale.RU)

		expect(refeferralsStore.isFetchingPanels).toBe(true)

		await promise

		vi.runAllTimers()

		expect(refeferralsStore.isFetchingPanels).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getPanels).toHaveBeenCalled()
		expect(refeferralsStore.panels).toEqual([])
	})
})
