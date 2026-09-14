import { nextTick } from 'vue'
import { type RouteLocationNamedRaw, type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { parseSlug } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Search from '../Search.vue'

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

describe('Search Component', () => {
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
		vi.useFakeTimers()
		vi.mocked(useRouter).mockImplementation(() => mockRouter)
		vi.mocked(useRoute).mockImplementation(() => mockRoute())
	})

	const factory = (route: RouteLocationNamedRaw) => {
		vi.mocked(useRoute).mockImplementation(() => mockRoute(route))

		const wrapper = mount(Search, {
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

		const router = useRouter()
		const campaignsStore = useCampaignsStore()

		return { wrapper, router, campaignsStore }
	}

	it('initializes value from route query', async () => {
		const { wrapper } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
			query: {
				slug: 'test',
			},
		})

		await nextTick()

		expect(wrapper.findComponent(ElInput).props('modelValue')).toBe('test')
	})

	it('updates slug query when campaign type detected', async () => {
		const { wrapper, router, campaignsStore } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})

		const input = wrapper.find('[data-test="filter-search-input"]')

		;(input.element as HTMLInputElement).value = 'brand_awareness-test'
		await input.trigger('input')

		vi.runAllTimers()
		await nextTick()

		expect(router.push).toHaveBeenCalledWith({
			query: { page: undefined, slug: 'brand_awareness-test', name: undefined },
		})
		expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	})

	it('updates name query when no campaign type', async () => {
		const { wrapper, router, campaignsStore } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})
		;
		(parseSlug as Mock).mockReturnValueOnce(new Error(''))

		const input = wrapper.find('[data-test="filter-search-input"]')

		;(input.element as HTMLInputElement).value = 'test-search'
		await input.trigger('input')

		vi.runAllTimers()
		await nextTick()

		expect(router.push).toHaveBeenCalledWith({
			query: { page: undefined, name: 'test-search', slug: undefined },
		})
		expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	})

	// it('clears query on empty input', async () => {
	// 	const { wrapper, router, campaignsStore } = factory({
	// 		name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
	// 	})

	// 	const input = wrapper.find('[data-test="filter-search-input"]')

	// 	input.element.value = ''
	// 	await input.trigger('input')

	// 	vi.runAllTimers()
	// 	await nextTick()

	// 	expect(router.push).toHaveBeenCalledWith({
	// 		query: { name: undefined, slug: undefined },
	// 	})
	// 	expect(campaignsStore.fetchCollection).toHaveBeenCalled()
	// })

	it('trims input value', async () => {
		const { wrapper, router } = factory({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})

		const input = wrapper.find('[data-test="filter-search-input"]')

		;(input.element as HTMLInputElement).value = ' test '
		await input.trigger('input')

		vi.runAllTimers()
		await nextTick()

		expect(router.push).toHaveBeenCalledWith({
			query: { slug: 'test', name: undefined, page: undefined },
		})
	})
})
