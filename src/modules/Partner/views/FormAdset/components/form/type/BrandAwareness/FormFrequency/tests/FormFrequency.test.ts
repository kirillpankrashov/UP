import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdvertisingFrequency } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElFormItem, ElInput, ElOption, ElSelect } from '@/components/element-plus'

import FormFrequency from '../FormFrequency.vue'

describe('FormFrequency Component', () => {
	const mockFrequencies = [
		{ id: 1, title: 'Once per day' },
		{ id: 2, title: 'Twice per day' },
		{ id: 3, title: 'Three times per day' },
		{ id: AdvertisingFrequency.CUSTOM, title: 'Custom' },
	]

	const mockFrequencyPeriods = [
		{ id: 'hour', title: 'Hour' },
		{ id: 'day', title: 'Day' },
		{ id: 'week', title: 'Week' },
	]

	const factory = (props = {}, customState = {}) => {
		const initialState = {
			dict: {
				campaigns: {
					frequency: mockFrequencies,
					frequencyPeriods: mockFrequencyPeriods,
				},
			},
			...customState,
		}

		const wrapper = mount(FormFrequency, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState,
					}),
				],
			},
			props: {
				modelValue: {
					frequency: undefined,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders frequency options', async () => {
		const { wrapper } = factory()
		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(4)

		options.forEach((option, index) => {
			expect(option.props('value')).toBe(mockFrequencies[index].id)
			expect(option.props('label')).toBe(mockFrequencies[index].title)
		})
	})

	it('sets correct props for ElSelect', () => {
		const { wrapper } = factory()
		const select = wrapper.findComponent(ElSelect)

		expect(select.props('size')).toBe('large')
		expect(select.props('valueKey')).toBe('id')
		expect(select.props('filterable')).toBe(true)
		expect(select.props('placeholder')).toBeDefined()
	})

	it('disables select when disabled prop is true', () => {
		const { wrapper } = factory({ disabled: true })
		const select = wrapper.findComponent(ElSelect)
		expect(select.props('disabled')).toBe(true)
	})

	it('enables select when disabled prop is false', () => {
		const { wrapper } = factory({ disabled: false })
		const select = wrapper.findComponent(ElSelect)
		expect(select.props('disabled')).toBe(false)
	})

	it('updates model value when frequency is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				frequency: undefined,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		await select.setValue(2)
		await nextTick()

		expect(wrapper.props('modelValue').frequency).toBe(2)
	})

	it('preserves selected frequency when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				frequency: 3,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(3)
	})

	it('handles empty frequencies array', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: {
					frequency: [],
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined campaigns in store', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: undefined,
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined frequency in campaigns', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: {
					frequency: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	describe('Custom Frequency', () => {
		it('does not show custom fields when frequency is not CUSTOM', async () => {
			const { wrapper } = factory({
				modelValue: {
					frequency: 1,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
			})

			await nextTick()

			const formItems = wrapper.findAllComponents(ElFormItem)
			expect(formItems).toHaveLength(1) // Only the main frequency select
			expect(wrapper.findComponent(ElInput).exists()).toBe(false)
		})

		it('shows custom fields when frequency is CUSTOM', async () => {
			const { wrapper } = factory({
				modelValue: {
					frequency: AdvertisingFrequency.CUSTOM,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
			})

			await nextTick()

			const formItems = wrapper.findAllComponents(ElFormItem)
			expect(formItems).toHaveLength(3) // Main select + count input + period select

			const input = wrapper.findComponent(ElInput)
			expect(input.exists()).toBe(true)
			expect(input.props('type')).toBe('number')
			expect(input.props('size')).toBe('large')
		})

		it('renders frequency period options when CUSTOM is selected', async () => {
			const { wrapper } = factory({
				modelValue: {
					frequency: AdvertisingFrequency.CUSTOM,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
			})

			await nextTick()

			const selects = wrapper.findAllComponents(ElSelect)
			expect(selects).toHaveLength(2) // Main frequency select + period select

			const periodSelect = selects[1]
			expect(periodSelect.props('size')).toBe('large')
			expect(periodSelect.props('valueKey')).toBe('id')
			expect(periodSelect.props('filterable')).toBe(true)
		})

		// it('updates frequencyCount when input value changes', async () => {
		// 	const { wrapper } = factory({
		// 		modelValue: {
		// 			frequency: AdvertisingFrequency.CUSTOM,
		// 			frequencyCount: undefined,
		// 			frequencyPeriod: undefined,
		// 		},
		// 	})

		// 	await nextTick()

		// 	const input = wrapper.findComponent(ElInput)
		// 	await input.setValue(5)
		// 	await nextTick()

		// 	expect(wrapper.props('modelValue').frequencyCount).toBe(5)
		// })

		it('updates frequencyPeriod when period is selected', async () => {
			const { wrapper } = factory({
				modelValue: {
					frequency: AdvertisingFrequency.CUSTOM,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
			})

			await nextTick()

			const selects = wrapper.findAllComponents(ElSelect)
			const periodSelect = selects[1]
			await periodSelect.setValue('day')
			await nextTick()

			expect(wrapper.props('modelValue').frequencyPeriod).toBe('day')
		})

		it('preserves custom frequency values when rerendering', async () => {
			const { wrapper } = factory({
				modelValue: {
					frequency: AdvertisingFrequency.CUSTOM,
					frequencyCount: 10,
					frequencyPeriod: 'week',
				},
			})

			await nextTick()

			const input = wrapper.findComponent(ElInput)
			expect(input.props('modelValue')).toBe(10)

			const selects = wrapper.findAllComponents(ElSelect)
			const periodSelect = selects[1]
			expect(periodSelect.props('modelValue')).toBe('week')
		})

		it('disables period select when disabled prop is true', async () => {
			const { wrapper } = factory({
				disabled: true,
				modelValue: {
					frequency: AdvertisingFrequency.CUSTOM,
					frequencyCount: undefined,
					frequencyPeriod: undefined,
				},
			})

			await nextTick()

			const selects = wrapper.findAllComponents(ElSelect)
			const periodSelect = selects[1]
			expect(periodSelect.props('disabled')).toBe(true)
		})

		it('handles empty frequencyPeriods array', async () => {
			const { wrapper } = factory(
				{
					modelValue: {
						frequency: AdvertisingFrequency.CUSTOM,
						frequencyCount: undefined,
						frequencyPeriod: undefined,
					},
				},
				{
					dict: {
						campaigns: {
							frequency: mockFrequencies,
							frequencyPeriods: [],
						},
					},
				},
			)

			await nextTick()

			const options = wrapper.findAllComponents(ElOption)
			// Only frequency options, no period options
			expect(options).toHaveLength(4)
		})

		it('handles undefined frequencyPeriods in campaigns', async () => {
			const { wrapper } = factory(
				{
					modelValue: {
						frequency: AdvertisingFrequency.CUSTOM,
						frequencyCount: undefined,
						frequencyPeriod: undefined,
					},
				},
				{
					dict: {
						campaigns: {
							frequency: mockFrequencies,
							frequencyPeriods: undefined,
						},
					},
				},
			)

			await nextTick()

			const options = wrapper.findAllComponents(ElOption)
			// Only frequency options, no period options
			expect(options).toHaveLength(4)
		})

		it('hides custom fields when switching from CUSTOM to another frequency', async () => {
			const modelValue = {
				frequency: AdvertisingFrequency.CUSTOM as AdvertisingFrequency | number | undefined,
				frequencyCount: 5,
				frequencyPeriod: 'day',
			}

			const { wrapper } = factory({ modelValue })

			await nextTick()

			// Initially custom fields are visible
			expect(wrapper.findComponent(ElInput).exists()).toBe(true)
			expect(wrapper.findAllComponents(ElSelect)).toHaveLength(2)

			// Change frequency to non-custom
			await wrapper.setProps({
				modelValue: {
					...modelValue,
					frequency: AdvertisingFrequency.EVERY_15_MIN,
				},
			})
			await nextTick()

			// Custom fields should be hidden
			expect(wrapper.findComponent(ElInput).exists()).toBe(false)
			expect(wrapper.findAllComponents(ElSelect)).toHaveLength(1)
		})
	})
})
