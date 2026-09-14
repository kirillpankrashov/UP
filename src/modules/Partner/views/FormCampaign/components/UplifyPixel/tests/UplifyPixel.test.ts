import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'

import UplifyPixel from '../UplifyPixel.vue'

const mockElInput = {
	name: 'ElInput',
	template: '<div class="mock-input"></div>',
	props: ['value', 'disabled', 'size'],
}

const mockCopyLink = {
	name: 'CopyLink',
	template: '<div class="mock-copy-link"></div>',
	props: ['link', 'label'],
}

describe('UplifyPixel Component', () => {
	const factory = () => {
		const wrapper = mount(UplifyPixel, {
			global: {
				plugins: [i18n],
				stubs: {
					ElInput: mockElInput,
					CopyLink: mockCopyLink,
				},
			},
		})

		return { wrapper }
	}

	it('displays correct pixel code in the input field', () => {
		const { wrapper } = factory()

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('value')).toBe('<img src="https://www.uplify.us/pixel/action?visit_id={{uplify_id}}">')
		expect(input.props('disabled')).toBe(true)
	})

	it('passes correct link to the CopyLink component', () => {
		const { wrapper } = factory()

		const copyLink = wrapper.findComponent({ name: 'CopyLink' })
		expect(copyLink.props('link')).toBe('<img src="https://www.uplify.us/pixel/action?visit_id={{uplify_id}}">')
	})

	it('computes the pixel value correctly', () => {
		const { wrapper } = factory()

		// Проверяем вычисляемое свойство pixel
		const pixelValue = '<img src="https://www.uplify.us/pixel/action?visit_id={{uplify_id}}">'
		expect(wrapper.vm.pixel).toBe(pixelValue)
	})
})
