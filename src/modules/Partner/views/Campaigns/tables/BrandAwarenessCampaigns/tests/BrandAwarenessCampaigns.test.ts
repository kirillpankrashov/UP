import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import BrandAwarenessCampaigns from '../BrandAwarenessCampaigns.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.BRAND_AWARENESS_CAMPAIGNS }

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRouter: vi.fn(() => ({
			push: mockPush,
			currentRoute: {
				value: {
					get query() {
						return routeQueryRef.current
					},
				},
			},
		})),
		useRoute: vi.fn(() => ({
			get name() {
				return routeNameRef.current
			},
			get query() {
				return routeQueryRef.current
			},
		})),
	}
})

runPartnerCampaignsTableSuite({
	describeTitle: 'Partner Campaigns BrandAwarenessCampaigns Component',
	Component: BrandAwarenessCampaigns,
	defaultRouteName: RouteName.BRAND_AWARENESS_CAMPAIGNS,
	collectionKey: 'campaigns',
	skeletonStubName: 'BrandAwarenessCampaignsSkeleton',
	skeletonDataTest: 'brand-awareness-campaigns-skeleton-stub',
	fixtureItem: brandAwarenessCampaign,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
