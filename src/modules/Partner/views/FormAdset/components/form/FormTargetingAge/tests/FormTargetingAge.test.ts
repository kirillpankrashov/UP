import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import FormTargetingAge from '../FormTargetingAge.vue'

interface Model {
	targeting: {
		age: {
			from: number | undefined
			to: number | undefined
		}
	}
}
vi.mock('@/core/hooks', () => ({ useLocale: () => ({ t: vi.fn((key) => key) }) }))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div><slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select :disabled="disabled" :placeholder="placeholder"><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option :value="value" :data-test="dataTest">{{ label }}</option>',
	props: ['value', 'label', 'dataTest'],
}

describe('FormAdset FormTargetingAge', () => {
	const factory = (model: Model = { targeting: { age: { from: undefined, to: undefined } } }, disabled = false) =>
		mount(FormTargetingAge, {
			global: {
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElOption: mockElOption,
				},
			},
			props: { modelValue: model, disabled },
		})

	it('renders both selects and form items', () => {
		const wrapper = factory()
		expect(wrapper.find('[data-test="adset-form-targeting-age-from-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-age-to-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-age-from-select"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-age-to-select"]').exists()).toBe(true)
	})

	it('renders correct placeholders', () => {
		const wrapper = factory()
		const fromSelect = wrapper.find('[data-test="adset-form-targeting-age-from-select"]')
		const toSelect = wrapper.find('[data-test="adset-form-targeting-age-to-select"]')
		expect(fromSelect.attributes('placeholder')).toBe('adset.targeting.form.age.fromPlaceholder')
		expect(toSelect.attributes('placeholder')).toBe('adset.targeting.form.age.toPlaceholder')
	})

	it('disables selects when disabled=true', async () => {
		const wrapper = factory({ targeting: { age: { from: undefined, to: undefined } } }, true)

		await nextTick()

		const fromSelect = wrapper.find('[data-test="adset-form-targeting-age-from-select"]')
		const toSelect = wrapper.find('[data-test="adset-form-targeting-age-to-select"]')
		expect(fromSelect.attributes('disabled')).toBeDefined()
		expect(toSelect.attributes('disabled')).toBeDefined()
	})

	it('renders correct options for from and to', () => {
		const wrapper = factory({ targeting: { age: { from: undefined, to: undefined } } })

		for (let i = 18; i <= 65; i++) {
			expect(wrapper.find(`[data-test='adset-form-targeting-age-from-option-${i}']`).exists()).toBe(true)
			expect(wrapper.find(`[data-test='adset-form-targeting-age-to-option-${i}']`).exists()).toBe(true)
		}
	})

	it('updates from options when to is set', () => {
		const wrapper = factory({ targeting: { age: { from: undefined, to: 25 } } })
		for (let i = 18; i <= 25; i++) {
			expect(wrapper.find(`[data-test='adset-form-targeting-age-from-option-${i}']`).exists()).toBe(true)
		}

		expect(wrapper.find('[data-test="adset-form-targeting-age-from-option-26"]').exists()).toBe(false)
	})

	it('updates to options when from is set', () => {
		const wrapper = factory({ targeting: { age: { from: 30, to: undefined } } })
		for (let i = 30; i <= 65; i++) {
			expect(wrapper.find(`[data-test='adset-form-targeting-age-to-option-${i}']`).exists()).toBe(true)
		}

		expect(wrapper.find('[data-test="adset-form-targeting-age-to-option-29"]').exists()).toBe(false)
	})

	it('emits onInput when select changes', async () => {
		const wrapper = factory()
		await wrapper.find('[data-test="adset-form-targeting-age-from-select"]').trigger('change')
		await wrapper.find('[data-test="adset-form-targeting-age-to-select"]').trigger('change')
		expect(wrapper.emitted('onInput')).toBeTruthy()
	})
})
