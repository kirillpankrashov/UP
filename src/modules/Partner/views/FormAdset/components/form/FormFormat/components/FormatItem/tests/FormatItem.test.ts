import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { AdFormat } from '@/core/types'
import { i18n } from '@/core/i18n'

import FormatItem from '../FormatItem.vue'

const baseItem = {
	id: AdFormat.FULLSCREEN,
	title: 'Video',
	description: 'Best for video ads',
	icon: 'icon.svg',
}

describe('FormAdset FormatItem', () => {
	it('renders root, title, description, and icon', () => {
		const wrapper = mount(FormatItem, {
			plugins: [i18n],
			props: {
				item: baseItem,
			},
		})
		expect(wrapper.find('[data-test="format-item-root"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="format-item-title"]').text()).toBe('Video')
		expect(wrapper.find('[data-test="format-item-description"]').text()).toBe('Best for video ads')
		expect(wrapper.find('[data-test="format-item-icon"]').attributes('src')).toBe('icon.svg')
	})

	it('does not render icon if item.icon is falsy', () => {
		const wrapper = mount(FormatItem, {
			props: {
				item: { ...baseItem, icon: '' },
			},
		})
		expect(wrapper.find('[data-test="format-item-icon"]').exists()).toBe(false)
	})

	it('applies selected class if item.id === value', () => {
		const wrapper = mount(FormatItem, {
			props: {
				item: baseItem,
				value: AdFormat.FULLSCREEN,
			},
		})
		expect(wrapper.find('[data-test="format-item-root"]').classes()).toContain('border-primary')
	})

	it('applies disabled class if disabled', () => {
		const wrapper = mount(FormatItem, {
			props: {
				item: baseItem,
				disabled: true,
			},
		})
		const root = wrapper.find('[data-test="format-item-root"]')
		expect(root.classes()).toContain('pointer-events-none')
		expect(root.classes()).toContain('cursor-not-allowed')
	})

	it('emits update:value with item.id on click', async () => {
		const wrapper = mount(FormatItem, {
			props: {
				item: baseItem,
			},
		})
		await wrapper.find('[data-test="format-item-root"]').trigger('click')
		expect(wrapper.emitted('update:value')).toBeTruthy()
		expect(wrapper.emitted('update:value')![0][0]).toBe(AdFormat.FULLSCREEN)
	})
})
