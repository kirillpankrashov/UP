import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { extensionAdset } from '@/modules/Partner/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import ExtensionAdsets from '../ExtensionAdsets.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.EXTENSION_ADSETS }

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
	describeTitle: 'Partner Campaigns ExtensionAdsets Component',
	Component: ExtensionAdsets,
	defaultRouteName: RouteName.EXTENSION_ADSETS,
	collectionKey: 'adsets',
	skeletonStubName: 'ExtensionAdsetsSkeleton',
	skeletonDataTest: 'extension-adsets-skeleton-stub',
	fixtureItem: extensionAdset,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
