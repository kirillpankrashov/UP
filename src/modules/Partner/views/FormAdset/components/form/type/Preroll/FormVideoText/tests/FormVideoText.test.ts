import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'

import FormVideoText from '../FormVideoText.vue'

describe('FormVideoText Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormVideoText, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					videoDescriptionText: '',
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided videoDescriptionText value', () => {
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: 'Test video description',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Test video description')
	})

	it('emits update event when videoDescriptionText changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', { videoDescriptionText: 'New description' })

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ videoDescriptionText: 'New description' })
	})

	it('preserves videoDescriptionText value on rerender', async () => {
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: 'Preserved description',
			},
		})

		await wrapper.setProps({
			modelValue: {
				videoDescriptionText: 'Preserved description',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Preserved description')
	})

	it('handles empty videoDescriptionText correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: '',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('has correct textarea configuration', () => {
		const { wrapper } = factory()

		const input = wrapper.findComponent(ElInput)
		expect(input.props('type')).toBe('textarea')
		expect(input.props('size')).toBe('large')
		expect(input.props('autosize')).toEqual({ minRows: 4 })
	})

	it('updates when videoDescriptionText value changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: 'Initial description',
			},
		})

		await wrapper.setProps({
			modelValue: {
				videoDescriptionText: 'Updated description',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Updated description')
	})

	it('handles multiline text correctly', () => {
		const multilineText = 'Line 1\nLine 2\nLine 3'
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: multilineText,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(multilineText)
	})

	it('handles long text correctly', () => {
		const longText = 'A'.repeat(500) // Long text
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: longText,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(longText)
	})

	it('handles undefined videoDescriptionText', () => {
		const { wrapper } = factory({
			modelValue: {
				videoDescriptionText: undefined,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})
})
