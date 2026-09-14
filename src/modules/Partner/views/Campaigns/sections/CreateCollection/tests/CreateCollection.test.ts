import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import CreateCollection from '../CreateCollection.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

vi.mock('vue-router', async (importOriginal) => {
	const actual = await importOriginal<typeof import('vue-router')>()
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(() => ({
			push: vi.fn(),
			currentRoute: { value: {} },
		})),
	}
})

describe('Partner Campaigns CreateCollection', () => {
	const mockRouter = {
		push: vi.fn(),
		currentRoute: { value: { query: {} } },
	} as unknown as ReturnType<typeof useRouter>

	const mockRoute = (name?: RouteName) => ({
		name,
		params: {},
		query: {},
	} as ReturnType<typeof useRoute>)

	beforeEach(() => {
		vi.mocked(useRouter).mockImplementation(() => mockRouter)
		vi.mocked(useRoute).mockImplementation(() => mockRoute())
	})

	const factory = (routeName?: RouteName) => {
		vi.mocked(useRoute).mockImplementation(() => mockRoute(routeName))

		const wrapper = mount(CreateCollection, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: [],
			},
		})

		const campaignsStore = useCampaignsStore()
		const router = useRouter()

		return { wrapper, router, campaignsStore }
	}

	it('opens campaigns sidebar for adsets type', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.BRAND_AWARENESS_ADSETS)

		const btn = wrapper.find('[data-test="create-collection-btn"]')

		await btn.trigger('click')

		expect(campaignsStore.campaignsSidebarVisible).toBe(true)
	})

	it('opens adsets sidebar for creatives type', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.BRAND_AWARENESS_CREATIVES)

		const btn = wrapper.find('[data-test="create-collection-btn"]')

		await btn.trigger('click')

		expect(campaignsStore.adsetsSidebarVisisble).toBe(true)
	})

	// it('navigates to create page for default case', async () => {
	// 	const { wrapper, router } = factory(RouteName.BRAND_AWARENESS_CAMPAIGNS)

	// 	await wrapper.findComponent(ElButton).trigger('click')

	// 	expect(router.push).toHaveBeenCalledWith({
	// 		name: RouteName.CAMPAIGN_CREATE,
	// 	})
	// })
})
