import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { getAdsetStreamers } from '@/modules/Partner/views/Agency/api'
import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'
import { adsetStreamers as adsetStreamersData } from '@/modules/Partner/views/Agency/api/getAdsetStreamers/fixtures/adsetStreamers'

import { useAdsetsActiveStore } from '../adsetsActive'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('AdsetsActive Store getStreamers', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('getStreamers – returns early when adsetStreamersSidebarVisible is true', async () => {
		const store = useAdsetsActiveStore()
		store.adsetStreamersSidebarVisible = true
		store.adsetStreamers.data = adsetStreamersData.data as any

		const existingData = store.adsetStreamers.data

		await store.getStreamers(adsetsActiveData.data[0].slug, 2)

		expect(store.isFetchingData).toBe(false)
		expect(getAdsetStreamers).not.toHaveBeenCalled()
		expect(store.adsetStreamers.data).toBe(existingData)
	})

	it('getStreamers – success, sets title and streamers pagination', async () => {
		const store = useAdsetsActiveStore()
		store.adsets.data = adsetsActiveData.data as any
		store.setTypeCompany(CampaignType.PERFORMANCE)

		const slug = adsetsActiveData.data[0].slug
		const expectedTitle = adsetsActiveData.data[0].title

		;(getAdsetStreamers as Mock).mockResolvedValueOnce(adsetStreamersData)

		expect(store.adsetStreamersSidebarVisible).toBe(false)

		const promise = store.getStreamers(slug, 3)

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(store.adsetStreamersSidebarVisible).toBe(true)
		expect(store.adsetTitle).toBe(expectedTitle)
		expect(getAdsetStreamers).toHaveBeenCalledWith(slug, 3, CampaignType.PERFORMANCE)

		expect(store.adsetStreamers.data).toEqual(adsetStreamersData.data)
		expect(store.adsetStreamers.total).toBe(adsetStreamersData.total)
		expect(store.adsetStreamers.page).toBe(3)
		expect(store.adsetStreamers.perPage).toBe(adsetStreamersData.perPage)
		expect(store.isFetchingData).toBe(false)
	})

	it('getStreamers – slug is not string, logs warning and still fetches', async () => {
		const store = useAdsetsActiveStore()
		store.adsets.data = adsetsActiveData.data as any
		store.setTypeCompany(CampaignType.PERFORMANCE)

		;(getAdsetStreamers as Mock).mockResolvedValueOnce(adsetStreamersData)

		const slugValue = 123
		const promise = store.getStreamers(slugValue as any, 1)

		expect(Logger.warning).toHaveBeenCalledWith('Campaign if is not of type \'string\'')

		await promise

		expect(getAdsetStreamers).toHaveBeenCalledWith(slugValue, 1, CampaignType.PERFORMANCE)
		expect(store.adsetTitle).toBeNull()
		expect(store.adsetStreamers.data).toEqual(adsetStreamersData.data)
		expect(store.isFetchingData).toBe(false)
	})
})

