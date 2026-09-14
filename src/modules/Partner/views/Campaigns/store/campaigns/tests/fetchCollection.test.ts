import { useRouter } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { AdEntityType,CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { RouteName } from '@/modules/Partner/router'
import * as CampaignsApi from '@/modules/Partner/views/Campaigns/api'

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

describe('CampaignsStore fetchCollection', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchCollection = false, options = {}) => {
		const store = useCampaignsStore()
		if (fetchCollection) {
			await store.fetchCollection(options)
		}
		return { store }
	}

	it('fetchCollection – success', async () => {
		const mockData = {
			perPage: 10,
			total: 100,
			data: [{ slug: 'test-campaign', visible: true }],
		}
		;(CampaignsApi.getBrandAwarenessCampaigns as Mock).mockResolvedValueOnce(mockData)

		const { store } = await factory(false)

		expect(store.campaigns.loading).toBe(false)

		const promise = store.fetchCollection({
			campaignType: CampaignType.BRAND_AWARENESS,
			adEntityType: AdEntityType.CAMPAIGNS,
		})

		expect(store.campaigns.loading).toBe(true)

		await promise

		expect(store.campaigns.loading).toBe(false)
		expect(store.campaigns.perPage).toBe(mockData.perPage)
		expect(store.campaigns.total).toBe(mockData.total)
		expect(store.campaigns.items).toEqual(mockData.data)
		expect(store.campaigns.bootstrapped).toBe(true)

		expect(CampaignsApi.getBrandAwarenessCampaigns).toHaveBeenCalled()
	})

	it('fetchCollection – fail', async () => {
		;(CampaignsApi.getBrandAwarenessCampaigns as Mock).mockRejectedValueOnce(new Error('Request failed'))

		const { store } = await factory(false)

		expect(store.campaigns.loading).toBe(false)

		const promise = store.fetchCollection({
			campaignType: CampaignType.BRAND_AWARENESS,
			adEntityType: AdEntityType.CAMPAIGNS,
		})

		expect(store.campaigns.loading).toBe(true)

		await promise

		expect(store.campaigns.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalled()
	})

	it('fetchCollection – isSidebar=true updates sidebarPage', async () => {
		const mockData = { perPage: 10, total: 100, data: [] }
		;(CampaignsApi.getBrandAwarenessCampaigns as Mock).mockResolvedValueOnce(mockData)

		const { store } = await factory(false)

		await store.fetchCollection({
			campaignType: CampaignType.BRAND_AWARENESS,
			adEntityType: AdEntityType.CAMPAIGNS,
			isSidebar: true,
			page: 3,
		})

		expect(store.campaigns.sidebarPage).toBe(3)
	})

	it('fetchCollection – uses current route query params', async () => {
		(useRouter as Mock).mockReturnValue({
			currentRoute: { value: { query: { filter: 'active' } } },
		})

		const mockData = { perPage: 10, total: 100, data: [] }
		;(CampaignsApi.getBrandAwarenessCampaigns as Mock).mockResolvedValueOnce(mockData)

		const { store } = await factory(false)

		await store.fetchCollection({
			campaignType: CampaignType.BRAND_AWARENESS,
			adEntityType: AdEntityType.CAMPAIGNS,
		})

		expect(CampaignsApi.getBrandAwarenessCampaigns).toHaveBeenCalledWith({ filter: 'active' })
	})
})
