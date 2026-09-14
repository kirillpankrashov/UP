import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormFormatSettings from '../FormFormatSettings.vue'

interface Model {
	duration: number | undefined
	frequency: number | undefined
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot name="label" /><slot /></div>',
	props: ['prop'],
}

const mockElInput = {
	name: 'ElInput',
	template: `
		<input
			data-test="el-input"
			:value="modelValue"
			@input="$emit('update:modelValue', Number($event.target.value))"
		/>
	`,
	props: ['modelValue', 'type', 'size'],
	emits: ['update:modelValue'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

describe('FormAdset SpecialProject FormFormatSettings Component', () => {
	const factory = (model: Model = { duration: undefined, frequency: undefined }) => {
		const wrapper = mount(FormFormatSettings, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
					QuestionTooltip: {
						name: 'QuestionTooltip',
						template: '<div data-test="question-tooltip"><slot /></div>',
					},
				},
			},
			props: {
				modelValue: model,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders container and both form items', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="adset-form-format-settings-container"]').exists()).toBe(true)
		expect(wrapper.findAll('[data-test="el-form-item"]')).toHaveLength(2)
	})

	it('renders two question tooltips', () => {
		const { wrapper } = factory()

		expect(wrapper.findAll('[data-test="question-tooltip"]')).toHaveLength(2)
	})

	it('renders both numeric inputs', () => {
		const { wrapper } = factory()

		expect(wrapper.findAll('[data-test="el-input"]')).toHaveLength(2)
	})

	it('updates frequency in model when first input changes', async () => {
		const { wrapper } = factory({ duration: undefined, frequency: undefined })

		const inputs = wrapper.findAll('[data-test="el-input"]')
		await inputs[0].setValue('7')
		await nextTick()

		expect((wrapper.props('modelValue') as Model).frequency).toBe(7)
	})

	it('updates duration in model when second input changes', async () => {
		const { wrapper } = factory({ duration: undefined, frequency: undefined })

		const inputs = wrapper.findAll('[data-test="el-input"]')
		await inputs[1].setValue('30')
		await nextTick()

		expect((wrapper.props('modelValue') as Model).duration).toBe(30)
	})

	it('shows provided model values in inputs', async () => {
		const { wrapper } = factory({ duration: 60, frequency: 5 })
		await nextTick()

		const inputs = wrapper.findAll<HTMLInputElement>('[data-test="el-input"]')
		expect(inputs[0].element.value).toBe('5')
		expect(inputs[1].element.value).toBe('60')
	})
})
