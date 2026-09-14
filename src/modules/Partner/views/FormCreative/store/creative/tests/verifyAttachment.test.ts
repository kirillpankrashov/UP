import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { AdFormat, CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormCreativeApi from '@/modules/Partner/views/FormCreative/api'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

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

describe('FormCreative Store verifyAttachment', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formCreativeStore = useFormCreativeStore()
		formCreativeStore.currentCampaignType = campaignType
		return { formCreativeStore }
	}

	it('successfully calls API to verify attachment', async () => {
		const { formCreativeStore } = await factory(CampaignType.BRAND_AWARENESS)
		const data = { format: AdFormat.FULLSCREEN, video: 'test-video-key' }
		const apiResult = { status: true }

		;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formCreativeStore.verifyAttachment(data)

		expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('works with different campaign types', async () => {
		const testCases = [
			{ campaignType: CampaignType.BRAND_AWARENESS, data: { format: AdFormat.FULLSCREEN, video: 'video-key' } as any },
			{ campaignType: CampaignType.PERFORMANCE, data: { format: AdFormat.INTERACTIVE, unit: 'unit-key' } as any },
			{ campaignType: CampaignType.PREROLL, data: { format: AdFormat.PREROLL, video: 'preroll-key' } as any },
		]

		for (const testCase of testCases) {
			const { formCreativeStore } = await factory(testCase.campaignType)
			const apiResult = { status: true }

			;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(apiResult)

			const result = await formCreativeStore.verifyAttachment(testCase.data)

			expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(testCase.campaignType, testCase.data)
			expect(result).toEqual(apiResult)
		}
	})

	it('works with different attachment formats', async () => {
		const { formCreativeStore } = await factory()
		const testCases = [
			{ format: AdFormat.FULLSCREEN, video: 'fullscreen-video' } as any,
			{ format: AdFormat.CUSTOM, zip: 'custom-zip' } as any,
			{ format: AdFormat.ADMNG, unit: 'admng-unit' } as any,
		]

		for (const data of testCases) {
			const apiResult = { status: true }
			;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(apiResult)

			const result = await formCreativeStore.verifyAttachment(data)

			expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
			expect(result).toEqual(apiResult)
		}
	})

	it('handles API error when verifying attachment', async () => {
		const { formCreativeStore } = await factory()
		const data = { format: AdFormat.FULLSCREEN, video: 'test-video-key' }

		;(FormCreativeApi.verifyAttachment as Mock).mockRejectedValueOnce(new Error('API Error'))

		const result = await formCreativeStore.verifyAttachment(data)

		expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error verifying attachment')
		expect(result).toBeUndefined()
	})

	it('returns undefined when API returns null', async () => {
		const { formCreativeStore } = await factory()
		const data = { format: AdFormat.FULLSCREEN, video: 'test-video-key' }

		;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(null)

		const result = await formCreativeStore.verifyAttachment(data)

		expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toBeUndefined()
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles verification with status false', async () => {
		const { formCreativeStore } = await factory()
		const data = { format: AdFormat.FULLSCREEN, video: 'invalid-video-key' }
		const apiResult = { status: false }

		;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formCreativeStore.verifyAttachment(data)

		expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles multiple attachment fields in data', async () => {
		const { formCreativeStore } = await factory()
		const data = {
			format: AdFormat.FULLSCREEN,
			video: 'video-key',
			unit: 'unit-key',
			customField: 'custom-value',
		}
		const apiResult = { status: true }

		;(FormCreativeApi.verifyAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formCreativeStore.verifyAttachment(data)

		expect(FormCreativeApi.verifyAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
	})
})
