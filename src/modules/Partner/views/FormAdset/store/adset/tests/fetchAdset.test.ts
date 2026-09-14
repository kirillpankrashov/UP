import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormAdsetApi from '@/modules/Partner/views/FormAdset/api'

import { useFormAdsetStore } from '../adset'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormAdset/api')

describe('FormAdset Store fetchAdset', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = (slug: string = 'PF-GRP-123456', campaignType: CampaignType = CampaignType.PERFORMANCE) => {
		vi.mocked(parseSlug).mockReturnValue({
			campaignType,
		} as any)

		const formAdsetStore = useFormAdsetStore()
		return { formAdsetStore, slug }
	}

	it('successfully fetches performance adset', async () => {
		const adsetData = { id: 1, campaign: { type: CampaignType.PERFORMANCE } }
		;(FormAdsetApi.getPerformanceAdset as Mock).mockResolvedValueOnce(adsetData)

		const { formAdsetStore, slug } = factory('PF-GRP-123456', CampaignType.PERFORMANCE)

		expect(formAdsetStore.isFetchingAdset).toBe(false)
		expect(formAdsetStore.adset).toBe(null)

		const promise = formAdsetStore.fetchAdset(slug)

		expect(formAdsetStore.isFetchingAdset).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('PF-GRP-123456')
		expect(FormAdsetApi.getPerformanceAdset).toHaveBeenCalledWith('PF-GRP-123456')
		expect(formAdsetStore.adset).toEqual(adsetData)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(formAdsetStore.isFetchingAdset).toBe(false)
	})

	it('successfully fetches brand awareness adset', async () => {
		const adsetData = { id: 2, campaign: { type: CampaignType.BRAND_AWARENESS } }
		;(FormAdsetApi.getBrandAwarenessAdset as Mock).mockResolvedValueOnce(adsetData)

		const { formAdsetStore, slug } = factory('BA-GRP-123456', CampaignType.BRAND_AWARENESS)

		await formAdsetStore.fetchAdset(slug)

		expect(parseSlug).toHaveBeenCalledWith('BA-GRP-123456')
		expect(FormAdsetApi.getBrandAwarenessAdset).toHaveBeenCalledWith('BA-GRP-123456')
		expect(formAdsetStore.adset).toEqual(adsetData)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
	})

	it('handles error when adsetSlug is missing', async () => {
		const { formAdsetStore } = factory('')

		expect(formAdsetStore.isFetchingAdset).toBe(false)
		expect(formAdsetStore.adset).toBe(null)

		await formAdsetStore.fetchAdset('')

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching adset')
		expect(formAdsetStore.adset).toBe(null)
		expect(formAdsetStore.isFetchingAdset).toBe(false)
	})

	it('handles API error when fetching adset', async () => {
		;(FormAdsetApi.getBrandAwarenessAdset as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formAdsetStore, slug } = factory('BA-GRP-123456', CampaignType.BRAND_AWARENESS)

		expect(formAdsetStore.isFetchingAdset).toBe(false)
		expect(formAdsetStore.adset).toBe(null)

		await formAdsetStore.fetchAdset(slug)

		expect(FormAdsetApi.getBrandAwarenessAdset).toHaveBeenCalledWith('BA-GRP-123456')
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching adset')
		expect(formAdsetStore.adset).toBe(null)
		expect(formAdsetStore.isFetchingAdset).toBe(false)
	})
})
