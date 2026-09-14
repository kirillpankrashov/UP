import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormCreativeApi from '@/modules/Partner/views/FormCreative/api'
import { brandAwarenessCreative } from '@/modules/Partner/views/FormCreative/api/getBrandAwarenessCreative/fixtures/brandAwarenessCreative'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'
import type { IUpdateCreativeModel } from '@/modules/Partner/views/FormCreative/types'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormCreative/api')

describe('FormCreative Store updateCreative', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = () => {
		const formCreativeStore = useFormCreativeStore()
		return { formCreativeStore }
	}

	const mockUpdateModel: IUpdateCreativeModel = {
		slug: 'BA-CRV-V-1707179035',
		chatbotText: 'Updated chatbot text',
		title: {
			default: 'Updated Creative Title',
		},
		companion: {
			heading: 'Updated Heading',
			text: 'Updated Text',
			cta: 'Updated CTA',
		},
		productUrl: {
			general: 'https://updated.example.com',
			mobile: 'https://mobile.updated.example.com',
		},
		qrCode: false,
		pixelClicks: ['updated-click-pixel-1'],
		pixelImpressions: ['updated-impression-pixel-1'],
		pixelInspections: ['updated-inspection-pixel-1'],
		pixelClicksScripts: 'console.log("updated click");',
		scriptCode: 'console.log("updated script");',
		video: 'updated-video-key',
		unit: 'updated-unit-key',
		zip: 'updated-zip-key',
	}

	it('successfully updates brand awareness creative', async () => {
		const updatedCreative = {
			...brandAwarenessCreative,
			title: 'Updated Creative Title',
			chatbotText: 'Updated chatbot text',
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(updatedCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		const fetchCreativeSpy = vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(mockUpdateModel)
		expect(fetchCreativeSpy).toHaveBeenCalledWith('BA-CRV-V-1707179035')
	})

	it('handles error when campaign type is not set', async () => {
		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = null as any

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating creative')
		expect(FormCreativeApi.updateBrandAwarenessCreative).not.toHaveBeenCalled()
	})

	it('handles API error when updating creative', async () => {
		(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(mockUpdateModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating creative')
	})

	it('does not call fetchCreative when API returns null', async () => {
		(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(null)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		const fetchCreativeSpy = vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(mockUpdateModel)
		expect(fetchCreativeSpy).not.toHaveBeenCalled()
	})

	it('throws error for PERFORMANCE campaign type (not implemented)', async () => {
		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.PERFORMANCE

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating creative')
	})

	it('throws error for PREROLL campaign type (not implemented)', async () => {
		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.PREROLL

		await formCreativeStore.updateCreative(mockUpdateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating creative')
	})

	it('calls correct API method based on campaign type', async () => {
		const updatedCreative = {
			...brandAwarenessCreative,
			title: 'Updated Creative Title',
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(updatedCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(mockUpdateModel)

		// Проверяем что вызван правильный API метод для BRAND_AWARENESS
		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(mockUpdateModel)
		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledTimes(1)
	})

	it('handles creative update with partial data changes', async () => {
		const partialUpdateModel: IUpdateCreativeModel = {
			slug: 'BA-CRV-V-1707179035',
			chatbotText: 'Only chatbot text updated',
			title: {
				default: brandAwarenessCreative.title, // Keep original title
			},
			companion: {
				heading: 'New heading only',
				text: brandAwarenessCreative.companion.text, // Keep original
				cta: brandAwarenessCreative.companion.cta, // Keep original
			},
			productUrl: brandAwarenessCreative.productUrl, // Keep original
			qrCode: brandAwarenessCreative.qrCode, // Keep original
			pixelClicks: [], // Clear pixels
			pixelImpressions: [],
			pixelInspections: [],
			pixelClicksScripts: '',
			scriptCode: '',
			video: '',
			unit: '',
			zip: '',
		}

		const updatedCreative = {
			...brandAwarenessCreative,
			chatbotText: 'Only chatbot text updated',
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(updatedCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		const fetchCreativeSpy = vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(partialUpdateModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(partialUpdateModel)
		expect(fetchCreativeSpy).toHaveBeenCalledWith('BA-CRV-V-1707179035')
	})

	it('handles creative update with complex pixel data', async () => {
		const complexUpdateModel: IUpdateCreativeModel = {
			...mockUpdateModel,
			pixelClicks: ['click-1', 'click-2', 'click-3', 'click-4'],
			pixelImpressions: ['impression-1', 'impression-2'],
			pixelInspections: ['inspection-1', 'inspection-2', 'inspection-3'],
			pixelClicksScripts: `
				console.log("Complex click tracking");
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({ event: 'click_tracked' });
			`,
			scriptCode: `
				function trackComplexInteraction() {
					// Complex tracking logic
					return { status: 'tracked', timestamp: Date.now() };
				}
			`,
		}

		const updatedCreative = {
			...brandAwarenessCreative,
			pixelClicks: complexUpdateModel.pixelClicks,
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(updatedCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		const fetchCreativeSpy = vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(complexUpdateModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(complexUpdateModel)
		expect(fetchCreativeSpy).toHaveBeenCalledWith('BA-CRV-V-1707179035')
	})

	it('handles creative update with QR code toggle', async () => {
		const qrToggleModel: IUpdateCreativeModel = {
			...mockUpdateModel,
			qrCode: !brandAwarenessCreative.qrCode, // Toggle QR code
		}

		const updatedCreative = {
			...brandAwarenessCreative,
			qrCode: qrToggleModel.qrCode,
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(updatedCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		const fetchCreativeSpy = vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(qrToggleModel)

		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(qrToggleModel)
		expect(fetchCreativeSpy).toHaveBeenCalledWith('BA-CRV-V-1707179035')
	})

	it('preserves slug in update model', async () => {
		const modelWithSlug: IUpdateCreativeModel = {
			...mockUpdateModel,
			slug: 'BA-CRV-V-1707179035', // Ensure slug is preserved
		}

		;(FormCreativeApi.updateBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore } = factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		vi.spyOn(formCreativeStore, 'fetchCreative').mockResolvedValue(undefined)

		await formCreativeStore.updateCreative(modelWithSlug)

		// Verify that the slug is passed correctly to the API
		expect(FormCreativeApi.updateBrandAwarenessCreative).toHaveBeenCalledWith(
			expect.objectContaining({
				slug: 'BA-CRV-V-1707179035',
			}),
		)
	})
})
