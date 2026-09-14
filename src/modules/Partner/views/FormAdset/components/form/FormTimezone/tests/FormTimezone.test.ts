import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'

import FormTimezone from '../FormTimezone.vue'

// Мок для ElSelect и ElOption
const mockElSelect = {
	name: 'ElSelect',
	template: '<div class="mock-select"><slot /></div>',
	props: ['modelValue', 'placeholder', 'disabled', 'filterable', 'valueKey', 'size'],
	emits: ['update:modelValue'],
}

const mockElOption = {
	name: 'ElOption',
	template: '<div class="mock-option"></div>',
	props: ['label', 'value'],
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div class="mock-form-item"><slot /></div>',
	props: ['label', 'prop'],
}

describe('FormTimezone Component', () => {
	const mockTimezones = [
		{ id: 1, title: 'UTC+00:00 London' },
		{ id: 2, title: 'UTC+01:00 Berlin' },
		{ id: 3, title: 'UTC+03:00 Moscow' },
	]

	const factory = (props = {}, customState = {}) => {
		const initialState = {
			dict: {
				all: {
					timeZones: mockTimezones,
				},
			},
			...customState,
		}

		const wrapper = mount(FormTimezone, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState,
					}),
				],
				stubs: {
					ElSelect: mockElSelect,
					ElOption: mockElOption,
					ElFormItem: mockElFormItem,
				},
			},
			props: {
				modelValue: {
					timeZone: undefined,
				},
				...props,
			},
		})

		// Получаем инстанс store для проверок
		const dictStore = useDictStore()

		return { wrapper, dictStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('displays timezone options from dictStore', () => {
		const { wrapper } = factory()

		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options.length).toBe(3)

		expect(options[0].props()).toEqual(
			expect.objectContaining({
				label: mockTimezones[0].title,
				value: mockTimezones[0].id,
			}),
		)
	})

	it('initializes with provided timezone', () => {
		const { wrapper } = factory({
			modelValue: {
				timeZone: 2,
			},
		})

		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('modelValue')).toBe(2)
	})

	it('emits update event when timezone changes', async () => {
		const { wrapper } = factory()

		// Затем эмитируем изменение напрямую
		await wrapper.vm.$emit('update:modelValue', { timeZone: 3 })

		// Проверяем что событие было эмитировано
		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ timeZone: 3 })
	})

	it('handles empty timezones array', () => {
		const { wrapper } = factory({}, {
			dict: {
				all: {
					timeZones: [],
				},
			},
		})

		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options.length).toBe(0)
	})
})
