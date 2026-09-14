import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'

import Preroll from '../Preroll.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Preroll Component', () => {
	const factory = (props = {}) => {
		return mount(Preroll, {
			global: {
				plugins: [i18n],
				stubs: {
					Status: true,
				},
			},
			props: {
				adset: {
					...prerollAdset,
					...props,
				},
			},
		})
	}

	it('does not render for closed adset', async () => {
		const wrapper = factory({
			status: 'close',
		})

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-preroll"]').exists()).toBe(false)
	})

	it('renders Status component for active adset', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'Status' }).exists()).toBe(true)
	})

	it('passes correct props to Status component', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()

		const status = wrapper.findComponent({ name: 'Status' })
		expect(status.props('adset')).toEqual(expect.objectContaining({
			...prerollAdset,
			status: 'active',
		}))
	})

	it('updates visibility when adset status changes', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()
		expect(wrapper.find('[data-name="campaigns-adset-card-tags-preroll"]').exists()).toBe(true)

		await wrapper.setProps({
			adset: {
				...prerollAdset,
				status: 'close',
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-preroll"]').exists()).toBe(false)
	})
})
