import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
}))

import FormTargetingAgeRestriction from '../FormTargetingAgeRestriction.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs"><slot /></div>',
	props: ['prop'],
}
const mockElCheckbox = {
	name: 'ElCheckbox',
	template: '<label v-bind="$attrs"><input type="checkbox" :disabled="disabled" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked); $emit(\'change\', $event.target.checked)" /><span><slot /></span></label>',
	props: ['modelValue', 'disabled'],
	emits: ['update:modelValue', 'change'],
}

describe('FormAdset FormTargetingAgeRestriction', () => {
	const factory = (model = { targeting: { mature: false } }, disabled = false) =>
		mount(FormTargetingAgeRestriction, {
			global: {
				stubs: {
					ElFormItem: mockElFormItem,
					ElCheckbox: mockElCheckbox,
				},
			},
			props: { modelValue: model, disabled },
		})

	it('disables checkbox when disabled=true', async () => {
		const wrapper = factory(undefined, true)
		await nextTick()
		const checkbox = wrapper.find('[data-test="adset-form-targeting-age-restriction-checkbox"] input')
		expect(checkbox.attributes('disabled')).toBeDefined()
	})

	it('sets checkbox checked when mature=true', () => {
		const wrapper = factory({ targeting: { mature: true } })
		const checkbox = wrapper.find('[data-test="adset-form-targeting-age-restriction-checkbox"] input')
		expect((checkbox.element as HTMLInputElement).checked).toBe(true)
	})

	it('sets checkbox unchecked when mature=false', () => {
		const wrapper = factory({ targeting: { mature: false } })
		const checkbox = wrapper.find('[data-test="adset-form-targeting-age-restriction-checkbox"] input')
		expect((checkbox.element as HTMLInputElement).checked).toBe(false)
	})

	it('emits onInput when checkbox changes', async () => {
		const wrapper = factory()
		const checkbox = wrapper.find('[data-test="adset-form-targeting-age-restriction-checkbox"] input')
		await checkbox.trigger('change')
		expect(wrapper.emitted('onInput')).toBeTruthy()
	})

	it('updates v-model when checkbox is clicked', async () => {
		const wrapper = factory({ targeting: { mature: false } })
		const checkbox = wrapper.find('[data-test="adset-form-targeting-age-restriction-checkbox"] input')

		await checkbox.setValue(true)
		await nextTick()

		expect(wrapper.props('modelValue').targeting.mature).toBe(true)
	})
})
