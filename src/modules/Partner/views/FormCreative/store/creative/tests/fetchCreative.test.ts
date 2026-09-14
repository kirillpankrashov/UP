import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormCreativeApi from '@/modules/Partner/views/FormCreative/api'
import { brandAwarenessCreative } from '@/modules/Partner/views/FormCreative/api/getBrandAwarenessCreative/fixtures/brandAwarenessCreative'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormCreative/api')

describe('FormCreative Store fetchCreative', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = (slug: string = 'BA-CRV-V-1707179035', campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		vi.mocked(parseSlug).mockReturnValue({
			campaignType,
			adEntityType: undefined,
			adFormat: undefined,
		} as any)

		const formCreativeStore = useFormCreativeStore()
		return { formCreativeStore, slug }
	}

	it('successfully fetches brand awareness creative', async () => {
		(FormCreativeApi.getBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore, slug } = factory()

		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.creative).toBe(null)

		const promise = formCreativeStore.fetchCreative(slug)

		expect(formCreativeStore.isFetchingCreative).toBe(true)

		await promise

		expect(FormCreativeApi.getBrandAwarenessCreative).toHaveBeenCalledWith('BA-CRV-V-1707179035')
		expect(formCreativeStore.creative).toEqual(brandAwarenessCreative)
		expect(formCreativeStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.fetchError).toBe(false)
	})

	it('handles error when creative slug is missing', async () => {
		const { formCreativeStore } = factory('')

		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.creative).toBe(null)

		await formCreativeStore.fetchCreative('')

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching creative')
		expect(formCreativeStore.creative).toBe(null)
		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.fetchError).toBe(true)
	})

	it('handles API error when fetching creative', async () => {
		(FormCreativeApi.getBrandAwarenessCreative as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formCreativeStore, slug } = factory()

		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.creative).toBe(null)

		await formCreativeStore.fetchCreative(slug)

		expect(FormCreativeApi.getBrandAwarenessCreative).toHaveBeenCalledWith('BA-CRV-V-1707179035')
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error fetching creative')
		expect(formCreativeStore.creative).toBe(null)
		expect(formCreativeStore.isFetchingCreative).toBe(false)
		expect(formCreativeStore.fetchError).toBe(true)
	})

	it('sets loading state correctly during fetch', async () => {
		let resolvePromise: (value: unknown) => void
		const controlledPromise = new Promise((resolve) => {
			resolvePromise = resolve
		})

		;(FormCreativeApi.getBrandAwarenessCreative as Mock).mockReturnValueOnce(controlledPromise)

		const { formCreativeStore, slug } = factory()

		expect(formCreativeStore.isFetchingCreative).toBe(false)

		const fetchPromise = formCreativeStore.fetchCreative(slug)

		expect(formCreativeStore.isFetchingCreative).toBe(true)

		resolvePromise!(brandAwarenessCreative)
		await fetchPromise

		expect(formCreativeStore.isFetchingCreative).toBe(false)
	})

	it('updates currentCampaignType from fetched creative', async () => {
		(FormCreativeApi.getBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore, slug } = factory()

		formCreativeStore.currentCampaignType = CampaignType.PERFORMANCE

		await formCreativeStore.fetchCreative(slug)

		expect(formCreativeStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
	})

	it('handles case when API returns null', async () => {
		(FormCreativeApi.getBrandAwarenessCreative as Mock).mockResolvedValueOnce(null)

		const { formCreativeStore, slug } = factory()

		await formCreativeStore.fetchCreative(slug)

		expect(FormCreativeApi.getBrandAwarenessCreative).toHaveBeenCalledWith('BA-CRV-V-1707179035')
		expect(formCreativeStore.creative).toBe(null)
		expect(formCreativeStore.isFetchingCreative).toBe(false)
	})

	it('correctly parses different campaign types from slug', async () => {
		const performanceCreative = {
			...brandAwarenessCreative,
			adset: {
				...brandAwarenessCreative.adset,
				campaign: {
					...brandAwarenessCreative.adset.campaign,
					type: CampaignType.PERFORMANCE,
				},
			},
		}

		;(FormCreativeApi.getBrandAwarenessCreative as Mock).mockResolvedValueOnce(performanceCreative)

		const { formCreativeStore, slug } = factory('PF-CRV-V-1707179035', CampaignType.BRAND_AWARENESS)

		await formCreativeStore.fetchCreative(slug)

		expect(formCreativeStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
	})
})
