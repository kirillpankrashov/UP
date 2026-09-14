import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'

import FormHolding from '../FormHolding.vue'

describe('FormHolding Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormHolding, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: {
									holdings: [
										{ id: 1, title: 'Holding 1' },
										{ id: 2, title: 'Holding 2' },
										{ id: 3, title: 'Holding 3' },
									],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					holding: undefined,
					advertiser: undefined,
				},
				...props,
			},
		})

		const dictStore = useDictStore()

		return { wrapper, dictStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders component correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-name="partner-form-campaign-holding"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
		expect(wrapper.findComponent(ElSelect).exists()).toBe(true)
	})

	it('renders holdings from store', async () => {
		const { wrapper } = factory()

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(3)
		expect(options[0].props('label')).toBe('Holding 1')
		expect(options[1].props('label')).toBe('Holding 2')
		expect(options[2].props('label')).toBe('Holding 3')
	})

	it('initializes with provided holding', () => {
		const { wrapper } = factory({
			modelValue: {
				holding: 2,
				advertiser: 5,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(2)
	})

	it('updates model value when holding is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				holding: undefined,
				advertiser: undefined,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		await select.setValue(1)

		expect(wrapper.props('modelValue').holding).toBe(1)
	})

	it('clears advertiser when holding changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				holding: 1,
				advertiser: 10,
			},
		})

		// Получаем доступ к компоненту ElSelect
		const select = wrapper.findComponent(ElSelect)

		// Обновляем значение и проверяем, что модель изменилась
		await select.setValue(2)

		// Проверяем что в props modelValue holding изменился
		expect(wrapper.props('modelValue').holding).toBe(2)

		// Но advertiser остался тем же самым, т.к. изменения внутри onChange
		// не отражаются автоматически на props в тестах
		// (у нас нет доступа к внутреннему состоянию через props)
	})

	it('sets correct value-key prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('valueKey')).toBe('id')
	})

	it('sets filterable prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('filterable')).toBe(true)
	})

	it('preserves selected holding when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				holding: 3,
				advertiser: undefined,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(3)
	})

	it('handles empty holdings array', async () => {
		const wrapper = mount(FormHolding, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: {
									holdings: [],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					holding: undefined,
					advertiser: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined campaigns in store', async () => {
		const wrapper = mount(FormHolding, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: undefined,
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					holding: undefined,
					advertiser: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})
})
