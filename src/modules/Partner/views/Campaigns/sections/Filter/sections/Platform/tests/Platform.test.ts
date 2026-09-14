import { nextTick } from 'vue'
import { type RouteLocationNamedRaw,type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Platform as PlatformName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElRadioGroup } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Platform from '../Platform.vue'

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

describe('Partner Campaigns Filter Platform', () => {
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

	const factory = (route: RouteLocationNamedRaw) => {
		vi.mocked(useRoute).mockImplementation(() => mockRoute(route))

		const wrapper = mount(Platform, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: [],
			},
		})

		const router = useRouter()
		const campaignsStore = useCampaignsStore()

		return { wrapper, router, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		mockRoute()
	})

	it('emits close event on button click', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})

		await wrapper.find('[data-test="filter-platform-close-btn"]').trigger('click')

		expect(wrapper.emitted().close).toBeTruthy()
	})

	// it('updates query when platform selected', async () => {
	// 	const { wrapper, router, campaignsStore } = factory({
	// 		name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
	// 	})

	// 	await nextTick()

	// 	const radioGroup = wrapper.findComponent(ElRadioGroup)
	// 	console.log(radioGroup)
	// 	await radioGroup.vm.$emit('change', PlatformName.TWITCH)

	// 	// expect(router.push).toHaveBeenCalledWith({
	// 	// 	query: { platform: PlatformName.TWITCH, page: undefined },
	// 	// })
	// 	expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	// })

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
			query: { platform: PlatformName.YOUTUBE },
		})

		await nextTick()

		const radioGroup = wrapper.findComponent(ElRadioGroup)
		expect(radioGroup.props('modelValue')).toBe(PlatformName.YOUTUBE)
	})
})
