import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { Logger, parseSlug } from '@/core/helpers'
import { getAdsetInfo } from '@/modules/Partner/views/Agency/api'
import { adsetInfo as adsetInfoData } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'
import { adsetsActive as adsetsData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import { useAdsetsClosedStore } from '../adsetsClosed'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('AdsetsClosed Store getAdsetInfo', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('getAdsetInfo – success, sets campaignType, title and adsetInfo', async () => {
		const store = useAdsetsClosedStore()

		store.adsets.data = adsetsData.data as any

		const slug = adsetsData.data[0].slug
		const expectedTitle = adsetsData.data[0].title

		vi.mocked(parseSlug).mockReturnValueOnce({ campaignType: CampaignType.PERFORMANCE } as any)
		;(getAdsetInfo as Mock).mockResolvedValueOnce(adsetInfoData)

		expect(store.adsetSidebarVisible).toBe(false)
		expect(store.isFetchingData).toBe(false)

		const promise = store.getAdsetInfo(slug)

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(store.adsetSidebarVisible).toBe(true)
		expect(parseSlug).toHaveBeenCalledWith(slug)
		expect(getAdsetInfo).toHaveBeenCalledWith(slug, CampaignType.PERFORMANCE)

		expect(store.campaignType).toBe(CampaignType.PERFORMANCE)
		expect(store.adsetSlug).toBe(slug)
		expect(store.adsetTitle).toBe(expectedTitle)
		expect(store.adsetInfo).toEqual(adsetInfoData)
		expect(store.isFetchingData).toBe(false)
	})

	it('getAdsetInfo – returns early when adsetSlug is already set', async () => {
		const store = useAdsetsClosedStore()

		const slug = adsetsData.data[0].slug
		store.adsetSlug = slug
		store.adsetSidebarVisible = false

		await store.getAdsetInfo(slug)

		expect(store.adsetSidebarVisible).toBe(true)
		expect(store.isFetchingData).toBe(false)
		expect(getAdsetInfo).not.toHaveBeenCalled()
		expect(parseSlug).not.toHaveBeenCalled()
	})

	it('getAdsetInfo – slug is not string, logs warning and still fetches', async () => {
		const store = useAdsetsClosedStore()
		store.adsets.data = adsetsData.data as any

		vi.mocked(parseSlug).mockReturnValueOnce({ campaignType: CampaignType.PERFORMANCE } as any)
		;(getAdsetInfo as Mock).mockResolvedValueOnce(adsetInfoData)

		const slugValue = 123
		const promise = store.getAdsetInfo(slugValue as any)

		expect(Logger.warning).toHaveBeenCalledWith('There is no slug provided')

		await promise

		expect(getAdsetInfo).toHaveBeenCalledWith(slugValue, CampaignType.PERFORMANCE)
		expect(store.campaignType).toBe(CampaignType.PERFORMANCE)
		expect((store as any).adsetSlug).toBe(slugValue)
		expect(store.adsetTitle).toBeNull()
		expect(store.adsetInfo).toEqual(adsetInfoData)
		expect(store.isFetchingData).toBe(false)
	})
})

