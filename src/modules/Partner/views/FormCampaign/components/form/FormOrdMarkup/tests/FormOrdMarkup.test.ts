import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElFormItem, ElInput } from '@/components/element-plus'

import FormOrdMarkup from '../FormOrdMarkup.vue'

describe('FormOrdMarkup Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormOrdMarkup, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					ordMarkup: '',
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders component correctly', () => {
		const { wrapper } = factory()
		expect(wrapper.find('[data-name="partner-form-campaign-ord-markup"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
		expect(wrapper.findComponent(ElInput).exists()).toBe(true)
	})

	it('sets placeholder for ElInput', () => {
		const { wrapper } = factory()
		const input = wrapper.findComponent(ElInput)
		expect(input.props('placeholder')).toBeDefined()
	})

	it('initializes with provided ordMarkup', () => {
		const { wrapper } = factory({
			modelValue: {
				ordMarkup: 'test-markup',
			},
		})
		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('test-markup')
	})

	it('emits update event when ordMarkup changes', async () => {
		const { wrapper } = factory()
		await wrapper.vm.$emit('update:modelValue', { ordMarkup: 'new-value' })
		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ ordMarkup: 'new-value' })
	})

	it('preserves existing ordMarkup when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				ordMarkup: 'existing',
			},
		})
		await wrapper.setProps({
			modelValue: {
				ordMarkup: 'existing',
			},
		})
		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('existing')
	})

	it('handles empty ordMarkup', () => {
		const { wrapper } = factory({
			modelValue: {
				ordMarkup: '',
			},
		})
		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('handles undefined ordMarkup', () => {
		const { wrapper } = factory({
			modelValue: {
				ordMarkup: undefined,
			},
		})
		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})
})
