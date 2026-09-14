import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormCampaignApi from '@/modules/Partner/views/FormCampaign/api'
import { brandAwarenessCampaign } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/fixtures/brandAwarenessCampaign'
import { performanceCampaign } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/fixtures/performanceCampaign'
import { prerollCampaign } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/fixtures/prerollCampaign'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

vi.mock('@/core/helpers')

vi.mock('@/modules/Partner/views/FormCampaign/api')

describe('FormCampaign Store fetchCampaign', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = (slug: string = 'BA-CMP-123456', campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		vi.mocked(parseSlug).mockReturnValue({
			campaignType,
			adEntityType: undefined,
			adFormat: undefined,
		} as any)

		const formCampaignStore = useFormCampaignStore()
		return { formCampaignStore, slug }
	}

	it('successfully fetches brand awareness campaign', async () => {
		(FormCampaignApi.getBrandAwarenessCampaign as Mock).mockResolvedValueOnce(brandAwarenessCampaign)

		const { formCampaignStore, slug } = factory('BA-CMP-123456', CampaignType.BRAND_AWARENESS)

		expect(formCampaignStore.isFetchingCampaign).toBe(false)
		expect(formCampaignStore.campaign).toBe(null)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)

		const promise = formCampaignStore.fetchCampaign(slug)

		expect(formCampaignStore.isFetchingCampaign).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('BA-CMP-123456')
		expect(FormCampaignApi.getBrandAwarenessCampaign).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formCampaignStore.campaign).toEqual(brandAwarenessCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(formCampaignStore.isFetchingCampaign).toBe(false)
	})

	it('successfully fetches performance campaign', async () => {
		(FormCampaignApi.getPerformanceCampaign as Mock).mockResolvedValueOnce(performanceCampaign)

		const { formCampaignStore, slug } = factory('PF-CMP-123456', CampaignType.PERFORMANCE)

		expect(formCampaignStore.isFetchingCampaign).toBe(false)
		expect(formCampaignStore.campaign).toBe(null)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)

		const promise = formCampaignStore.fetchCampaign(slug)

		expect(formCampaignStore.isFetchingCampaign).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('PF-CMP-123456')
		expect(FormCampaignApi.getPerformanceCampaign).toHaveBeenCalledWith('PF-CMP-123456')
		expect(formCampaignStore.campaign).toEqual(performanceCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(formCampaignStore.isFetchingCampaign).toBe(false)
	})

	it('successfully fetches preroll campaign', async () => {
		(FormCampaignApi.getPrerollCampaign as Mock).mockResolvedValueOnce(prerollCampaign)

		const { formCampaignStore, slug } = factory('VOD-CMP-123456', CampaignType.PREROLL)

		expect(formCampaignStore.isFetchingCampaign).toBe(false)
		expect(formCampaignStore.campaign).toBe(null)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)

		const promise = formCampaignStore.fetchCampaign(slug)

		expect(formCampaignStore.isFetchingCampaign).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('VOD-CMP-123456')
		expect(FormCampaignApi.getPrerollCampaign).toHaveBeenCalledWith('VOD-CMP-123456')
		expect(formCampaignStore.campaign).toEqual(prerollCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PREROLL)
		expect(formCampaignStore.isFetchingCampaign).toBe(false)
	})

	it('handles error when campaign slug is missing', async () => {
		const { formCampaignStore } = factory('')

		expect(formCampaignStore.isFetchingCampaign).toBe(false)
		expect(formCampaignStore.campaign).toBe(null)

		await formCampaignStore.fetchCampaign('')

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching campaign')
		expect(formCampaignStore.campaign).toBe(null)
		expect(formCampaignStore.isFetchingCampaign).toBe(false)
	})

	it('handles API error when fetching campaign', async () => {
		(FormCampaignApi.getBrandAwarenessCampaign as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formCampaignStore, slug } = factory('BA-CMP-123456', CampaignType.BRAND_AWARENESS)

		expect(formCampaignStore.isFetchingCampaign).toBe(false)
		expect(formCampaignStore.campaign).toBe(null)

		await formCampaignStore.fetchCampaign(slug)

		expect(parseSlug).toHaveBeenCalledWith('BA-CMP-123456')
		expect(FormCampaignApi.getBrandAwarenessCampaign).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formCampaignStore.campaign).toBe(null)
		expect(formCampaignStore.isFetchingCampaign).toBe(false)
	})
})
