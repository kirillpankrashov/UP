import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormAdsetApi from '@/modules/Partner/views/FormAdset/api'

import { useFormAdsetStore } from '../adset'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormAdset/api')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
	}
})

describe('FormAdset Store deleteAttachment', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formAdsetStore = useFormAdsetStore()
		formAdsetStore.currentCampaignType = campaignType
		return { formAdsetStore }
	}

	it('successfully calls API to delete attachment', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const data = { field: 'file', slug: 'slug' }
		const apiResult = { status: true }

		;(FormAdsetApi.deleteAttachment as Mock).mockResolvedValueOnce(apiResult)

		const result = await formAdsetStore.deleteAttachment(data)

		expect(FormAdsetApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, data)
		expect(result).toEqual(apiResult)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles API error when deleting attachment', async () => {
		const { formAdsetStore } = await factory(CampaignType.PERFORMANCE)
		const data = { field: 'file', slug: 'slug' }

		;(FormAdsetApi.deleteAttachment as Mock).mockRejectedValueOnce(new Error('API Error'))

		const result = await formAdsetStore.deleteAttachment(data)

		expect(FormAdsetApi.deleteAttachment).toHaveBeenCalledWith(CampaignType.PERFORMANCE, data)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error deleting attachment')
		expect(result).toBeUndefined()
	})
})
