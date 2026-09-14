import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormAdsetApi from '@/modules/Partner/views/FormAdset/api'
import { brandAwarenessAdset } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/fixtures/brandAwarenessAdset'
import { performanceAdset } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/fixtures/performanceAdset'
import { prerollAdset } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/fixtures/prerollAdset'

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

describe('FormAdset Store updateAdset', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formAdsetStore = useFormAdsetStore()
		formAdsetStore.currentCampaignType = campaignType
		return { formAdsetStore }
	}

	it('successfully updates brand awareness adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const updateModel = { name: 'Updated BA Adset' } // + другие необходимые поля

		;(FormAdsetApi.updateBrandAwarenessAdset as Mock).mockResolvedValueOnce(brandAwarenessAdset)

		await formAdsetStore.updateAdset(updateModel as any)

		expect(FormAdsetApi.updateBrandAwarenessAdset).toHaveBeenCalledWith(updateModel)
		expect(formAdsetStore.adset).toEqual(brandAwarenessAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully updates performance adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.PERFORMANCE)
		const updateModel = { name: 'Updated PF Adset' }

		;(FormAdsetApi.updatePerformanceAdset as Mock).mockResolvedValueOnce(performanceAdset)

		await formAdsetStore.updateAdset(updateModel as any)

		expect(FormAdsetApi.updatePerformanceAdset).toHaveBeenCalledWith(updateModel)
		expect(formAdsetStore.adset).toEqual(performanceAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully updates preroll adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.PREROLL)
		const updateModel = { name: 'Updated Preroll Adset' }

		;(FormAdsetApi.updatePrerollAdset as Mock).mockResolvedValueOnce(prerollAdset)

		await formAdsetStore.updateAdset(updateModel as any)

		expect(FormAdsetApi.updatePrerollAdset).toHaveBeenCalledWith(updateModel)
		expect(formAdsetStore.adset).toEqual(prerollAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.PREROLL)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles error when campaign type is not set', async () => {
		const { formAdsetStore } = await factory(undefined as any)
		const updateModel = { name: 'Test Adset' }

		formAdsetStore.currentCampaignType = undefined as any

		await formAdsetStore.updateAdset(updateModel as any)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating adset')
		expect(formAdsetStore.adset).toBe(null)
	})

	it('handles API error when updating adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const updateModel = { name: 'Test BA Adset' }

		;(FormAdsetApi.updateBrandAwarenessAdset as Mock).mockRejectedValueOnce(new Error('API Error'))

		await formAdsetStore.updateAdset(updateModel as any)

		expect(FormAdsetApi.updateBrandAwarenessAdset).toHaveBeenCalledWith(updateModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating adset')
		expect(formAdsetStore.adset).toBe(null)
	})
})
