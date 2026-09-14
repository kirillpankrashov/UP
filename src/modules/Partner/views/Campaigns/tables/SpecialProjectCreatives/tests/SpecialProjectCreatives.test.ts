import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { specialProjectCreative } from '@/modules/Partner/views/Campaigns/api/getSpecialProjectCreatives/fixtures/specialProjectCreative'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import SpecialProjectCreatives from '../SpecialProjectCreatives.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.SPECIAL_PROJECT_CREATIVES }

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
	describeTitle: 'Partner Campaigns SpecialProjectCreatives Component',
	Component: SpecialProjectCreatives,
	defaultRouteName: RouteName.SPECIAL_PROJECT_CREATIVES,
	collectionKey: 'creatives',
	skeletonStubName: 'SpecialProjectCreativesSkeleton',
	skeletonDataTest: 'special-project-creatives-skeleton-stub',
	fixtureItem: specialProjectCreative,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
