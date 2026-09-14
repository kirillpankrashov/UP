import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError } from '@/core/helpers'
import * as FormCampaignApi from '@/modules/Partner/views/FormCampaign/api'
import { brandAwarenessCampaign } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/fixtures/brandAwarenessCampaign'
import { performanceCampaign } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/fixtures/performanceCampaign'
import { prerollCampaign } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/fixtures/prerollCampaign'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/FormCampaign/api')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRoute: vi.fn(),
	}
})

describe('FormCampaign Store createCampaign', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const formCampaignStore = useFormCampaignStore()
		return { formCampaignStore }
	}

	it('successfully creates brand awareness campaign', async () => {
		const { formCampaignStore } = await factory()
		const createModel = {
			name: 'Test BA Campaign',
		}

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS;
		(FormCampaignApi.createBrandAwarenessCampaign as Mock).mockResolvedValueOnce(brandAwarenessCampaign)

		await formCampaignStore.createCampaign(createModel as any)

		expect(FormCampaignApi.createBrandAwarenessCampaign).toHaveBeenCalledWith(createModel)
		expect(formCampaignStore.campaign).toEqual(brandAwarenessCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully creates performance campaign', async () => {
		const { formCampaignStore } = await factory()
		const createModel = {
			name: 'Test PF Campaign',
		}

		formCampaignStore.currentCampaignType = CampaignType.PERFORMANCE;
		(FormCampaignApi.createPerformanceCampaign as Mock).mockResolvedValueOnce(performanceCampaign)

		await formCampaignStore.createCampaign(createModel as any)

		expect(FormCampaignApi.createPerformanceCampaign).toHaveBeenCalledWith(createModel)
		expect(formCampaignStore.campaign).toEqual(performanceCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	it('successfully creates preroll campaign', async () => {
		const { formCampaignStore } = await factory()
		const createModel = {
			name: 'Test Preroll Campaign',
		}

		formCampaignStore.currentCampaignType = CampaignType.PREROLL;
		(FormCampaignApi.createPrerollCampaign as Mock).mockResolvedValueOnce(prerollCampaign)

		await formCampaignStore.createCampaign(createModel as any)

		expect(FormCampaignApi.createPrerollCampaign).toHaveBeenCalledWith(createModel)
		expect(formCampaignStore.campaign).toEqual(prerollCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PREROLL)
		expect(handleServerError).not.toHaveBeenCalled()
	})

	// it('handles error when campaign type is not set', async () => {
	// 	const { formCampaignStore } = await factory()
	// 	const createModel = {
	// 		name: 'Test Campaign',
	// 	}

	// 	formCampaignStore.currentCampaignType = null

	// 	await formCampaignStore.createCampaign(createModel as any)

	// 	expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating campaign')
	// 	expect(formCampaignStore.campaign).toBe(null)
	// })

	it('handles API error when creating campaign', async () => {
		const { formCampaignStore } = await factory()
		const createModel = {
			name: 'Test BA Campaign',
		}

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS;
		(FormCampaignApi.createBrandAwarenessCampaign as Mock).mockRejectedValueOnce(new Error('API Error'))

		await formCampaignStore.createCampaign(createModel as any)

		expect(FormCampaignApi.createBrandAwarenessCampaign).toHaveBeenCalledWith(createModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error creating campaign')
		expect(formCampaignStore.campaign).toBe(null)
	})
})
