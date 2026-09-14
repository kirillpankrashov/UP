import { useRoute } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { AdEntityType,CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { RouteName } from '@/modules/Partner/router'
import * as CampaignsApi from '@/modules/Partner/views/Campaigns/api'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'

import { useCampaignsStore } from '../campaigns'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRouter: vi.fn(() => ({
			currentRoute: { value: { query: {} } },
		})),
		useRoute: vi.fn(() => ({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})),
	}
})

describe('Campaigns changeStatus', () => {
	// let router: ReturnType<typeof useRouter>
	let route: ReturnType<typeof useRoute>

	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())

		// router = useRouter()
		route = useRoute()

		route.name = RouteName.BRAND_AWARENESS_CAMPAIGNS
	})

	const factory = async () => {
		const campaignsStore = useCampaignsStore()

		campaignsStore.campaigns.items = [
			{ ...brandAwarenessCampaign },
		]

		return { campaignsStore }
	}

	it('changeStatus – success', async () => {
		const { campaignsStore } = await factory()

		;(CampaignsApi.toggleStatus as Mock).mockResolvedValueOnce({ status: true })

		await campaignsStore.changeStatus(brandAwarenessCampaign.slug)

		const updatedItem = campaignsStore.campaigns.items.find(item => item.slug === brandAwarenessCampaign.slug)
		expect(updatedItem?.visible).toBe(!brandAwarenessCampaign.visible)

		expect(CampaignsApi.toggleStatus).toHaveBeenCalledWith(
			CampaignType.BRAND_AWARENESS,
			AdEntityType.CAMPAIGNS,
			brandAwarenessCampaign.slug,
		)

		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('changeStatus – fail, api returns error', async () => {
		const { campaignsStore } = await factory()

		;(CampaignsApi.toggleStatus as Mock).mockRejectedValueOnce(new Error('API Error'))

		await campaignsStore.changeStatus(brandAwarenessCampaign.slug)

		const updatedItem = campaignsStore.campaigns.items.find(item => item.slug === brandAwarenessCampaign.slug)
		expect(updatedItem?.visible).toBe(brandAwarenessCampaign.visible)

		expect(Logger.error).toHaveBeenCalled()
	})
})
