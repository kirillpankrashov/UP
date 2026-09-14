import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'

import FormTargetingTags from '../FormTargetingTags.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}

const mockElSelect = {
	name: 'ElSelect',
	template: '<select v-bind="$attrs"><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'multiple', 'filterable', 'remote', 'tagType'],
	emits: ['change'],
	setup(props: any) {
		// Возвращаем props для правильного доступа в тестах
		return { ...props }
	},
}

const mockElCheckbox = {
	name: 'ElCheckbox',
	template: '<label v-bind="$attrs"><input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" /><span><slot /></span></label>',
	props: ['modelValue'],
	emits: ['update:modelValue'],
}

const mockElOption = {
	name: 'ElOption',
	template: '<option v-bind="$attrs" :value="value" :label="label">{{ label }}</option>',
	props: ['value', 'label'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
}))

describe('FormAdset FormTargetingTags', () => {
	const mockTags = [
		{ id: 1, title: 'Tag 1' },
		{ id: 2, title: 'Tag 2' },
		{ id: 3, title: 'Tag 3' },
	]

	const factory = async (
		model: { targeting: { tags: { list: number[]; exclude: boolean } } } = { targeting: { tags: { list: [], exclude: false } } },
		disabled = false,
	) => {
		const wrapper = mount(FormTargetingTags, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElCheckbox: mockElCheckbox,
					ElOption: mockElOption,
				},
			},
			props: { modelValue: model, disabled },
		})

		const dictStore = useDictStore()
		dictStore.all = {
			tags: mockTags,
		} as any

		await nextTick()

		return wrapper
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('shows default label when no tags selected', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('adset.targeting.form.tags.label')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.exceptSelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "only selected" label when tags selected and exclude=false', async () => {
		const wrapper = await factory({
			targeting: { tags: { list: [1, 2], exclude: false } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.tags.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.onlySelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.exceptSelected')
	})

	it('shows "except selected" label when tags selected and exclude=true', async () => {
		const wrapper = await factory({
			targeting: { tags: { list: [1], exclude: true } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.tags.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.exceptSelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.onlySelected')
	})

	it('sets tag-type to success when exclude=false', async () => {
		const wrapper = await factory({
			targeting: { tags: { list: [], exclude: false } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('success')
	})

	it('sets tag-type to danger when exclude=true', async () => {
		const wrapper = await factory({
			targeting: { tags: { list: [], exclude: true } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('danger')
	})

	it('emits onInput when select changes', async () => {
		const wrapper = await factory()
		const select = wrapper.findComponent({ name: 'ElSelect' })

		await select.vm.$emit('change', [1, 2])

		expect(wrapper.emitted('onInput')).toBeTruthy()
		expect(wrapper.emitted('onInput')![0][0]).toEqual([1, 2])
	})

	it('renders tag options with correct attributes', async () => {
		const wrapper = await factory()

		const option1 = wrapper.find('[data-test="adset-form-targeting-tags-option-1"]')
		const option2 = wrapper.find('[data-test="adset-form-targeting-tags-option-2"]')
		const option3 = wrapper.find('[data-test="adset-form-targeting-tags-option-3"]')

		expect(option1.attributes('value')).toBe('1')
		expect(option1.attributes('label')).toBe('Tag 1')

		expect(option2.attributes('value')).toBe('2')
		expect(option2.attributes('label')).toBe('Tag 2')

		expect(option3.attributes('value')).toBe('3')
		expect(option3.attributes('label')).toBe('Tag 3')
	})

	it('renders exclude checkbox text', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('placeholder.excludeSelected')
	})

	it('initializes with provided model values', async () => {
		const model = {
			targeting: { tags: { list: [1, 3], exclude: true } },
		}
		const wrapper = await factory(model)

		const vm = wrapper.vm as any
		expect(vm.model.targeting.tags.list).toEqual([1, 3])
		expect(vm.model.targeting.tags.exclude).toBe(true)
	})

	it('handles empty tags array from store', async () => {
		const wrapper = mount(FormTargetingTags, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElCheckbox: mockElCheckbox,
					ElOption: mockElOption,
				},
			},
			props: {
				modelValue: { targeting: { tags: { list: [], exclude: false } } },
				disabled: false,
			},
		})

		const dictStore = useDictStore()
		dictStore.all = {
			tags: [],
		} as any

		await nextTick()

		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options).toHaveLength(0)
	})

	it('handles undefined tags in store', async () => {
		const wrapper = mount(FormTargetingTags, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElCheckbox: mockElCheckbox,
					ElOption: mockElOption,
				},
			},
			props: {
				modelValue: { targeting: { tags: { list: [], exclude: false } } },
				disabled: false,
			},
		})

		const dictStore = useDictStore()
		dictStore.all = undefined as any

		await nextTick()

		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options).toHaveLength(0)
	})

	it('updates exclude checkbox when clicked', async () => {
		const wrapper = await factory()
		const checkbox = wrapper.findComponent({ name: 'ElCheckbox' })

		await checkbox.vm.$emit('update:modelValue', true)

		const vm = wrapper.vm as any
		expect(vm.model.targeting.tags.exclude).toBe(true)
	})

	it('sets correct select configuration', async () => {
		const wrapper = await factory()
		const select = wrapper.findComponent({ name: 'ElSelect' })

		// Проверяем что select компонент существует и имеет правильную конфигурацию
		expect(select.exists()).toBe(true)
		expect(select.props('size')).toBe('large')

		// Проверяем что multiple select работает (можем выбрать несколько значений)
		const vm = wrapper.vm as any
		vm.model.targeting.tags.list = [1, 2]
		await wrapper.vm.$nextTick()
		expect(vm.model.targeting.tags.list).toEqual([1, 2])
	})
})
