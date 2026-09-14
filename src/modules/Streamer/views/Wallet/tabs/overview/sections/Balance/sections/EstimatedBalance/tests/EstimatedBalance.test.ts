import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import EstimatedBalance from '../EstimatedBalance.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, params?: Record<string, unknown>) => `${key}${params?.month ? `:${params.month}` : ''}`,
	}),
	useCurrency: () => ({
		formatCurrency: vi.fn((value: number, _compact: boolean, currency?: string) => `formatted-${value}-${currency ?? 'none'}`),
	}),
}))

const StatCardStub = {
	name: 'StatCard',
	props: ['value', 'label'],
	template: `
		<div data-test="estimated-balance-stat-card">
			<div data-test="estimated-balance-stat-value">{{ value }}</div>
			<div v-if="label" data-test="estimated-balance-stat-label">{{ label }}</div>
			<slot name="label" />
		</div>
	`,
}

const QuestionTooltipStub = {
	name: 'QuestionTooltip',
	template: '<div data-test="estimated-balance-tooltip"><slot /></div>',
}

describe('Streamer Wallet overview EstimatedBalance', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(EstimatedBalance, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					StatCard: StatCardStub,
					QuestionTooltip: QuestionTooltipStub,
				},
			},
		})

		const walletStore = useWalletStore()
		const appStore = useAppStore()

		appStore.appLocale = Locale.EN
		walletStore.wallet = { ...walletDataTochka } as any

		return { wrapper, walletStore, appStore }
	}

	it('does not render when wallet is null', async () => {
		const { wrapper, walletStore } = factory()

		walletStore.wallet = null
		await nextTick()

		expect(wrapper.find('[data-test="wallet-balance-estimated-balance"]').exists()).toBe(false)
	})

	it('renders two StatCard blocks and formatted values', async () => {
		const { wrapper } = factory()
		await nextTick()

		const cards = wrapper.findAll('[data-test="estimated-balance-stat-card"]')
		expect(cards).toHaveLength(2) // audited card hidden when LINK_ENABLED=false

		const values = wrapper.findAll('[data-test="estimated-balance-stat-value"]').map(x => x.text())
		expect(values).toContain(`formatted-${walletDataTochka.earnings.estimated}-${walletDataTochka.currency}`)
		expect(values).toContain(`formatted-${walletDataTochka.cpaAmountReview}-${walletDataTochka.currency}`)
	})

	it('passes current month into estimated earnings label', async () => {
		const { wrapper, appStore } = factory()
		appStore.appLocale = Locale.EN
		await nextTick()

		const month = moment().locale(Locale.EN).format('MMMM')
		expect(wrapper.text()).toContain(`wallet.balance.estimatedEarnings.label:${month}`)
	})
})

