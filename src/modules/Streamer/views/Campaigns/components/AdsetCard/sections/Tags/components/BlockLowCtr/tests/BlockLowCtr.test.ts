import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdsetBlockReason } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import BlockLowCtr from '../BlockLowCtr.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => {
			if (key === 'campaignRow.reasons.lowCTRLink.href') return 'https://example.com'
			return key
		},
	}),
}))

describe('BlockLowCtr Component', () => {
	const factory = (props = {}) => {
		return mount(BlockLowCtr, {
			global: {
				plugins: [i18n],
				stubs: {
					LinkIcon: true,
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

	it('does not render when adset is not blocked', () => {
		const wrapper = factory()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-low-ctr"]').exists()).toBe(false)
	})

	it('does not render when blocked for different reason', () => {
		const wrapper = factory({
			blocked: {
				reason: AdsetBlockReason.MODERATOR,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-low-ctr"]').exists()).toBe(false)
	})

	it('renders when blocked for low CTR', () => {
		const wrapper = factory({
			blocked: {
				reason: AdsetBlockReason.LOW_CTR,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-low-ctr"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.reasons.lowCTR')
	})

	it('displays link with correct href and text', () => {
		const wrapper = factory({
			blocked: {
				reason: AdsetBlockReason.LOW_CTR,
			},
		})

		const link = wrapper.find('a')
		expect(link.exists()).toBe(true)
		expect(link.attributes('href')).toBe('https://example.com')
		expect(link.attributes('target')).toBe('_blank')
		expect(link.text()).toContain('campaignRow.reasons.lowCTRLink.text')
	})

	it('updates visibility when block reason changes', async () => {
		const wrapper = factory()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-low-ctr"]').exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				blocked: {
					reason: AdsetBlockReason.LOW_CTR,
					at: '2024-12-31',
					until: '2025-01-01',
				},
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-low-ctr"]').exists()).toBe(true)
	})
})
