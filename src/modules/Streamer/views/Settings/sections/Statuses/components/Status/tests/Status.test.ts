import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTag } from '@/components/element-plus'

import Status from '../Status.vue'

describe('Streamer Settings Statuses Status', () => {
	const factory = (props: any) => {
		const wrapper = mount(Status, {
			global: {
				plugins: [i18n],
			},
			props,
		})

		return { wrapper }
	}

	it('renders the title and success correctly', async () => {
		const title = 'Test Title'
		const success = true

		const { wrapper } = factory({
			title,
			success,
		})

		await nextTick()

		expect(wrapper.text()).toContain(`${title}:`)
		expect(wrapper.findComponent(ElTag).props('type')).toBe('success')
		expect(wrapper.findComponent(ElTag).text()).toBe('ON')
	})

	it('renders the disabled state correctly', async () => {
		const title = 'Test Title'
		const success = false

		const { wrapper } = factory({
			title,
			success,
		})

		await nextTick()

		expect(wrapper.text()).toContain(`${title}:`)
		expect(wrapper.findComponent(ElTag).props('type')).toBe('danger')
		expect(wrapper.findComponent(ElTag).text()).toBe('OFF')
	})
})
