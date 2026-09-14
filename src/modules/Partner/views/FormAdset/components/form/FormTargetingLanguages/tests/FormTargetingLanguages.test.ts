import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'

import FormTargetingLanguages from '../FormTargetingLanguages.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select v-bind="$attrs" :disabled="disabled" :placeholder="placeholder" :tag-type="tagType" multiple><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'multiple', 'filterable', 'remote', 'tagType'],
	emits: ['change'],
}
const mockElCheckbox = {
	name: 'ElCheckbox',
	template: '<label v-bind="$attrs"><input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" /><span><slot /></span></label>',
	props: ['modelValue'],
	emits: ['update:modelValue'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option v-bind="$attrs" :value="value">{{ label }}</option>',
	props: ['value', 'label'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
}))

describe('FormAdset FormTargetingLanguages', () => {
	const factory = async (
		model = { targeting: { broadcasterLanguages: { list: [], exclude: false } } },
		disabled = false,
	) => {
		const wrapper = mount(FormTargetingLanguages, {
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
			languages: [
				{ id: 'en', title: 'English' },
				{ id: 'es', title: 'Spanish' },
				{ id: 'fr', title: 'French' },
			],
		} as any

		await nextTick()

		return wrapper
	}

	it('disables select when disabled=true', async () => {
		const wrapper = await factory(undefined, true)
		const select = wrapper.find('[data-test="adset-form-targeting-languages-select"]')
		expect(select.attributes('disabled')).toBeDefined()
	})

	it('shows default label when no languages selected', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('adset.targeting.form.language.label')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.exceptSelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "only selected" label when languages selected and exclude=false', async () => {
		const wrapper = await factory({
			targeting: { broadcasterLanguages: { list: ['en', 'es'] as never[], exclude: false } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.language.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "except selected" label when languages selected and exclude=true', async () => {
		const wrapper = await factory({
			targeting: { broadcasterLanguages: { list: ['en'] as never[], exclude: true } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.language.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.exceptSelected')
	})

	it('sets tag-type to success when exclude=false', async () => {
		const wrapper = await factory({
			targeting: { broadcasterLanguages: { list: [], exclude: false } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('success')
	})

	it('sets tag-type to danger when exclude=true', async () => {
		const wrapper = await factory({
			targeting: { broadcasterLanguages: { list: [], exclude: true } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('danger')
	})

	it('emits onInput when select changes', async () => {
		const wrapper = await factory()
		const select = wrapper.findComponent({ name: 'ElSelect' })
		await select.vm.$emit('change', ['en', 'es'])
		expect(wrapper.emitted('onInput')).toBeTruthy()
		expect(wrapper.emitted('onInput')![0][0]).toEqual(['en', 'es'])
	})

	it('renders exclude checkbox text', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('placeholder.excludeSelected')
	})

	it('renders language options from dictStore', async () => {
		const wrapper = await factory()
		const enOption = wrapper.find('[data-test="adset-form-targeting-languages-option-en"]')
		const esOption = wrapper.find('[data-test="adset-form-targeting-languages-option-es"]')
		const frOption = wrapper.find('[data-test="adset-form-targeting-languages-option-fr"]')

		expect(enOption.attributes('value')).toBe('en')
		expect(esOption.attributes('value')).toBe('es')
		expect(frOption.attributes('value')).toBe('fr')
		expect(enOption.text()).toBe('English')
		expect(esOption.text()).toBe('Spanish')
		expect(frOption.text()).toBe('French')
	})
})
