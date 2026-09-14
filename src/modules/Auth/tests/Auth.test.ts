import { nextTick, reactive } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Auth from '@/modules/Auth/Auth.vue'
import { RouteName } from '@/modules/Auth/router'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const routeMock = reactive({
	name: RouteName.SIGNIN_STREAMER as string,
	query: {} as Record<string, any>,
	params: {} as Record<string, any>,
})

const routerMock = {
	push: vi.fn(),
	replace: vi.fn(),
}

const mergeRoutesMock = vi.fn().mockResolvedValue(undefined)
const setRegisterParamsMock = vi.fn().mockResolvedValue(undefined)
const setReferralMock = vi.fn()

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: () => routeMock,
		useRouter: () => routerMock,
	}
})

vi.mock('@/core/hooks', async () => {
	const actual = await vi.importActual<typeof import('@/core/hooks')>('@/core/hooks')
	return {
		...actual,
		useModuleRouter: () => ({
			mergeRoutes: mergeRoutesMock,
		}),
	}
})

vi.mock('@/modules/Auth/hooks', async () => {
	const actual = await vi.importActual<typeof import('@/modules/Auth/hooks')>('@/modules/Auth/hooks')
	return {
		...actual,
		useRegisterParams: () => ({
			setRegisterParams: setRegisterParamsMock,
		}),
		useReferral: () => ({
			setReferral: setReferralMock,
		}),
	}
})

describe('Auth', () => {
	const factory = (profile: any = null) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamerStore = useStreamerStore(pinia as any)
		streamerStore.profile = profile

		const wrapper = shallowMount(Auth, {
			global: {
				plugins: [pinia],
			},
		})

		return { wrapper, streamerStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		routeMock.name = RouteName.SIGNIN_STREAMER
		routeMock.query = {}
		routeMock.params = {}
	})

	it('merges routes and sets register params on mount', async () => {
		factory(null)

		await nextTick()
		await Promise.resolve()
		await nextTick()

		expect(mergeRoutesMock).toHaveBeenCalled()
		expect(setRegisterParamsMock).toHaveBeenCalledWith({})
		expect(setReferralMock).not.toHaveBeenCalled()
		expect(routerMock.push).not.toHaveBeenCalled()
	})

	it('handles referral route: sets referral and redirects to signin streamer', async () => {
		routeMock.name = RouteName.STREAMER_REFERRAL_TOKEN
		routeMock.params = { token: 'ref-token' }
		routeMock.query = { utm_campaign: 'utm-campaign' }

		factory(null)

		await nextTick()
		await Promise.resolve()
		await nextTick()

		expect(setRegisterParamsMock).toHaveBeenCalledWith({ utm_campaign: 'utm-campaign' })
		expect(setReferralMock).toHaveBeenCalledWith('ref-token', 'utm-campaign')
		expect(routerMock.push).toHaveBeenCalledWith({ name: RouteName.SIGNIN_STREAMER })
		expect(routerMock.replace).not.toHaveBeenCalled()
	})

	it('redirects to streamer settings when streamer profile is not filled', async () => {
		factory({ isFilled: false })

		await nextTick()
		await Promise.resolve()
		await nextTick()

		expect(routerMock.replace).toHaveBeenCalledWith({ name: RouteName.AUTH_STREAMER_SETTINGS })
	})

	it('does not redirect when already on streamer settings route', async () => {
		routeMock.name = RouteName.AUTH_STREAMER_SETTINGS
		factory({ isFilled: false })

		await nextTick()
		await Promise.resolve()
		await nextTick()

		expect(routerMock.replace).not.toHaveBeenCalled()
	})
})
