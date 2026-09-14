import { nextTick } from 'vue'
import { type RouteLocationNamedRaw,type RouteLocationNormalizedLoaded,useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElSelect } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Advertiser from '../Advertiser.vue'

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

describe('Partner Campaigns Filter Advertiser', () => {
	const mockRouter = {
		push: vi.fn(),
		replace: vi.fn(),
		currentRoute: { value: { query: {} } },
	} as unknown as ReturnType<typeof useRouter>

	const mockRoute = (route?: RouteLocationNamedRaw) => ({
		params: {},
		query: {},
		...route,
	} as unknown as RouteLocationNormalizedLoaded)

	beforeEach(() => {
		vi.mocked(useRouter).mockImplementation(() => mockRouter)
		vi.mocked(useRoute).mockImplementation(() => mockRoute())
	})

	const factory = (route: RouteLocationNamedRaw, options = {}) => {
		vi.mocked(useRoute).mockImplementation(() => mockRoute(route))

		const wrapper = mount(Advertiser, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: ['ElSelect', 'ElOption'],
			},
			...options,
		})

		const router = useRouter()

		const advertisersStore = useAdvertisersStore()
		const campaignsStore = useCampaignsStore()

		return {
			wrapper,
			router,
			advertisersStore,
			campaignsStore,
		}
	}

	it('emits close event on button click', async () => {
		const { wrapper } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		await wrapper.find('[data-test="filter-advertiser-close-btn"]').trigger('click')

		expect(wrapper.emitted().close).toBeTruthy()
	})

	it('fetches advertisers on mount', async () => {
		const { advertisersStore } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		await nextTick()

		expect(advertisersStore.fetchAdvertisers).toHaveBeenCalled()
	})

	// it('updates query on select', async () => {
	// 	const { wrapper, router, campaignsStore } = factory()
	// 	await nextTick()

	// 	const select = wrapper.findComponent(ElSelect)
	// 	await select.vm.$emit('change', '1')


	// 	expect(router.push).toHaveBeenCalledWith({
	// 		query: { advertiser: '1', page: undefined },
	// 	})
	// 	expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	// })

	it('clears query on "all" select', async () => {
		const { wrapper, router, campaignsStore } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		await select.vm.$emit('change', '')

		expect(router.replace).toHaveBeenCalledWith({
			query: { advertiser: undefined, page: undefined },
		})
		expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	})

	it('resets filter on unmount', async () => {
		const { wrapper, router, campaignsStore } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		wrapper.unmount()

		await nextTick()

		expect(router.replace).toHaveBeenCalledWith({
			query: { advertiser: undefined, page: undefined },
		})
		expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	})

	it('syncs with route query', async () => {
		const { wrapper } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS, query: { advertiser: '2' } })

		await nextTick()

		const select = wrapper.findComponent(ElSelect)

		expect(select.props('modelValue')).toBe('2')
	})
})
