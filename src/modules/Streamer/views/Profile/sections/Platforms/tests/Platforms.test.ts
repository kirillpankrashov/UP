import { nextTick } from 'vue'
import { type RouteLocationNormalizedLoaded,useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorAuth, Platform } from '@/core/types'
import { getDomain } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { AuthButton } from '@/components'
import { ErrorAccountExists, ErrorTiktok, ErrorTrovo, ErrorTwitch, ErrorVkplay, ErrorYoutube } from '@/components/AuthError'
import { Platforms } from '@/modules/Streamer/views/Profile/sections'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Profile/sections/helpers', () => ({
	attach: vi.fn(),
}))

describe('Streamer Profile Platforms', () => {
	const options = {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
			stubs: ['router-link'],
		},
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders the AuthButton components based on the available platforms', async () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		const appStore = useAppStore()
		appStore.domain = getDomain()

		await nextTick()

		const authButtons = wrapper.findAllComponents(AuthButton)

		expect(authButtons.length).toBe(appStore.domain?.platforms.length)
	})

	it('shows ErrorTwitch if route query has error and platform is Twitch', async () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: Platform.TWITCH,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorTwitch).exists()).toBe(true)
	})

	it('shows ErrorYoutube if route query has error and platform is Youtube', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: Platform.YOUTUBE,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorYoutube).exists()).toBe(true)
	})

	it('shows ErrorTrovo if route query has error and platform is Trovo', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: Platform.TROVO,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorTrovo).exists()).toBe(true)
	})

	it('shows ErrorTrovo if route query has error and platform is VK Play', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: Platform.VK_PLAY,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorVkplay).exists()).toBe(true)
	})

	it('shows ErrorTiktok if route query has error and platform is TikTok', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: Platform.TIKTOK,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorTiktok).exists()).toBe(true)
	})

	it('shows ErrorAccountExists if route query has error and reason', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				reason: ErrorAuth.ACCOUNT_EXISTS,
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Platforms, options)

		expect(wrapper.findComponent(ErrorAccountExists).exists()).toBe(true)
	})
})
