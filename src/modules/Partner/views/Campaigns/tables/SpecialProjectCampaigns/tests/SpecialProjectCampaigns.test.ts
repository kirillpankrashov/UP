import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { specialProjectCampaign } from '@/modules/Partner/views/Campaigns/api/getSpecialProjectCampaigns/fixtures/specialProjectCampaign'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import SpecialProjectCampaigns from '../SpecialProjectCampaigns.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.SPECIAL_PROJECT_CAMPAIGNS }

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
	describeTitle: 'Partner Campaigns SpecialProjectCampaigns Component',
	Component: SpecialProjectCampaigns,
	defaultRouteName: RouteName.SPECIAL_PROJECT_CAMPAIGNS,
	collectionKey: 'campaigns',
	skeletonStubName: 'SpecialProjectCampaignsSkeleton',
	skeletonDataTest: 'special-project-campaigns-skeleton-stub',
	fixtureItem: specialProjectCampaign,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
