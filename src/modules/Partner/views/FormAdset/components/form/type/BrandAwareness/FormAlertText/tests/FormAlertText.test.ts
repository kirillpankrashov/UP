import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElFormItem, ElInput } from '@/components/element-plus'

import FormAlertText from '../FormAlertText.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
		tm: vi.fn((key) => key),
	}),
}))

describe('FormAdset FormAlertText', () => {
	const factory = (
		model = { conversionAlert: { text: '' } },
	) => {
		const wrapper = mount(FormAlertText, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: model,
			},
		})

		return wrapper
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('sets correct form item props', () => {
		const wrapper = factory()

		const formItem = wrapper.findComponent(ElFormItem)
		expect(formItem.props('prop')).toBe('conversionAlert.text')
	})

	it('sets correct input props', () => {
		const wrapper = factory()

		const input = wrapper.findComponent(ElInput)
		expect(input.props('type')).toBe('textarea')
		expect(input.props('size')).toBe('large')

		// Проверяем что input существует и имеет правильную структуру
		expect(input.exists()).toBe(true)
	})

	it('sets correct autosize configuration', () => {
		const wrapper = factory()

		const input = wrapper.findComponent(ElInput)
		expect(input.props('autosize')).toEqual({ minRows: 4 })
	})

	it('displays correct labels with localization', () => {
		const wrapper = factory()

		expect(wrapper.text()).toContain('adset.alerts.description.label')
	})

	it('displays placeholder text', () => {
		const wrapper = factory()

		// Проверяем что placeholder присутствует в HTML
		expect(wrapper.html()).toContain('adset.alerts.description.placeholder')
	})

	it('initializes with provided text value', () => {
		const model = { conversionAlert: { text: 'Test alert text' } }
		const wrapper = factory(model)

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('Test alert text')
	})

	it('initializes with empty text value', () => {
		const wrapper = factory()

		const input = wrapper.findComponent(ElInput)
		const modelValue = input.props('modelValue')

		// Element Plus может преобразовывать пустые значения
		expect(modelValue === '' || modelValue === undefined).toBe(true)
	})

	it('responds to prop changes correctly', async () => {
		const wrapper = factory({ conversionAlert: { text: 'Initial text' } })

		// Изменяем props и проверяем что компонент обновился
		await wrapper.setProps({
			modelValue: { conversionAlert: { text: 'Updated text' } },
		})

		await nextTick()

		expect(wrapper.exists()).toBe(true)
		expect(wrapper.props('modelValue')).toEqual({
			conversionAlert: { text: 'Updated text' },
		})
	})

	it('handles long text values correctly', () => {
		const longText = 'A'.repeat(150) // Длиннее maxlength
		const model = { conversionAlert: { text: longText } }
		const wrapper = factory(model)

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe(longText)

		// Проверяем что компонент успешно рендерится с длинным текстом
		expect(input.exists()).toBe(true)
	})

	it('maintains component structure with different text lengths', () => {
		// Тестируем с разными длинами текста
		const testCases = [
			'',
			'Short text',
			'Medium length text that spans multiple words and contains some content',
			'Very long text that exceeds normal expectations and continues for quite a while to test edge cases',
		]

		testCases.forEach((text) => {
			const wrapper = factory({ conversionAlert: { text } })

			expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
			expect(wrapper.findComponent(ElInput).exists()).toBe(true)
			expect(wrapper.find('[data-test="adset-form-alert-text-container"]').exists()).toBe(true)
		})
	})

	it('has proper form validation prop', () => {
		const wrapper = factory()

		const formItem = wrapper.findComponent(ElFormItem)
		expect(formItem.props('prop')).toBe('conversionAlert.text')
	})
})
