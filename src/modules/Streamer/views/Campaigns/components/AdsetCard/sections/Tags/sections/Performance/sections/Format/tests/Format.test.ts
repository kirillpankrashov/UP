import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'

import Format from '../Format.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Performance Format', () => {
	const factory = (props = {}) => {
		return mount(Format, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...performanceAdset,
					...props,
				},
			},
		})
	}

	it('renders format tag', async () => {
		const wrapper = factory()

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-performance-format"]').exists()).toBe(true)
	})

	it('displays correct text', async () => {
		const wrapper = factory()

		await nextTick()

		expect(wrapper.text()).toContain('campaignRow.tags.extension')
	})

	it('has correct ElTag props', async () => {
		const wrapper = factory()

		await nextTick()

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			round: true,
		}))
	})
})
