import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'

import FormTargetingDevicesAuditory from '../FormTargetingDevicesAuditory.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select v-bind="$attrs" :disabled="disabled" :placeholder="placeholder" :tag-type="tagType" multiple><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'multiple', 'filterable', 'remote', 'tagType'],
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

describe('FormAdset FormTargetingDevicesAuditory', () => {
	const factory = async (
		model = { targeting: { devicesAuditory: { list: [], exclude: false } } },
		disabled = false,
	) => {
		const wrapper = mount(FormTargetingDevicesAuditory, {
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
			devices: [
				{ id: 'mobile', title: 'Mobile' },
				{ id: 'desktop', title: 'Desktop' },
				{ id: 'tablet', title: 'Tablet' },
			],
		} as any

		await nextTick()

		return wrapper
	}

	it('disables select when disabled=true', async () => {
		const wrapper = await factory(undefined, true)
		const select = wrapper.find('[data-test="adset-form-targeting-devices-auditory-select"]')
		expect(select.attributes('disabled')).toBeDefined()
	})

	it('shows default label when no devices selected', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('adset.targeting.form.devices.label')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.exceptSelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "only selected" label when devices selected and exclude=false', async () => {
		const wrapper = await factory({
			targeting: { devicesAuditory: { list: ['mobile', 'desktop'] as never[], exclude: false } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.devices.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "except selected" label when devices selected and exclude=true', async () => {
		const wrapper = await factory({
			targeting: { devicesAuditory: { list: ['mobile'] as never[], exclude: true } },
		})
		expect(wrapper.text()).toContain('adset.targeting.form.devices.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.exceptSelected')
	})

	it('sets tag-type to success when exclude=false', async () => {
		const wrapper = await factory({
			targeting: { devicesAuditory: { list: [], exclude: false } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('success')
	})

	it('sets tag-type to danger when exclude=true', async () => {
		const wrapper = await factory({
			targeting: { devicesAuditory: { list: [], exclude: true } },
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('danger')
	})

	it('renders exclude checkbox text', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('placeholder.excludeSelected')
	})
})
