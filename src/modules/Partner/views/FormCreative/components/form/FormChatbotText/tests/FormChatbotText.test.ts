import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'

import FormChatbotText from '../FormChatbotText.vue'

describe('FormChatbotText Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormChatbotText, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					chatbotText: '',
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided chatbotText value', () => {
		const { wrapper } = factory({
			modelValue: {
				chatbotText: 'Test chatbot message',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Test chatbot message')
	})

	it('emits update event when chatbotText changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', { chatbotText: 'New message' })

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ chatbotText: 'New message' })
	})

	it('preserves chatbotText value on rerender', async () => {
		const { wrapper } = factory({
			modelValue: {
				chatbotText: 'Preserved message',
			},
		})

		await wrapper.setProps({
			modelValue: {
				chatbotText: 'Preserved message',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Preserved message')
	})

	it('handles empty chatbotText correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				chatbotText: '',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('handles long text correctly', () => {
		const longText = 'A'.repeat(150) // Exactly 150 characters
		const { wrapper } = factory({
			modelValue: {
				chatbotText: longText,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(longText)
	})

	it('has correct textarea configuration', () => {
		const { wrapper } = factory()

		const input = wrapper.findComponent(ElInput)
		expect(input.props('type')).toBe('textarea')
		expect(input.props('size')).toBe('large')
		expect(input.props('showWordLimit')).toBe(true)
		expect(input.props('autosize')).toEqual({ minRows: 4 })
	})

	it('updates when chatbotText value changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				chatbotText: 'Initial text',
			},
		})

		await wrapper.setProps({
			modelValue: {
				chatbotText: 'Updated text',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Updated text')
	})

	it('handles multiline text correctly', () => {
		const multilineText = 'Line 1\nLine 2\nLine 3'
		const { wrapper } = factory({
			modelValue: {
				chatbotText: multilineText,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(multilineText)
	})
})
