import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormTitle from '../FormTitle.vue'

const mockElInput = {
	name: 'ElInput',
	template: '<div class="mock-input"></div>',
	props: ['modelValue', 'placeholder', 'maxlength', 'showWordLimit', 'size'],
	emits: ['update:modelValue'],
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div class="mock-form-item"><slot /></div>',
	props: ['label', 'prop'],
}

describe('FormTitle Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormTitle, {
			global: {
				plugins: [i18n],
				stubs: {
					ElInput: mockElInput,
					ElFormItem: mockElFormItem,
				},
			},
			props: {
				modelValue: {
					title: {
						default: '',
					},
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided title', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Test Adset Title',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('Test Adset Title')
	})

	it('emits update event when title changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', {
			title: {
				default: 'New Adset Title',
			},
		})

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ title: { default: 'New Adset Title' } })
	})

	it('preserves existing title when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Existing Title',
				},
			},
		})

		await wrapper.setProps({
			modelValue: {
				title: {
					default: 'Existing Title',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('Existing Title')
	})

	it('handles empty title', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: '',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('')
	})

	it('handles title with alternative field', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Main Title',
					alternative: 'Alt Title',
				},
			},
		})

		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs[0].props('modelValue')).toBe('Main Title')
	})
})
