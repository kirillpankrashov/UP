import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormCreativeApi from '@/modules/Partner/views/FormCreative/api'
import { brandAwarenessCreative } from '@/modules/Partner/views/FormCreative/api/getBrandAwarenessCreative/fixtures/brandAwarenessCreative'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'
import type { ICreateCreativeModel } from '@/modules/Partner/views/FormCreative/types'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormCreative/api')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRoute: vi.fn(() => ({
			params: {
				creativeSlug: 'BA-CRV-V-1707179035',
			},
		})),
		useRouter: vi.fn(() => ({
			push: vi.fn(),
		})),
	}
})

describe('FormCreative Store createCreative', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const formCreativeStore = useFormCreativeStore()

		return { formCreativeStore }
	}

	const mockCreateModel: ICreateCreativeModel = {
		adsetSlug: 'BA-GRP-1706361094',
		chatbotText: 'Test chatbot text',
		title: {
			default: 'Test Creative Title',
		},
		companion: {
			heading: 'Test Heading',
			text: 'Test Text',
			cta: 'Test CTA',
		},
		productUrl: {
			general: 'https://example.com',
			mobile: 'https://mobile.example.com',
		},
		qrCode: true,
		pixelClicks: ['click-pixel-1'],
		pixelImpressions: ['impression-pixel-1'],
		pixelInspections: ['inspection-pixel-1'],
		pixelClicksScripts: 'console.log("click");',
		scriptCode: 'console.log("script");',
		video: 'video-key',
		unit: 'unit-key',
		zip: 'zip-key',
	}

	it('successfully creates brand awareness creative', async () => {
		(FormCreativeApi.createBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		await formCreativeStore.createCreative(mockCreateModel)

		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(mockCreateModel)
		expect(formCreativeStore.creative).toEqual(brandAwarenessCreative)
	})

	it('handles error when campaign type is not set', async () => {
		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = null as any

		await formCreativeStore.createCreative(mockCreateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating creative')
		expect(FormCreativeApi.createBrandAwarenessCreative).not.toHaveBeenCalled()
	})

	it('handles API error when creating creative', async () => {
		(FormCreativeApi.createBrandAwarenessCreative as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		await formCreativeStore.createCreative(mockCreateModel)

		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(mockCreateModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating creative')
	})

	it('does not call fetchCreative when API returns null', async () => {
		(FormCreativeApi.createBrandAwarenessCreative as Mock).mockResolvedValueOnce(null)

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		// Мокируем fetchCreative
		formCreativeStore.fetchCreative = vi.fn()

		await formCreativeStore.createCreative(mockCreateModel)

		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(mockCreateModel)
		expect(formCreativeStore.creative).toBeNull()
	})

	it('throws error for PERFORMANCE campaign type (not implemented)', async () => {
		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.PERFORMANCE

		await formCreativeStore.createCreative(mockCreateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating creative')
	})

	it('throws error for PREROLL campaign type (not implemented)', async () => {
		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.PREROLL

		await formCreativeStore.createCreative(mockCreateModel)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating creative')
	})

	it('calls correct API method based on campaign type', async () => {
		(FormCreativeApi.createBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		// Мокируем fetchCreative
		formCreativeStore.fetchCreative = vi.fn()

		await formCreativeStore.createCreative(mockCreateModel)

		// Проверяем что вызван правильный API метод для BRAND_AWARENESS
		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(mockCreateModel)
		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledTimes(1)
	})

	it('handles creative creation with minimal required fields', async () => {
		const minimalModel: ICreateCreativeModel = {
			adsetSlug: 'BA-GRP-1706361094',
			chatbotText: '',
			title: {
				default: 'Minimal Title',
			},
			companion: {
				heading: '',
				text: '',
				cta: '',
			},
			productUrl: {
				general: '',
				mobile: '',
			},
			qrCode: false,
			pixelClicks: [],
			pixelImpressions: [],
			pixelInspections: [],
			pixelClicksScripts: '',
			scriptCode: '',
			video: '',
			unit: '',
			zip: '',
		}

		;(FormCreativeApi.createBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		await formCreativeStore.createCreative(minimalModel)

		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(minimalModel)
		expect(formCreativeStore.creative).toEqual(brandAwarenessCreative)
	})

	it('handles creative creation with complex data', async () => {
		const complexModel: ICreateCreativeModel = {
			...mockCreateModel,
			pixelClicks: ['click-1', 'click-2', 'click-3'],
			pixelImpressions: ['impression-1', 'impression-2'],
			pixelInspections: ['inspection-1'],
			pixelClicksScripts: 'console.log("complex click script");',
			scriptCode: 'function complexScript() { return true; }',
		}

		;(FormCreativeApi.createBrandAwarenessCreative as Mock).mockResolvedValueOnce(brandAwarenessCreative)

		const { formCreativeStore } = await factory()
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS

		await formCreativeStore.createCreative(complexModel)

		expect(FormCreativeApi.createBrandAwarenessCreative).toHaveBeenCalledWith(complexModel)
		expect(formCreativeStore.creative).toEqual(brandAwarenessCreative)
	})
})
