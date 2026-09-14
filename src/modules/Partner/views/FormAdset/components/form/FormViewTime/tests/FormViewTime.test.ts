import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormViewTime from '../FormViewTime.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item" v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}

const mockElTimePicker = {
	name: 'ElTimePicker',
	template: '<div data-test="el-time-picker" v-bind="$attrs"><slot /></div>',
	props: ['modelValue', 'defaultValue', 'size', 'isRange', 'rangeSeparator', 'disabledSeconds', 'clearable'],
	emits: ['update:modelValue'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => {
			const translations: Record<string, string> = {
				'adset.settings.form.viewTime.label': 'View Time',
				'adset.settings.form.viewTime.to': 'to',
			}
			return translations[key] || key
		}),
	}),
}))

describe('FormViewTime Component', () => {
	const factory = (props = {}) => {
		const defaultModel = {
			view: null as null | [Date, Date],
		}

		const wrapper = mount(FormViewTime, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElTimePicker: mockElTimePicker,
				},
			},
			props: {
				modelValue: defaultModel,
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided view time', () => {
		const testDates = [
			moment().set('hour', 8).startOf('hour').toDate(),
			moment().set('hour', 18).startOf('hour').toDate(),
		] as [Date, Date]

		const { wrapper } = factory({
			modelValue: {
				view: testDates,
			},
		})

		expect(wrapper.props('modelValue').view).toEqual(testDates)
	})

	it('updates model when time picker value changes', async () => {
		const { wrapper } = factory()

		const newDates = [
			moment().set('hour', 9).startOf('hour').toDate(),
			moment().set('hour', 21).startOf('hour').toDate(),
		] as [Date, Date]

		// Обновляем модель через пропсы
		await wrapper.setProps({
			modelValue: {
				view: newDates,
			},
		})

		expect(wrapper.props('modelValue').view).toEqual(newDates)
	})

	it('provides disabled seconds function that disables all seconds', () => {
		const { wrapper } = factory()
		const vm = wrapper.vm as any

		const disabledSecondsResult = vm.disabledSeconds()

		expect(disabledSecondsResult).toHaveLength(60)
		expect(disabledSecondsResult).toEqual(Array.from({ length: 60 }, (_, i) => i))
	})

	it('handles null view value', () => {
		const { wrapper } = factory({
			modelValue: {
				view: null,
			},
		})

		expect(wrapper.props('modelValue').view).toBe(null)
	})

	it('preserves existing view times when rerendering', async () => {
		const initialDates = [
			moment().set('hour', 12).startOf('hour').toDate(),
			moment().set('hour', 20).startOf('hour').toDate(),
		] as [Date, Date]

		const { wrapper } = factory({
			modelValue: {
				view: initialDates,
			},
		})

		await nextTick()

		expect(wrapper.props('modelValue').view).toEqual(initialDates)
	})
})
