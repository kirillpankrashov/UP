import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { handleServerError,Logger } from '@/core/helpers'
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

describe('FormCampaign Store updateCampaign', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const formCampaignStore = useFormCampaignStore()
		return { formCampaignStore }
	}

	it('successfully updates brand awareness campaign', async () => {
		const { formCampaignStore } = await factory()
		const updateModel = {
			name: 'Updated BA Campaign',
			slug: 'BA-CMP-123456',
		}

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS;
		(FormCampaignApi.updateBrandAwarenessCampaign as Mock).mockResolvedValueOnce(brandAwarenessCampaign)

		await formCampaignStore.updateCampaign(updateModel as any)

		expect(FormCampaignApi.updateBrandAwarenessCampaign).toHaveBeenCalledWith(updateModel)
		expect(formCampaignStore.campaign).toEqual(brandAwarenessCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('successfully updates performance campaign', async () => {
		const { formCampaignStore } = await factory()
		const updateModel = {
			name: 'Updated PF Campaign',
			slug: 'PF-CMP-123456',
		}

		formCampaignStore.currentCampaignType = CampaignType.PERFORMANCE;
		(FormCampaignApi.updatePerformanceCampaign as Mock).mockResolvedValueOnce(performanceCampaign)

		await formCampaignStore.updateCampaign(updateModel as any)

		expect(FormCampaignApi.updatePerformanceCampaign).toHaveBeenCalledWith(updateModel)
		expect(formCampaignStore.campaign).toEqual(performanceCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PERFORMANCE)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('successfully updates preroll campaign', async () => {
		const { formCampaignStore } = await factory()
		const updateModel = {
			name: 'Updated Preroll Campaign',
			slug: 'VOD-CMP-123456',
		}

		formCampaignStore.currentCampaignType = CampaignType.PREROLL;
		(FormCampaignApi.updatePrerollCampaign as Mock).mockResolvedValueOnce(prerollCampaign)

		await formCampaignStore.updateCampaign(updateModel as any)

		expect(FormCampaignApi.updatePrerollCampaign).toHaveBeenCalledWith(updateModel)
		expect(formCampaignStore.campaign).toEqual(prerollCampaign)
		expect(formCampaignStore.currentCampaignType).toBe(CampaignType.PREROLL)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('handles API error when updating campaign', async () => {
		const { formCampaignStore } = await factory()
		const updateModel = {
			name: 'Updated BA Campaign',
			slug: 'BA-CMP-123456',
		}

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		;(FormCampaignApi.updateBrandAwarenessCampaign as Mock).mockRejectedValueOnce(new Error('API Error'))

		await formCampaignStore.updateCampaign(updateModel as any)

		expect(FormCampaignApi.updateBrandAwarenessCampaign).toHaveBeenCalledWith(updateModel)
		expect(handleServerError).toHaveBeenCalledWith(expect.any(Error), 'Error updating campaign')
		expect(formCampaignStore.campaign).toBe(null)
	})
})
