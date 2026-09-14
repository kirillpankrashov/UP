import { nextTick, reactive } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { RouteName, streamerRouter } from '@/modules/Streamer/router'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'
import { useTransactionsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Streamer from '../Streamer.vue'

const hoistedHelpers = vi.hoisted(() => ({
	removeTokenMock: vi.fn(),
	tallyUpdateHiddenFieldsMock: vi.fn(),
	tallyShowIfReadyMock: vi.fn(),
	tallyDestroyMock: vi.fn(),
}))

const routeMock = reactive<{ name: RouteName | string | undefined }>({
	name: RouteName.WALLET,
})

const routerMock = {
	isReady: vi.fn().mockResolvedValue(undefined),
	push: vi.fn(),
}

const mergeRoutesMock = vi.fn().mockResolvedValue(undefined)

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

vi.mock('@/core/helpers', async () => {
	const actual = await vi.importActual<typeof import('@/core/helpers')>('@/core/helpers')

	class TallyFormManagerMock {
		updateHiddenFields = hoistedHelpers.tallyUpdateHiddenFieldsMock
		showIfReady = hoistedHelpers.tallyShowIfReadyMock
		destroy = hoistedHelpers.tallyDestroyMock
	}

	return {
		...actual,
		removeToken: hoistedHelpers.removeTokenMock,
		TallyFormManager: TallyFormManagerMock,
	}
})

describe('Streamer Root View', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		routeMock.name = RouteName.WALLET
	})

	const factory = (setup?: (stores: {
		streamerStore: ReturnType<typeof useStreamerStore>
		settingsStore: ReturnType<typeof useSettingsStore>
		walletStore: ReturnType<typeof useWalletStore>
		campaignsStore: ReturnType<typeof useCampaignsStore>
		referralsStore: ReturnType<typeof useReferralsStore>
		transactionsStore: ReturnType<typeof useTransactionsStore>
	}) => void) => {
		const pinia = createTestingPinia({ createSpy: vi.fn })

		const streamerStore = useStreamerStore(pinia as any)
		const settingsStore = useSettingsStore(pinia as any)
		const walletStore = useWalletStore(pinia as any)
		const campaignsStore = useCampaignsStore(pinia as any)
		const dictStore = useDictStore(pinia as any)
		const referralsStore = useReferralsStore(pinia as any)
		const transactionsStore = useTransactionsStore(pinia as any)

		// defaults
		dictStore.isFetching = false
		streamerStore.profile = {
			userId: 123,
			username: 'streamer-test',
			deleted: {
				isDeleted: false,
				isRequested: false,
			},
		} as any
		settingsStore.widget = {} as any
		campaignsStore.isFetchingActiveCampaigns = false
		referralsStore.referral = {} as any
		transactionsStore.transactions.data = [{} as any]

		setup?.({
			streamerStore,
			settingsStore,
			walletStore,
			campaignsStore,
			referralsStore,
			transactionsStore,
		})

		const wrapper = mount(Streamer, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					RouterView: { name: 'RouterView', template: '<div data-test="router-view-stub" />' },
					ReloginMessage: { name: 'ReloginMessage', template: '<div data-test="relogin-message-stub" />' },
				},
			},
		})

		return {
			wrapper,
			streamerStore,
			settingsStore,
			walletStore,
			campaignsStore,
			referralsStore,
		}
	}

	it('runs initialization flow on mount when profile is active', async () => {
		const { settingsStore, walletStore, campaignsStore } = factory()
		await nextTick()
		await nextTick()

		expect(routerMock.isReady).toHaveBeenCalled()
		expect(mergeRoutesMock).toHaveBeenCalledWith(streamerRouter)
		expect(settingsStore.fetchWidget).toHaveBeenCalled()
		expect(walletStore.fetchWallet).toHaveBeenCalled()
		expect(campaignsStore.fetchActiveCampaignsShort).toHaveBeenCalled()
		expect(hoistedHelpers.removeTokenMock).not.toHaveBeenCalled()
		expect(routerMock.push).not.toHaveBeenCalled()
		expect(hoistedHelpers.tallyUpdateHiddenFieldsMock).toHaveBeenCalledWith({
			user_id: 123,
			channel_name: 'streamer-test',
		})
		expect(hoistedHelpers.tallyShowIfReadyMock).toHaveBeenCalled()
	})

	it('removes token when profile is marked deleted', async () => {
		factory(({ streamerStore }) => {
			streamerStore.profile = {
				userId: 1,
				username: 'deleted-user',
				deleted: {
					isDeleted: true,
					isRequested: false,
				},
			} as any
		})
		await nextTick()
		await nextTick()

		expect(hoistedHelpers.removeTokenMock).toHaveBeenCalled()
	})

	it('redirects to deactivated when deletion requested and stops further flow', async () => {
		const { settingsStore, walletStore, campaignsStore } = factory(({ streamerStore }) => {
			streamerStore.profile = {
				userId: 7,
				username: 'requested-user',
				deleted: {
					isDeleted: false,
					isRequested: true,
				},
			} as any
		})
		await nextTick()
		await nextTick()

		expect(routerMock.push).toHaveBeenCalledWith({ name: RouteName.DEACTIVATED })
		expect(settingsStore.fetchWidget).not.toHaveBeenCalled()
		expect(walletStore.fetchWallet).not.toHaveBeenCalled()
		expect(campaignsStore.fetchActiveCampaignsShort).not.toHaveBeenCalled()
		expect(hoistedHelpers.tallyShowIfReadyMock).not.toHaveBeenCalled()
	})

	it('destroys tally manager on unmount', async () => {
		const { wrapper } = factory()
		await nextTick()

		wrapper.unmount()
		expect(hoistedHelpers.tallyDestroyMock).toHaveBeenCalled()
	})
})

