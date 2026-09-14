import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletAnalyticsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Line from '../Line.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: vi.fn((amount: number, _compact: boolean, currency?: string) => `formatted-${amount}-${currency ?? 'none'}`),
	}),
}))

describe('Streamer Wallet Analytics Line', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const pinia = createTestingPinia({ createSpy: vi.fn })

		const streamerStore = useStreamerStore(pinia as any)
		const walletStore = useWalletStore(pinia as any)
		const analyticsStore = useWalletAnalyticsStore(pinia as any)

		streamerStore.profile = profileData as any
		walletStore.wallet = walletDataTipalti as any
		analyticsStore.data = [{
			date: '2026-01-01',
			brandAwareness: 10,
			cpaTargetActions: 20,
			extension: 30,
			freemium: 40,
			referral: 50,
			youtubeText: 60,
			performance: 0,
		}] as any

		const wrapper = mount(Line, {
			global: {
				plugins: [i18n, pinia],
			},
		})

		return { wrapper, streamerStore, walletStore, analyticsStore }
	}

	it('renders 5 categories (without freemium when LINK_ENABLED=false) with correct labels and sums', async () => {
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="wallet-analytics-line"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('wallet.analytics.source.title')

		// 5 rendered categories because LINK_ENABLED=false in src/core/consts.ts
		expect(wrapper.text()).toContain('wallet.analytics.categories.awareness')
		expect(wrapper.text()).toContain('wallet.analytics.categories.actions')
		expect(wrapper.text()).toContain('wallet.analytics.categories.extension')
		expect(wrapper.text()).toContain('wallet.analytics.categories.referrals')
		expect(wrapper.text()).toContain('wallet.analytics.categories.youtube_text')
		expect(wrapper.text()).not.toContain('wallet.analytics.categories.freemium')

		// Sums are formatted with wallet currency.
		expect(wrapper.text()).toContain(`formatted-10-${walletDataTipalti.currency}`)
		expect(wrapper.text()).toContain(`formatted-20-${walletDataTipalti.currency}`)
		expect(wrapper.text()).toContain(`formatted-30-${walletDataTipalti.currency}`)
		expect(wrapper.text()).toContain(`formatted-50-${walletDataTipalti.currency}`)
		expect(wrapper.text()).toContain(`formatted-60-${walletDataTipalti.currency}`)
	})

	it('calculates segment width percentages from totals (including freemium in denominator)', async () => {
		const { wrapper } = factory()
		await nextTick()

		// Segment bars are the top v-for blocks with `h-12 rounded`.
		const segments = wrapper.findAll('div.h-12.rounded')
		expect(segments).toHaveLength(5)

		// total = 10 + 20 + 30 + 40 + 50 + 60 = 210 (freemium included in total)
		const expectedPercents = [
			(10 * 100 / 210),
			(20 * 100 / 210),
			(30 * 100 / 210),
			(50 * 100 / 210),
			(60 * 100 / 210),
		]

		expectedPercents.forEach((percent, idx) => {
			const style = segments[idx].attributes('style') ?? ''
			const matchedPercent = style.match(/width:\s*calc\(([\d.]+)%\s*-\s*2px\)/)
			expect(matchedPercent).not.toBeNull()
			expect(Number(matchedPercent![1])).toBeCloseTo(percent, 4)
		})
	})
})

