import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { prerollCampaign } from '@/modules/Partner/views/Campaigns/api/getPrerollCampaigns/fixtures/prerollCampaign'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import PrerollCampaigns from '../PrerollCampaigns.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.PREROLL_CAMPAIGNS }

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
	describeTitle: 'Partner Campaigns PrerollCampaigns Component',
	Component: PrerollCampaigns,
	defaultRouteName: RouteName.PREROLL_CAMPAIGNS,
	collectionKey: 'campaigns',
	skeletonStubName: 'PrerollCampaignsSkeleton',
	skeletonDataTest: 'preroll-campaigns-skeleton-stub',
	fixtureItem: prerollCampaign,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
