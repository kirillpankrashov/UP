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

describe('FormAdset Store calculateAudience', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formAdsetStore = useFormAdsetStore()
		formAdsetStore.currentCampaignType = campaignType
		return { formAdsetStore }
	}

	it('successfully calculates audience', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const model = { name: 'Test BA Adset' }
		const audience = { id: 1, size: 1000 }

		;(FormAdsetApi.calculateAudience as Mock).mockResolvedValueOnce(audience)

		await formAdsetStore.calculateAudience(model as any)

		expect(FormAdsetApi.calculateAudience).toHaveBeenCalledWith(CampaignType.BRAND_AWARENESS, model)
		expect(formAdsetStore.audience).toEqual(audience)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles API error when calculating audience', async () => {
		const { formAdsetStore } = await factory(CampaignType.PERFORMANCE)
		const model = { name: 'Test PF Adset' }

		;(FormAdsetApi.calculateAudience as Mock).mockRejectedValueOnce(new Error('API Error'))

		await formAdsetStore.calculateAudience(model as any)

		expect(FormAdsetApi.calculateAudience).toHaveBeenCalledWith(CampaignType.PERFORMANCE, model)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error calculating audience')
		expect(formAdsetStore.audience).toBe(null)
	})
})
