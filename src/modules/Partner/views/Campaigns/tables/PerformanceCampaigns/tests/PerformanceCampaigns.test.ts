import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { performanceCampaign } from '@/modules/Partner/views/Campaigns/api/getPerformanceCampaigns/fixtures/performanceCampaign'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import PerformanceCampaigns from '../PerformanceCampaigns.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.PERFORMANCE_CAMPAIGNS }

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
	describeTitle: 'Partner Campaigns PerformanceCampaigns Component',
	Component: PerformanceCampaigns,
	defaultRouteName: RouteName.PERFORMANCE_CAMPAIGNS,
	collectionKey: 'campaigns',
	skeletonStubName: 'PerformanceCampaignsSkeleton',
	skeletonDataTest: 'performance-campaigns-skeleton-stub',
	fixtureItem: performanceCampaign,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
