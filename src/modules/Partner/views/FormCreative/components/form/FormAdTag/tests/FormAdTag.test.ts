import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormAdTag from '../FormAdTag.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="mock-form-item"><slot /></div>',
	props: ['label', 'prop'],
}

const mockElInput = {
	name: 'ElInput',
	template: '<textarea v-bind="$attrs" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)"></textarea>',
	props: ['modelValue', 'placeholder', 'type', 'size', 'autosize'],
	emits: ['update:modelValue'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

describe('FormAdTag Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormAdTag, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
				},
			},
			props: {
				modelValue: {
					scriptCode: '',
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders component with correct structure', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="creative-ad-tag-root"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="creative-ad-tag-form-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="creative-ad-tag-input"]').exists()).toBe(true)
	})

	it('initializes with provided scriptCode value', () => {
		const { wrapper } = factory({
			modelValue: {
				scriptCode: '<script>console.log("test")</script>',
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('<script>console.log("test")</script>')
	})

	it('updates model when input value changes', async () => {
		const { wrapper } = factory()

		const input = wrapper.find('[data-test="creative-ad-tag-input"]')
		const newValue = '<script>alert("updated")</script>'

		await input.setValue(newValue)

		expect(wrapper.props('modelValue').scriptCode).toBe(newValue)
	})

	it('sets correct input properties', () => {
		const { wrapper } = factory()

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('type')).toBe('textarea')
		expect(input.props('size')).toBe('large')
		expect(input.props('autosize')).toEqual({ minRows: 4 })
		expect(input.props('placeholder')).toBe('creative.form.adtag.placeholder')
	})

	it('handles empty scriptCode', () => {
		const { wrapper } = factory({
			modelValue: {
				scriptCode: '',
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('')
	})

	it('handles multiline script code', async () => {
		const multilineScript = `<script>
  function test() {
    console.log("multiline");
  }
</script>`

		const { wrapper } = factory()
		const input = wrapper.find('[data-test="creative-ad-tag-input"]')

		await input.setValue(multilineScript)

		expect(wrapper.props('modelValue').scriptCode).toBe(multilineScript)
	})
})
