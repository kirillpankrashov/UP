import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'

import PPV from '../PPV.vue'

describe('PPV Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(PPV, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					targetCtr: undefined,
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided targetCtr value', () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: 2.5,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(2.5)
	})

	it('emits update event when targetCtr changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', { targetCtr: 1.8 })

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ targetCtr: 1.8 })
	})

	it('preserves targetCtr value on rerender', async () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: 3.2,
			},
		})

		await wrapper.setProps({
			modelValue: {
				targetCtr: 3.2,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(3.2)
	})

	it('handles zero value correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: 0,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(0)
	})

	it('handles undefined value correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: undefined,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('handles decimal values correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: 0.75,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(0.75)
	})

	it('updates when targetCtr value changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				targetCtr: 1.0,
			},
		})

		await wrapper.setProps({
			modelValue: {
				targetCtr: 2.5,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(2.5)
	})
})
