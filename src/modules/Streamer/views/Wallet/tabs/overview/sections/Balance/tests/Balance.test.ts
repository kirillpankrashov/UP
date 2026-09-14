import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Balance from '../Balance.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const TextLinkStub = {
	name: 'TextLink',
	props: ['href', 'target'],
	template: '<a data-test="wallet-balance-help-link" :href="href"><slot /></a>',
}

describe('Streamer Wallet overview Balance', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(Balance, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					TextLink: TextLinkStub,
					EstimatedBalance: { name: 'EstimatedBalance', template: '<div data-test="wallet-balance-estimated-balance-stub" />' },
					CurrentBalance: { name: 'CurrentBalance', template: '<div data-test="wallet-balance-current-balance-stub" />' },
					PayoutStatus: { name: 'PayoutStatus', template: '<div data-test="wallet-balance-payout-status-stub" />' },
				},
			},
		})

		const walletStore = useWalletStore()

		return { wrapper, walletStore }
	}

	it('does not render section when wallet is null', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = null
		await nextTick()

		expect(wrapper.find('[data-test="wallet-balance"]').exists()).toBe(false)
	})

	it('renders child sections and payouts link when wallet exists', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataTochka as any
		await nextTick()

		expect(wrapper.find('[data-test="wallet-balance"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-estimated-balance-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-current-balance-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-payout-status-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-help-link"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-help-link"]').attributes('href')).toBe('links.whenWillIReceiveMyPayouts')
	})
})

