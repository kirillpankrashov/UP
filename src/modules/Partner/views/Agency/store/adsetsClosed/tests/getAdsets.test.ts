import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { getAdsetsClosed } from '@/modules/Partner/views/Agency/api'
import { adsetsActive as adsetsClosedData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import { useAdsetsClosedStore } from '../adsetsClosed'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('AdsetsClosed Store getAdsets', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('getAdsets – success, sets adsets and resets loading', async () => {
		const store = useAdsetsClosedStore()
		const page = 2

		;(getAdsetsClosed as Mock).mockResolvedValueOnce(adsetsClosedData)

		expect(store.isFetchingData).toBe(false)

		const promise = store.getAdsets(page)

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(getAdsetsClosed).toHaveBeenCalledWith({ page }, store.campaignType)
		expect(store.adsets.data).toEqual(adsetsClosedData.data)
		expect(store.adsets.total).toBe(adsetsClosedData.total)
		expect(store.adsets.perPage).toBe(adsetsClosedData.perPage)
		expect(store.adsets.page).toBe(page)
		expect(store.isFetchingData).toBe(false)
	})

	it('getAdsets – fail, resets loading', async () => {
		const store = useAdsetsClosedStore()
		const page = 3
		const error = new Error('API Error')

		;(getAdsetsClosed as Mock).mockRejectedValueOnce(error)

		const promise = store.getAdsets(page)

		expect(store.isFetchingData).toBe(true)

		await expect(promise).rejects.toThrow('API Error')

		expect(store.isFetchingData).toBe(false)
		expect(store.adsets.data).toEqual([])
		expect(getAdsetsClosed).toHaveBeenCalledWith({ page }, store.campaignType)
	})
})

