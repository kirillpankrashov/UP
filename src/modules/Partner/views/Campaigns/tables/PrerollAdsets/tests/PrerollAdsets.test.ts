import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { PrerollAdset } from '@/modules/Partner/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import PrerollAdsets from '../PrerollAdsets.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.PREROLL_ADSETS }

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
	describeTitle: 'Partner Campaigns PrerollAdsets Component',
	Component: PrerollAdsets,
	defaultRouteName: RouteName.PREROLL_ADSETS,
	collectionKey: 'adsets',
	skeletonStubName: 'PrerollAdsetsSkeleton',
	skeletonDataTest: 'preroll-adsets-skeleton-stub',
	fixtureItem: PrerollAdset,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
