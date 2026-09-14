import { h, nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { analyticsData } from '@/modules/Streamer/views/Wallet/api/getAnalytics/fixtures/analyticsData'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletAnalyticsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Graph from '../Graph.vue'

let lastBarProps: any = null

vi.mock('vue-chartjs', () => ({
	Bar: {
		name: 'Bar',
		props: ['options', 'data', 'width'],
		setup (props: any) {
			lastBarProps = props
			return () => h('div', { 'data-test': 'graph-bar' })
		},
	},
}))

vi.mock('chart.js', () => ({
	Chart: { register: vi.fn() },
	BarElement: {},
	CategoryScale: {},
	Legend: {},
	LinearScale: {},
	LineController: {},
	LineElement: {},
	Tooltip: {},
}))

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: vi.fn((amount: number, _compact: boolean, currency?: string) => `formatted-${amount}-${currency ?? 'none'}`),
	}),
}))

describe('Streamer Wallet Analytics Graph', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		lastBarProps = null
	})

	const factory = async () => {
		const pinia = createTestingPinia({ createSpy: vi.fn })

		const streamerStore = useStreamerStore(pinia as any)
		const walletStore = useWalletStore(pinia as any)
		const analyticsStore = useWalletAnalyticsStore(pinia as any)

		streamerStore.profile = profileData as any
		walletStore.wallet = walletDataTipalti as any
		analyticsStore.data = analyticsData.slice(0, 3) as any

		const wrapper = mount(Graph, {
			global: {
				plugins: [i18n, pinia],
				stubs: {},
			},
		})

		return { wrapper, streamerStore, walletStore, analyticsStore }
	}

	it('does not render graph bar when analytics data is empty', async () => {
		const Graph = (await import('../Graph.vue')).default
		const pinia = createTestingPinia({ createSpy: vi.fn })
		const analyticsStore = useWalletAnalyticsStore(pinia as any)
		const walletStore = useWalletStore(pinia as any)
		const streamerStore = useStreamerStore(pinia as any)

		streamerStore.profile = profileData as any
		walletStore.wallet = walletDataTipalti as any
		analyticsStore.data = []

		const wrapper = mount(Graph, {
			global: {
				plugins: [i18n, pinia],
			},
		})

		await nextTick()
		expect(wrapper.find('[data-test="graph-bar"]').exists()).toBe(false)
	})

	it('builds stacked bar datasets + tooltip callbacks', async () => {
		const { wrapper } = await factory()
		await nextTick()

		expect(wrapper.find('[data-test="graph-bar"]').exists()).toBe(true)
		expect(lastBarProps).not.toBeNull()

		const chartData = lastBarProps.data
		expect(chartData.labels).toEqual([1, 2, 3])

		const datasets = chartData.datasets
		expect(datasets).toHaveLength(5) // LINK_ENABLED=false in repo consts

		const labels = datasets.map((d: any) => d.label)
		expect(labels).toEqual([
			'wallet.analytics.categories.awareness',
			'wallet.analytics.categories.actions',
			'wallet.analytics.categories.extension',
			'wallet.analytics.categories.referrals',
			'wallet.analytics.categories.youtube_text',
		])

		// Verify first dataset values mapping.
		expect(datasets[0].data).toEqual(analyticsData.slice(0, 3).map(i => i.brandAwareness))

		const options = lastBarProps.options
		expect(typeof options.plugins.tooltip.callbacks.title).toBe('function')
		expect(typeof options.plugins.tooltip.callbacks.label).toBe('function')

		const titleCb = options.plugins.tooltip.callbacks.title
		const expectedTitle = (await import('moment')).default(analyticsData[0].date, 'YYYY-MM-DD').format('DD.MM')
		expect(titleCb([{ dataIndex: 0 }])).toBe(expectedTitle)

		const labelCb = options.plugins.tooltip.callbacks.label
		const currency = walletDataTipalti.currency
		const label = labelCb({ raw: 123 }, null)
		expect(label).toBe(`formatted-123-${currency}`)
	})
})

