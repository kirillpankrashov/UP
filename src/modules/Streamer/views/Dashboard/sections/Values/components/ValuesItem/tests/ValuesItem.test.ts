import { mount } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import { describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'

import ValuesItem from '../ValuesItem.vue'

describe('Streamer Dashboard Values ValuesItem', () => {
	const factory = (props: any) => {
		const wrapper = mount(ValuesItem, {
			global: {
				directives: {
					loading: ElLoadingDirective,
				},
				plugins: [i18n],
				stubs: ['router-link'],
			},
			props,
		})

		return { wrapper }
	}

	it('renders cash when cash prop is provided', () => {
		const { wrapper } = factory({
			cash: '100',
			caption: 'Test Caption',
		})

		expect(wrapper.find('[data-test="values-item-cash"]').text()).toBe('100')
	})

	it('renders link text and arrow when link prop is provided', () => {
		const linkText = 'Click Here'
		const link = { name: 'about' }

		const { wrapper } = factory({
			linkText,
			link,
			caption: 'Test Caption',
		})

		expect(wrapper.find('[data-test="values-item-link"]').exists()).toBe(true)
	})

	it('does not render cash when cash prop is not provided', () => {
		const { wrapper } = factory({
			caption: 'Test Caption',
		})

		expect(wrapper.find('[data-test="values-item-cash"]').exists()).toBe(false)
	})
})
