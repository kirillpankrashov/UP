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

describe('FormAdset Store createAdset', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (campaignType: CampaignType = CampaignType.BRAND_AWARENESS) => {
		const formAdsetStore = useFormAdsetStore()
		formAdsetStore.currentCampaignType = campaignType
		return { formAdsetStore }
	}

	it('successfully creates brand awareness adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const createModel = { name: 'Test BA Adset' } // + другие необходимые поля

		;(FormAdsetApi.createBrandAwarenessAdset as Mock).mockResolvedValueOnce(brandAwarenessAdset)

		await formAdsetStore.createAdset(createModel as any)

		expect(FormAdsetApi.createBrandAwarenessAdset).toHaveBeenCalledWith(createModel)
		expect(formAdsetStore.adset).toEqual(brandAwarenessAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully creates performance adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.PERFORMANCE)
		const createModel = { name: 'Test PF Adset' }

		;(FormAdsetApi.createPerformanceAdset as Mock).mockResolvedValueOnce(performanceAdset)

		await formAdsetStore.createAdset(createModel as any)

		expect(FormAdsetApi.createPerformanceAdset).toHaveBeenCalledWith(createModel)
		expect(formAdsetStore.adset).toEqual(performanceAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully creates preroll adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.PREROLL)
		const createModel = { name: 'Test Preroll Adset' }

		;(FormAdsetApi.createPrerollAdset as Mock).mockResolvedValueOnce(prerollAdset)

		await formAdsetStore.createAdset(createModel as any)

		expect(FormAdsetApi.createPrerollAdset).toHaveBeenCalledWith(createModel)
		expect(formAdsetStore.adset).toEqual(prerollAdset)
		expect(formAdsetStore.currentCampaignType).toBe(CampaignType.PREROLL)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('handles error when campaign type is not set', async () => {
		const { formAdsetStore } = await factory(undefined as any)
		const createModel = { name: 'Test Adset' }

		formAdsetStore.currentCampaignType = undefined as any

		await formAdsetStore.createAdset(createModel as any)

		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating adset')
		expect(formAdsetStore.adset).toBe(null)
	})

	it('handles API error when creating adset', async () => {
		const { formAdsetStore } = await factory(CampaignType.BRAND_AWARENESS)
		const createModel = { name: 'Test BA Adset' }

		;(FormAdsetApi.createBrandAwarenessAdset as Mock).mockRejectedValueOnce(new Error('API Error'))

		await formAdsetStore.createAdset(createModel as any)

		expect(FormAdsetApi.createBrandAwarenessAdset).toHaveBeenCalledWith(createModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating adset')
		expect(formAdsetStore.adset).toBe(null)
	})
})
