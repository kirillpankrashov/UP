import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'

import CPA from '../CPA.vue'

describe('CPA Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(CPA, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					targetEvr: undefined,
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided targetEvr', () => {
		const { wrapper } = factory({
			modelValue: {
				targetEvr: 1.5,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(1.5)
	})

	it('emits update event when targetEvr changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', { targetEvr: 2.0 })

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ targetEvr: 2.0 })
	})

	it('preserves existing targetEvr when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				targetEvr: 0.75,
			},
		})

		await wrapper.setProps({
			modelValue: {
				targetEvr: 0.75,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(0.75)
	})

	it('handles zero value', () => {
		const { wrapper } = factory({
			modelValue: {
				targetEvr: 0,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(0)
	})

	it('handles undefined targetEvr', () => {
		const { wrapper } = factory({
			modelValue: {
				targetEvr: undefined,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('renders prefix template with percentage symbol', () => {
		const { wrapper } = factory()

		const prefixSpan = wrapper.find('.text-gray')
		expect(prefixSpan.exists()).toBe(true)
		expect(prefixSpan.text()).toContain('%')
	})
})
