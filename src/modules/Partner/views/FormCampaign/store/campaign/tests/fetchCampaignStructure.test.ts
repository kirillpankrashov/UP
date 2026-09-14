import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormCampaignApi from '@/modules/Partner/views/FormCampaign/api'
import { brandAwarenessCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaignStructure/fixtures/brandAwarenessCampaignStructure'
import { performanceCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaignStructure/fixtures/performanceCampaignStructure'
import { prerollCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaignStructure/fixtures/prerollCampaignStructure'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormCampaign/api')

describe('FormCampaign Store fetchCampaignStructure', () => {
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

	it('successfully fetches brand awareness campaign structure', async () => {
		(FormCampaignApi.getBrandAwarenessCampaignStructure as Mock).mockResolvedValueOnce(brandAwarenessCampaignStructure)

		const { formCampaignStore, slug } = factory('BA-CMP-123456', CampaignType.BRAND_AWARENESS)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
		expect(formCampaignStore.campaignStructure).toBe(null)

		const promise = formCampaignStore.fetchCampaignStructure(slug)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('BA-CMP-123456')
		expect(FormCampaignApi.getBrandAwarenessCampaignStructure).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formCampaignStore.campaignStructure).toEqual(brandAwarenessCampaignStructure)
		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
	})

	it('successfully fetches performance campaign structure', async () => {
		(FormCampaignApi.getPerformanceCampaignStructure as Mock).mockResolvedValueOnce(performanceCampaignStructure)

		const { formCampaignStore, slug } = factory('PF-CMP-123456', CampaignType.PERFORMANCE)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
		expect(formCampaignStore.campaignStructure).toBe(null)

		const promise = formCampaignStore.fetchCampaignStructure(slug)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('PF-CMP-123456')
		expect(FormCampaignApi.getPerformanceCampaignStructure).toHaveBeenCalledWith('PF-CMP-123456')
		expect(formCampaignStore.campaignStructure).toEqual(performanceCampaignStructure)
		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
	})

	it('successfully fetches preroll campaign structure', async () => {
		(FormCampaignApi.getPrerollCampaignStructure as Mock).mockResolvedValueOnce(prerollCampaignStructure)

		const { formCampaignStore, slug } = factory('VOD-CMP-123456', CampaignType.PREROLL)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
		expect(formCampaignStore.campaignStructure).toBe(null)

		const promise = formCampaignStore.fetchCampaignStructure(slug)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(true)

		await promise

		expect(parseSlug).toHaveBeenCalledWith('VOD-CMP-123456')
		expect(FormCampaignApi.getPrerollCampaignStructure).toHaveBeenCalledWith('VOD-CMP-123456')
		expect(formCampaignStore.campaignStructure).toEqual(prerollCampaignStructure)
		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
	})

	it('handles error when campaign slug is missing', async () => {
		const { formCampaignStore } = factory('')

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
		expect(formCampaignStore.campaignStructure).toBe(null)

		await formCampaignStore.fetchCampaignStructure('')

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching campaign structure')
		expect(formCampaignStore.campaignStructure).toBe(null)
		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
	})

	it('handles API error when fetching campaign structure', async () => {
		(FormCampaignApi.getBrandAwarenessCampaignStructure as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formCampaignStore, slug } = factory('BA-CMP-123456', CampaignType.BRAND_AWARENESS)

		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
		expect(formCampaignStore.campaignStructure).toBe(null)

		await formCampaignStore.fetchCampaignStructure(slug)

		expect(parseSlug).toHaveBeenCalledWith('BA-CMP-123456')
		expect(FormCampaignApi.getBrandAwarenessCampaignStructure).toHaveBeenCalledWith('BA-CMP-123456')
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching campaign structure')
		expect(formCampaignStore.campaignStructure).toBe(null)
		expect(formCampaignStore.isFetchingCampaignStructure).toBe(false)
	})
})
