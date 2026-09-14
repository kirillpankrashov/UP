import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'

import FormTargetingGender from '../FormTargetingGender.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select v-bind="$attrs" :disabled="disabled" :placeholder="placeholder"><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'remote'],
	emits: ['change'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option v-bind="$attrs" :value="value">{{ label }}</option>',
	props: ['value', 'label'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
}))

describe('FormAdset FormTargetingGender', () => {
	const factory = async (
		model = { targeting: { gender: undefined } },
		disabled = false,
	) => {
		const wrapper = mount(FormTargetingGender, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElOption: mockElOption,
				},
			},
			props: { modelValue: model, disabled },
		})

		const dictStore = useDictStore()
		dictStore.campaigns = {
			gender: [
				{ id: 'male', title: 'Male' },
				{ id: 'female', title: 'Female' },
				{ id: 'other', title: 'Other' },
			],
		} as any

		await nextTick()

		return wrapper
	}

	it('disables select when disabled=true', async () => {
		const wrapper = await factory(undefined, true)
		const select = wrapper.find('[data-test="adset-form-targeting-gender-select"]')
		expect(select.attributes('disabled')).toBeDefined()
	})

	it('emits onInput when select changes', async () => {
		const wrapper = await factory()
		const select = wrapper.findComponent({ name: 'ElSelect' })
		await select.vm.$emit('change', 'male')
		expect(wrapper.emitted('onInput')).toBeTruthy()
		expect(wrapper.emitted('onInput')![0][0]).toBe('male')
	})

	it('initializes with provided gender value', async () => {
		const wrapper = await factory({
			targeting: { gender: 'female' as any },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('modelValue')).toBe('female')
	})

	it('handles undefined gender value', async () => {
		const wrapper = await factory({
			targeting: { gender: undefined },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('modelValue')).toBeUndefined()
	})

	it('renders gender options from dictStore', async () => {
		const wrapper = await factory()
		const maleOption = wrapper.find('[data-test="adset-form-targeting-gender-option-male"]')
		const femaleOption = wrapper.find('[data-test="adset-form-targeting-gender-option-female"]')
		const otherOption = wrapper.find('[data-test="adset-form-targeting-gender-option-other"]')

		expect(maleOption.attributes('value')).toBe('male')
		expect(femaleOption.attributes('value')).toBe('female')
		expect(otherOption.attributes('value')).toBe('other')
		expect(maleOption.text()).toBe('Male')
		expect(femaleOption.text()).toBe('Female')
		expect(otherOption.text()).toBe('Other')
	})
})
