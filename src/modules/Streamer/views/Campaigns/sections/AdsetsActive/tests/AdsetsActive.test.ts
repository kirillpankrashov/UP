import { nextTick, reactive } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Streamer/router'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import { specialProjectAdset } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/fixtures/specialProjectAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import AdsetsActive from '../AdsetsActive.vue'

vi.mock('@/modules/Streamer/views/Campaigns/api')
// Мокаем vue-router
vi.mock('vue-router', async () => {
	const actual = await vi.importActual('vue-router')
	return {
		...actual as typeof import('vue-router'),
		useRoute: vi.fn(),
		useRouter: vi.fn(),
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetsActive', () => {
	const mockRouter = {
		push: vi.fn(),
		currentRoute: {
			value: {},
		},
		options: {},
		listening: true,
		addRoute: vi.fn(),
		removeRoute: vi.fn(),
		hasRoute: vi.fn(),
		getRoutes: vi.fn(),
		resolve: vi.fn(),
		replace: vi.fn(),
		go: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		beforeEach: vi.fn(),
		beforeResolve: vi.fn(),
		afterEach: vi.fn(),
		onError: vi.fn(),
		isReady: vi.fn(),
		install: vi.fn(),
	} as unknown as Router

	const mockRoute = reactive<RouteLocationNormalizedLoaded>({
		name: RouteName.CAMPAIGNS_LIVESTREAM,
		path: '/campaigns/livestream',
		fullPath: '/campaigns/livestream',
		hash: '',
		query: {},
		params: {},
		matched: [],
		meta: {},
		redirectedFrom: undefined,
	})

	// Устанавливаем моки для роутера перед каждым тестом
	beforeEach(() => {
		vi.mocked(useRoute).mockReturnValue(mockRoute)
		vi.mocked(useRouter).mockReturnValue(mockRouter)
	})

	const factory = (piniaInitialState: Record<string, any> = {}) => {
		const wrapper = mount(AdsetsActive, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: piniaInitialState,
					}),
				],
				stubs: {
					AdsetsList: true,
					Advice: true,
					TextLink: true,
				},
			},
		})

		const campaignsStore = useCampaignsStore()
		const streamerStore = useStreamerStore()

		return {
			wrapper,
			campaignsStore,
			streamerStore,
		}
	}

	describe('Livestream campaigns', () => {
		beforeEach(() => {
			mockRoute.name = RouteName.CAMPAIGNS_LIVESTREAM
		})

		afterEach(() => {
			vi.clearAllMocks()
		})

		it('renders active campaigns list', async () => {
			const { wrapper, campaignsStore } = factory()

			campaignsStore.activeCampaigns.data.active = [brandAwarenessCustomAdset]
			await nextTick()

			const activeList = wrapper.find('[data-test="adsets-active-list"]')
			expect(activeList.exists()).toBe(true)
			expect(activeList.attributes('adsets')).toBeTruthy()
			expect(activeList.attributes('title')).toBe('campaigns.active.title')
			expect(activeList.attributes('description')).toBe('campaigns.active.description')
			expect(activeList.attributes('hint')).toBe('true')
		})

		it('renders inactive campaigns list', async () => {
			const { wrapper, campaignsStore } = factory()

			campaignsStore.activeCampaigns.data.inactive = [brandAwarenessCustomAdset]
			await nextTick()

			const inactiveList = wrapper.find('[data-test="adsets-inactive-list"]')
			expect(inactiveList.exists()).toBe(true)
			expect(inactiveList.attributes('adsets')).toBeTruthy()
			expect(inactiveList.attributes('title')).toBe('campaigns.inactive.title')
			expect(inactiveList.attributes('description')).toBe('campaigns.inactive.description')
		})

		it('renders future campaigns list when has items', async () => {
			const { wrapper, campaignsStore } = factory()

			expect(wrapper.find('[data-test="adsets-future-list"]').exists()).toBe(false)

			campaignsStore.activeCampaigns.data.future = [brandAwarenessCustomAdset]
			await nextTick()

			const futureList = wrapper.find('[data-test="adsets-future-list"]')
			expect(futureList.exists()).toBe(true)
			expect(futureList.attributes('adsets')).toBeTruthy()
			expect(futureList.attributes('title')).toBe('campaigns.future.title')
			expect(futureList.attributes('description')).toBe('campaigns.future.description')
		})

		it('renders unavailable campaigns list when has items', async () => {
			const { wrapper, campaignsStore } = factory()

			expect(wrapper.find('[data-test="adsets-unavailable-list"]').exists()).toBe(false)

			campaignsStore.activeCampaigns.data.unavailable = [brandAwarenessCustomAdset]
			await nextTick()

			const unavailableList = wrapper.find('[data-test="adsets-unavailable-list"]')
			expect(unavailableList.exists()).toBe(true)
			expect(unavailableList.attributes('adsets')).toBeTruthy()
			expect(unavailableList.attributes('title')).toBe('campaigns.notAvailable.title')
			expect(unavailableList.attributes('description')).toBe('campaigns.notAvailable.description')
		})

		it('fetches campaigns on mount when no data', () => {
			const { campaignsStore } = factory()
			expect(campaignsStore.fetchActiveCampaigns).toHaveBeenCalledOnce()
		})

		it('does not fetch campaigns on mount when has data', async () => {
			const { campaignsStore } = factory()

			// Сначала очищаем моки
			vi.clearAllMocks()

			// Устанавливаем данные
			campaignsStore.activeCampaigns.data.active = [brandAwarenessCustomAdset]
			await nextTick()

			// Проверяем что fetch не вызывался
			expect(campaignsStore.fetchActiveCampaigns).not.toHaveBeenCalled()
		})
	})

	describe('Preroll campaigns', () => {
		beforeEach(() => {
			mockRoute.name = RouteName.CAMPAIGNS_PREROLL
		})

		afterEach(() => {
			vi.clearAllMocks()
		})

		it('renders preroll campaigns list when preroll is active', async () => {
			const { wrapper, campaignsStore, streamerStore } = factory()

			streamerStore.profile = {
				...profileData,
				prerollActive: true,
			}
			campaignsStore.activePrerollCampaigns = [prerollAdset]
			await nextTick()

			const prerollList = wrapper.find('[data-test="adsets-preroll-list"]')
			expect(prerollList.exists()).toBe(true)
			expect(prerollList.attributes('adsets')).toBeTruthy()
			expect(prerollList.attributes('title')).toBe('campaigns.active.title')
			expect(prerollList.attributes('description')).toBe('campaigns.active.description')
		})

		it('redirects to livestream when preroll is not active', async () => {
			const { streamerStore } = factory()

			streamerStore.profile = {
				...profileData,
				prerollActive: false,
			}
			await nextTick()

			expect(mockRouter.push).toHaveBeenCalledWith({
				name: RouteName.CAMPAIGNS_LIVESTREAM,
			})
		})

		// it('fetches preroll campaigns on mount when no data', async () => {
		// 	const { campaignsStore, streamerStore } = factory()

		// 	// Сначала очищаем моки
		// 	vi.clearAllMocks()

		// 	// Устанавливаем профиль
		// 	streamerStore.profile = {
		// 		...profileData,
		// 		prerollActive: true,
		// 	}

		// 	campaignsStore.activePrerollCampaigns = []

		// 	// Важно: нужно дождаться следующего тика для обработки watch
		// 	await nextTick()

		// 	expect(campaignsStore.fetchPrerollActiveCampaigns).toHaveBeenCalledOnce()
		// })

		it('does not fetch preroll campaigns when has data', async () => {
			const { campaignsStore, streamerStore } = factory()

			// Сначала очищаем моки
			vi.clearAllMocks()

			// Устанавливаем профиль и данные
			streamerStore.profile = {
				...profileData,
				prerollActive: true,
			}
			campaignsStore.activePrerollCampaigns = [prerollAdset]

			await nextTick()

			expect(campaignsStore.fetchPrerollActiveCampaigns).not.toHaveBeenCalled()
		})
	})

	describe('Special project campaigns', () => {
		beforeEach(() => {
			mockRoute.name = RouteName.CAMPAIGNS_SPECIAL_PROJECT
		})

		afterEach(() => {
			vi.clearAllMocks()
		})

		it('fetches special project campaigns on mount when specialProjectsActive is true and no data', () => {
			const { campaignsStore } = factory({
				streamer: {
					profile: {
						...profileData,
						specialProjectsActive: true,
					},
				},
			})

			expect(campaignsStore.fetchSpecialProjectActiveCampaigns).toHaveBeenCalledOnce()
		})

		it('redirects to livestream when specialProjectsActive is false', () => {
			const { campaignsStore } = factory({
				streamer: {
					profile: {
						...profileData,
						specialProjectsActive: false,
					},
				},
			})

			expect(mockRouter.push).toHaveBeenCalledWith({
				name: RouteName.CAMPAIGNS_LIVESTREAM,
			})
			expect(campaignsStore.fetchSpecialProjectActiveCampaigns).not.toHaveBeenCalled()
		})

		it('does not fetch special project campaigns when has data', () => {
			const { campaignsStore } = factory({
				streamer: {
					profile: {
						...profileData,
						specialProjectsActive: true,
					},
				},
				campaigns: {
					activeSpecialProjectCampaigns: {
						data: {
							active: [specialProjectAdset],
							inactive: [],
							future: [],
							unavailable: [],
						},
					},
				},
			})

			expect(campaignsStore.fetchSpecialProjectActiveCampaigns).not.toHaveBeenCalled()
		})
	})
})
