import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { getAdsetsActive } from '@/modules/Partner/views/Agency/api'
import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import { useAdsetsActiveStore } from '../adsetsActive'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('AdsetsActive Store getAdsets', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('getAdsets – success, sets adsets and resets loading', async () => {
		const store = useAdsetsActiveStore()
		const page = 2

		;(getAdsetsActive as Mock).mockResolvedValueOnce(adsetsActiveData)

		expect(store.isFetchingData).toBe(false)

		const promise = store.getAdsets(page)

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(getAdsetsActive).toHaveBeenCalledWith({ page }, store.campaignType)
		expect(store.adsets.data).toEqual(adsetsActiveData.data)
		expect(store.adsets.total).toBe(adsetsActiveData.total)
		expect(store.adsets.perPage).toBe(adsetsActiveData.perPage)
		expect(store.adsets.page).toBe(page)
		expect(store.isFetchingData).toBe(false)
	})

	it('getAdsets – fail, resets loading', async () => {
		const store = useAdsetsActiveStore()
		const page = 3
		const error = new Error('API Error')

		;(getAdsetsActive as Mock).mockRejectedValueOnce(error)

		const promise = store.getAdsets(page)

		expect(store.isFetchingData).toBe(true)

		await expect(promise).rejects.toThrow('API Error')

		expect(store.isFetchingData).toBe(false)
		expect(store.adsets.data).toEqual([])
		expect(getAdsetsActive).toHaveBeenCalledWith({ page }, store.campaignType)
	})
})

