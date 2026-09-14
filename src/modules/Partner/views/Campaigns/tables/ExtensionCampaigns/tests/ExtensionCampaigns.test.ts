import { vi } from 'vitest'

import { RouteName } from '@/modules/Partner/router'
import { extensionCampaign } from '@/modules/Partner/views/Campaigns/api/getExtensionCampaigns/fixtures/extensionCampaign'
import { runPartnerCampaignsTableSuite } from '@/modules/Partner/views/Campaigns/tables/tests/runPartnerCampaignsTableSuite'

import ExtensionCampaigns from '../ExtensionCampaigns.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

const mockPush = vi.fn()
const routeQueryRef: { current: Record<string, string | string[]> } = { current: {} }
const routeNameRef: { current: RouteName } = { current: RouteName.EXTENSION_CAMPAIGNS }

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
	describeTitle: 'Partner Campaigns ExtensionCampaigns Component',
	Component: ExtensionCampaigns,
	defaultRouteName: RouteName.EXTENSION_CAMPAIGNS,
	collectionKey: 'campaigns',
	skeletonStubName: 'ExtensionCampaignsSkeleton',
	skeletonDataTest: 'extension-campaigns-skeleton-stub',
	fixtureItem: extensionCampaign,
	mockPush,
	routeQueryRef,
	routeNameRef,
})
