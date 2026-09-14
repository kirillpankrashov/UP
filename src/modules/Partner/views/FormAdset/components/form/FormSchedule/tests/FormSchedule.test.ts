import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormSchedule from '../FormSchedule.vue'

vi.mock('moment', () => {
	return {
		default: vi.fn(() => ({
			format: () => '01.01.2023',
			add: () => ({
				format: () => '02.01.2023',
			}),
			startOf: () => ({
				valueOf: () => 1672531200000, // 2023-01-01
			}),
			endOf: () => ({
				valueOf: () => 1672531200000,
			}),
		})),
	}
})

describe('FormSchedule Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormSchedule, {
			global: {
				plugins: [i18n],
				stubs: ['ElDatePicker', 'ElFormItem'],
			},
			props: {
				modelValue: {
					dates: {
						start: undefined,
						end: undefined,
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

	it('initializes with provided dates', async () => {
		const { wrapper } = factory({
			modelValue: {
				dates: {
					start: '10.01.2023',
					end: '20.01.2023',
				},
			},
		})

		expect(wrapper.props('modelValue')).toEqual({
			dates: {
				start: '10.01.2023',
				end: '20.01.2023',
			},
		})
	})

	it('updates model when dates change', async () => {
		const { wrapper } = factory()

		await wrapper.setProps({
			modelValue: {
				dates: {
					start: '15.01.2023',
					end: '25.01.2023',
				},
			},
		})

		expect(wrapper.props('modelValue')).toEqual({
			dates: {
				start: '15.01.2023',
				end: '25.01.2023',
			},
		})
	})

	it('handles model updates correctly', async () => {
		const { wrapper } = factory()

		const updatedModel = {
			dates: {
				start: '15.01.2023',
				end: '25.01.2023',
			},
		}

		await wrapper.vm.$emit('update:modelValue', updatedModel)

		const emits = wrapper.emitted('update:modelValue')
		expect(emits).toBeTruthy()
		expect(emits?.[0]?.[0]).toEqual(updatedModel)
	})
})
