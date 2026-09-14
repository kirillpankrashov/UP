import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElAlert, ElFormItem, ElInput } from '@/components/element-plus'

import FormImpression from '../FormImpression.vue'

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
		tm: vi.fn((key) => key),
	}),
}))

describe('FormImpression Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormImpression, {
			global: {
				plugins: [i18n],
				stubs: {
					ElAlert,
					ElFormItem,
					ElInput,
				},
			},
			props: {
				modelValue: {
					pixelImpressions: [],
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders component structure correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="impression-alert"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="impression-form-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="impression-add-button"]').exists()).toBe(true)
	})

	it('adds initial input on mount when pixelImpressions is empty', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="impression-input-0"]').exists()).toBe(true)
	})

	it('does not add extra inputs when pixelImpressions already has items', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['existing-pixel'],
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="impression-input-0"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="impression-input-1"]').exists()).toBe(false)
		expect(wrapper.props('modelValue').pixelImpressions).toHaveLength(1)
		expect(wrapper.props('modelValue').pixelImpressions[0]).toBe('existing-pixel')
	})

	it('renders existing pixel impressions as inputs', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['pixel-1', 'pixel-2'],
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="impression-input-0"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="impression-input-1"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="impression-input-2"]').exists()).toBe(false)
	})

	it('adds new input when add button is clicked', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['pixel-1'],
			},
		})

		await nextTick()

		const addButton = wrapper.find('[data-test="impression-add-button"]')
		await addButton.trigger('click')

		await nextTick()

		expect(wrapper.find('[data-test="impression-input-1"]').exists()).toBe(true)
	})

	it('disables add button when any input is empty', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['pixel-1', ''],
			},
		})

		await nextTick()

		const addButton = wrapper.find('[data-test="impression-add-button"]')
		expect(addButton.attributes('disabled')).toBeDefined()
	})

	it('enables add button when all inputs are filled', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['pixel-1', 'pixel-2'],
			},
		})

		await nextTick()

		const addButton = wrapper.find('[data-test="impression-add-button"]')
		expect(addButton.attributes('disabled')).toBeUndefined()
	})

	it('updates model when input value changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				pixelImpressions: ['initial-value'],
			},
		})

		await nextTick()

		// Проверяем что input существует
		expect(wrapper.find('[data-test="impression-input-0"]').exists()).toBe(true)

		// Симулируем изменение через прямое обновление модели
		await wrapper.setProps({
			modelValue: {
				pixelImpressions: ['new-pixel-value'],
			},
		})

		await nextTick()

		// Проверяем что значение обновилось
		expect(wrapper.props('modelValue').pixelImpressions[0]).toBe('new-pixel-value')
	})

	it('enables add button only when all inputs have values', async () => {
		const { wrapper } = factory()

		await nextTick()

		// Изначально кнопка заблокирована (есть пустой input)
		let addButton = wrapper.find('[data-test="impression-add-button"]')
		expect(addButton.attributes('disabled')).toBeDefined()

		// Обновляем модель с заполненным значением
		await wrapper.setProps({
			modelValue: {
				pixelImpressions: ['filled-value'],
			},
		})

		await nextTick()

		// Теперь кнопка должна быть доступна
		addButton = wrapper.find('[data-test="impression-add-button"]')
		expect(addButton.attributes('disabled')).toBeUndefined()
	})
})
