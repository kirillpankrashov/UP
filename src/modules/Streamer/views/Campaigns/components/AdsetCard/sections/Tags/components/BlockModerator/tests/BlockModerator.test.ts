import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdsetBlockReason } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import BlockModerator from '../BlockModerator.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('BlockModerator Component', () => {
	const factory = (props = {}) => {
		return mount(BlockModerator, {
			global: {
				plugins: [i18n],
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

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-moderator"]').exists()).toBe(false)
	})

	it('does not render when blocked for different reason', () => {
		const wrapper = factory({
			blocked: {
				reason: AdsetBlockReason.LOW_CTR,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-moderator"]').exists()).toBe(false)
	})

	it('renders when blocked by moderator', () => {
		const wrapper = factory({
			blocked: {
				reason: AdsetBlockReason.MODERATOR,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-moderator"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.reasons.moderator')
	})

	it('updates visibility when block reason changes', async () => {
		const wrapper = factory()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-moderator"]').exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				blocked: {
					reason: AdsetBlockReason.MODERATOR,
					at: '2024-12-31',
					until: '2025-01-01',
				},
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-block-moderator"]').exists()).toBe(true)
	})
})
