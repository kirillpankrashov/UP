import { nextTick } from 'vue'
import { type RouteLocationNamedRaw,type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElRadioGroup } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Status from '../Status.vue'

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

describe('Partner Campaigns Filter Status', () => {
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

		const wrapper = mount(Status, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: [],
			},
			...options,
		})

		const router = useRouter()
		const campaignsStore = useCampaignsStore()

		return {
			wrapper,
			router,
			campaignsStore,
		}
	}

	it('emits close event on button click', async () => {
		const { wrapper } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		await wrapper.find('[data-test="filter-status-close-btn"]').trigger('click')

		expect(wrapper.emitted().close).toBeTruthy()
	})

	it('clears filter on unmount', async () => {
		const { wrapper, router, campaignsStore } = factory({ name: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		wrapper.unmount()

		await nextTick()

		expect(router.replace).toHaveBeenCalledWith({
			query: { platform: undefined, page: undefined },
		})
		expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	})

	it('syncs with route query parameter', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
			query: { status: 1 },
		})

		await nextTick()

		const radioGroup = wrapper.findComponent(ElRadioGroup)
		expect(radioGroup.props('modelValue')).toBe(1)
	})
})
