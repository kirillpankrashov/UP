import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
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

describe('FormCreative Store deleteAttachment', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formCreativeStore = useFormCreativeStore()
		formCreativeStore.currentCampaignType = campaignType
		return { formCreativeStore }
	}

	it('successfully calls API to delete attachment', async () => {
		const { formCreativeStore } = await factory(CampaignType.BRAND_AWARENESS)
		const data = { field: 'video', slug: 'BA-CRV-V-1707179035' }
		const apiResult = { status: true }

		;(FormCreativeApi.deleteAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formCreativeStore.deleteAttachment(data)

		expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('works with different campaign types and attachment fields', async () => {
		const testCases = [
			{ campaignType: CampaignType.BRAND_AWARENESS, field: 'video', slug: 'BA-CRV-V-1707179035' },
			{ campaignType: CampaignType.PERFORMANCE, field: 'unit', slug: 'PF-CRV-V-1707179035' },
			{ campaignType: CampaignType.PREROLL, field: 'video', slug: 'VOD-CRV-V-1707179035' },
			{ campaignType: CampaignType.BRAND_AWARENESS, field: 'zip', slug: 'BA-CRV-V-1707179035' },
		]

		for (const testCase of testCases) {
			const { formCreativeStore } = await factory(testCase.campaignType)
			const data = { field: testCase.field, slug: testCase.slug }
			const apiResult = { status: true }

			;(FormCreativeApi.deleteAttachment as Mock).mockResolvedValueOnce(apiResult)

			const result = await formCreativeStore.deleteAttachment(data)

			expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(testCase.campaignType, data)
			expect(result).toEqual(apiResult)
		}
	})

	it('handles API error when deleting attachment', async () => {
		const { formCreativeStore } = await factory()
		const data = { field: 'video', slug: 'BA-CRV-V-1707179035' }

		;(FormCreativeApi.deleteAttachment as Mock).mockRejectedValueOnce(new Error('API Error'))

		const result = await formCreativeStore.deleteAttachment(data)

		expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error deleting attachment')
		expect(result).toBeUndefined()
	})

	it('returns undefined when API returns null', async () => {
		const { formCreativeStore } = await factory()
		const data = { field: 'video', slug: 'BA-CRV-V-1707179035' }

		;(FormCreativeApi.deleteAttachment as Mock).mockResolvedValueOnce(null)

		const result = await formCreativeStore.deleteAttachment(data)

		expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toBeUndefined()
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles deletion with status false', async () => {
		const { formCreativeStore } = await factory()
		const data = { field: 'video', slug: 'BA-CRV-V-1707179035' }
		const apiResult = { status: false }

		;(FormCreativeApi.deleteAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formCreativeStore.deleteAttachment(data)

		expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles edge cases with empty parameters', async () => {
		const { formCreativeStore } = await factory()
		const testCases = [
			{ field: '', slug: 'BA-CRV-V-1707179035' },
			{ field: 'video', slug: '' },
		]

		for (const data of testCases) {
			const apiResult = { status: true }
			;(FormCreativeApi.deleteAttachment as Mock).mockResolvedValueOnce(apiResult)

			const result = await formCreativeStore.deleteAttachment(data)

			expect(FormCreativeApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
			expect(result).toEqual(apiResult)
		}
	})
})
