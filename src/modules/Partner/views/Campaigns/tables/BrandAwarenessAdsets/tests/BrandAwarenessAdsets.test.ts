import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import BrandAwarenessAdsets from '../BrandAwarenessAdsets.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.BRAND_AWARENESS_ADSETS }

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
	describeTitle: 'Partner Campaigns BrandAwarenessAdsets Component',
	Component: BrandAwarenessAdsets,
	defaultRouteName: RouteName.BRAND_AWARENESS_ADSETS,
	collectionKey: 'adsets',
	skeletonStubName: 'BrandAwarenessAdsetsSkeleton',
	skeletonDataTest: 'brand-awareness-adsets-skeleton-stub',
	fixtureItem: brandAwarenessAdset,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
