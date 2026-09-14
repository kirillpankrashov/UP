import { nextTick } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ErrorAuth } from '@/core/types'
import { getDomain } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { AuthButton } from '@/components'
import { ErrorBlocked, ErrorTrovo, ErrorTwitch, ErrorYoutube } from '@/components/AuthError'
import { RouteName } from '@/modules/Auth/router'
import { SigninStreamer } from '@/modules/Auth/views/SigninStreamer'
import { Info } from '@/modules/Auth/views/SigninStreamer/components'
import { checkStreamerParams } from '@/modules/Auth/views/SigninStreamer/helpers/checkStreamerParams'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/SigninStreamer/helpers/checkStreamerParams', () => ({
	checkStreamerParams: vi.fn(),
}))

describe('SigninStreamer', () => {
	const factory = (routeData: any = { name: RouteName.SIGNIN_STREAMER, query: {} }) => {
		vi.mocked(useRoute).mockReturnValue(routeData as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(SigninStreamer, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		return { wrapper }
	}

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders the AuthButton components based on the available platforms', async () => {
		const { wrapper } = factory()

		const appStore = useAppStore()
		appStore.domain = getDomain()

		await nextTick()

		const authButtons = wrapper.findAllComponents(AuthButton)

		expect(authButtons.length).toBe(appStore.domain?.platforms.length)
	})

	it(`hides Info block if route name is ${RouteName.STREAMER_REFERRAL_TOKEN}`, async () => {
		const { wrapper } = factory({
			name: RouteName.STREAMER_REFERRAL_TOKEN,
			query: {},
		})

		await nextTick()
		expect(wrapper.findComponent(Info).exists()).toBe(false)
	})

	it(`hides Info block if route name is ${RouteName.PARTNER_REFERRAL_TOKEN}`, async () => {
		const { wrapper } = factory({
			name: RouteName.PARTNER_REFERRAL_TOKEN,
			query: {},
		})

		await nextTick()
		expect(wrapper.findComponent(Info).exists()).toBe(false)
	})

	it(`hides Info block if route name is ${RouteName.AUTH_STREAMER_SETTINGS}`, async () => {
		const { wrapper } = factory({
			name: RouteName.AUTH_STREAMER_SETTINGS,
			query: {},
		})

		await nextTick()

		expect(wrapper.findComponent(Info).exists()).toBe(false)
	})

	it('calls checkStreamerParams function', () => {
		factory()

		expect(checkStreamerParams).toHaveBeenCalled()
	})

	it('shows account blocked auth error if get param has corresponding query', () => {
		const { wrapper } = factory({
			query: {
				error: ErrorAuth.ACCOUNT_BLOCKED,
			},
		})

		expect(wrapper.findComponent(ErrorBlocked).exists()).toBe(true)
	})

	it('shows twitch auth error if get param has corresponding query', () => {
		const { wrapper } = factory({
			query: {
				error: ErrorAuth.TWITCH,
			},
		})

		expect(wrapper.findComponent(ErrorTwitch).exists()).toBe(true)
	})

	it('shows youtube auth error if get param has corresponding query', () => {
		const { wrapper } = factory({
			query: {
				error: ErrorAuth.YOUTUBE,
			},
		})

		expect(wrapper.findComponent(ErrorYoutube).exists()).toBe(true)
	})

	it('shows trovo auth error if get param has corresponding query', () => {
		const { wrapper } = factory({
			query: {
				error: ErrorAuth.TROVO,
			},
		})

		expect(wrapper.findComponent(ErrorTrovo).exists()).toBe(true)
	})

	it('doesnt show any errors if get param hasnt any error in query', () => {
		const { wrapper } = factory({
			query: {},
		})

		expect(wrapper.findComponent(ErrorBlocked).exists()).toBe(false)
		expect(wrapper.findComponent(ErrorTwitch).exists()).toBe(false)
		expect(wrapper.findComponent(ErrorYoutube).exists()).toBe(false)
		expect(wrapper.findComponent(ErrorTrovo).exists()).toBe(false)
	})
})
