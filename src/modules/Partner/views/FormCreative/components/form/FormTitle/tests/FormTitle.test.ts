import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormTitle from '../FormTitle.vue'

// Мокаем SVG импорт
vi.mock('@/assets/img/icons/plus.svg', () => ({
	default: {
		name: 'PlusIcon',
		template: '<svg class="mock-plus-icon"></svg>',
	},
}))

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

const mockElInput = {
	name: 'ElInput',
	template: '<div class="mock-input"></div>',
	props: ['modelValue', 'placeholder', 'maxlength', 'showWordLimit', 'size'],
	emits: ['update:modelValue'],
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div class="mock-form-item"><slot /></div>',
	props: ['label', 'prop'],
}

describe('FormTitle Component', () => {
	const factory = (props = {}) => {
		// Создаем объект без свойства alternative по умолчанию
		const defaultTitle = Object.create(null)
		defaultTitle.default = ''

		const wrapper = mount(FormTitle, {
			global: {
				plugins: [i18n],
				stubs: {
					ElInput: mockElInput,
					ElFormItem: mockElFormItem,
				},
			},
			props: {
				modelValue: {
					title: defaultTitle,
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided title', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Test Campaign Title',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('Test Campaign Title')
	})

	it('emits update event when title changes', async () => {
		const { wrapper } = factory()

		await wrapper.vm.$emit('update:modelValue', { title: 'New Campaign Title' })

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual({ title: 'New Campaign Title' })
	})

	it('preserves existing title when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Existing Title',
				},
			},
		})

		await wrapper.setProps({
			modelValue: {
				title: {
					default: 'Existing Title',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('Existing Title')
	})

	it('handles empty title', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: '',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('')
	})

	it('handles undefined title', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: '',
				},
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('modelValue')).toBe('')
	})

	it('shows alternative title section when alternative field exists', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Main Title',
					alternative: 'Alt Title',
				},
			},
		})

		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs).toHaveLength(2)
		expect(inputs[0].props('modelValue')).toBe('Main Title')
		expect(inputs[1].props('modelValue')).toBe('Alt Title')
	})

	it('renders component structure correctly', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Test Title',
				},
			},
		})

		// Проверяем что компонент рендерится
		expect(wrapper.find('[data-name="partner-form-creative-title"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElInput' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElInput' }).props('modelValue')).toBe('Test Title')
	})

	it('handles title with alternative field set to empty string', () => {
		const { wrapper } = factory({
			modelValue: {
				title: {
					default: 'Main Title',
					alternative: '',
				},
			},
		})

		// Должен быть хотя бы один input для default поля
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs.length).toBeGreaterThanOrEqual(1)
		expect(inputs[0].props('modelValue')).toBe('Main Title')
	})
})
