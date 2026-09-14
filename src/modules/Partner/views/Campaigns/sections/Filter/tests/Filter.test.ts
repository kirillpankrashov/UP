import { nextTick } from 'vue'
import { type RouteLocationNamedRaw, type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Filter from '../Filter.vue'

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

describe('Partner Campaigns Filter', () => {
	beforeEach(() => {
		Object.entries(messages).forEach(([locale, msg]) => {
			i18n.global.mergeLocaleMessage(locale, msg)
		})
	})

	const mockRouter = {
		push: vi.fn(),
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

		const wrapper = mount(Filter, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: ['Status', 'Platform', 'Advertiser'],
			},
			...options,
		})

		const campaignsStore = useCampaignsStore()

		return { wrapper, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders active filters', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
			query: {
				platform: Platform.TWITCH,
				advertiser: '1',
				visible: '1',
			},
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'Status' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Platform' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Advertiser' }).exists()).toBe(true)
	})

	it('shows add button when not all filters are active', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
			query: {
				platform: Platform.TWITCH,
				advertiser: '1',
				visible: '1',
			},
		})

		const button = wrapper.find('[data-test="filter-btn"]')
		expect(button.exists()).toBe(true)
	})

	// it('opens filter list popover on button click', async () => {
	// 	const { wrapper } = factory({
	// 		name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
	// 		query: {
	// 			platform: Platform.TWITCH,
	// 			advertiser: '1',
	// 			visible: '1',
	// 		},
	// 	})

	// 	await wrapper.find('[data-test="filter-btn"]').trigger('click')
	// 	const popover = wrapper.findComponent(ElPopover)

	// 	expect(popover.props('modelValue')).toBe(true)
	// })

	it('toggles filter visibility', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
			query: {
				platform: Platform.TWITCH,
				advertiser: '1',
				visible: '1',
			},
		})

		await wrapper.find('[data-test="filter-btn"]').trigger('click')
		const firstFilter = wrapper.findAll('li')[0]

		await firstFilter?.trigger('click')
		expect(wrapper.vm.filters.status.visible).toBe(true)
		expect(wrapper.vm.filterListVisible).toBe(false)
	})

	it('updates available filters when entity type changes', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_ADSETS,
			query: {
				platform: Platform.TWITCH,
				advertiser: '1',
				visible: '1',
			},
		})

		await nextTick()

		expect(wrapper.vm.filters.platform.available).toBe(true)
	})

	it('hides add button when all filters are active', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_ADSETS,
			query: {
				platform: Platform.TWITCH,
				advertiser: '1',
				visible: '1',
			},
		})

		await nextTick()
		expect(wrapper.find('[data-test="filter-btn"]').exists()).toBe(false)
	})
})
