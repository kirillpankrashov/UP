import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { specialProjectAdset } from '@/modules/Partner/views/Campaigns/api/getSpecialProjectAdsets/fixtures/specialProjectAdset'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import SpecialProjectAdsets from '../SpecialProjectAdsets.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.SPECIAL_PROJECT_ADSETS }

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
	describeTitle: 'Partner Campaigns SpecialProjectAdsets Component',
	Component: SpecialProjectAdsets,
	defaultRouteName: RouteName.SPECIAL_PROJECT_ADSETS,
	collectionKey: 'adsets',
	skeletonStubName: 'SpecialProjectAdsetsSkeleton',
	skeletonDataTest: 'special-project-adsets-skeleton-stub',
	fixtureItem: specialProjectAdset,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
