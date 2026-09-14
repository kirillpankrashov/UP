import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import StreamerDayLimit from '../StreamerDayLimit.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Streamer Campaigns AdsetCard Indicators BrandAwareness StreamerDayLimit', () => {
	const factory = (props = {}) => {
		return mount(StreamerDayLimit, {
			global: {
				plugins: [i18n],
				stubs: {
					QuestionTooltip: true,
				},
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})
	}

	it('renders streamer day limit label and value when both values are present', () => {
		const wrapper = factory({
			streamerDayLimit: 10,
			streamerDayLimitShown: 5,
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-streamer-day-limit"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.streamerDayLimit')
		expect(wrapper.text()).toContain('5 campaignRow.of 10')
	})

	it('does not render when streamer day limit is null', () => {
		const wrapper = factory({
			streamerDayLimit: null,
			streamerDayLimitShown: 5,
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-streamer-day-limit"]').exists()).toBe(false)
	})

	it('does not render when streamer day limit shown is null', () => {
		const wrapper = factory({
			streamerDayLimit: 10,
			streamerDayLimitShown: null,
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-streamer-day-limit"]').exists()).toBe(false)
	})
})
