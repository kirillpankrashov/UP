import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { extensionCreative } from '@/modules/Partner/views/Campaigns/api/getExtensionCreatives/fixtures/extensionCreative'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import ExtensionCreatives from '../ExtensionCreatives.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.EXTENSION_CREATIVES }

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
	describeTitle: 'Partner Campaigns ExtensionCreatives Component',
	Component: ExtensionCreatives,
	defaultRouteName: RouteName.EXTENSION_CREATIVES,
	collectionKey: 'creatives',
	skeletonStubName: 'ExtensionCreativesSkeleton',
	skeletonDataTest: 'extension-creatives-skeleton-stub',
	fixtureItem: extensionCreative,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
