import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElFormItem, ElInput } from '@/components/element-plus'

import FormStreamerDayLimit from '../FormStreamerDayLimit.vue'

describe('FormAdset BrandAwareness FormStreamerDayLimit Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormStreamerDayLimit, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					streamerDayLimit: undefined,
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders localized label and placeholder', () => {
		const { wrapper } = factory()
		const formItem = wrapper.findComponent(ElFormItem)
		const input = wrapper.findComponent(ElInput)

		expect(formItem.props('label')).toBe('Daily limit of inserts on creator')
		expect(input.props('placeholder')).toBe('100')
	})

	it('sets number input constraints', () => {
		const { wrapper } = factory()
		const input = wrapper.findComponent(ElInput)
		const nativeInput = wrapper.find('input')

		expect(input.props('type')).toBe('number')
		expect(nativeInput.attributes('min')).toBe('1')
		expect(nativeInput.attributes('max')).toBe('255')
		expect(input.props('size')).toBe('large')
	})

	it('shows passed model value in input', () => {
		const { wrapper } = factory({
			modelValue: {
				streamerDayLimit: 42,
			},
		})
		const input = wrapper.findComponent(ElInput)

		expect(input.props('modelValue')).toBe(42)
	})

	it('updates model value when input changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				streamerDayLimit: undefined,
			},
		})
		const input = wrapper.findComponent(ElInput)

		await input.setValue('77')

		expect(wrapper.props('modelValue').streamerDayLimit).toBe('77')
	})
})
