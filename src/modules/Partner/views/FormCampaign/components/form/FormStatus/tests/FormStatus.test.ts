import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormStatus from '../FormStatus.vue'

const mockElSwitch = {
	name: 'ElSwitch',
	template: '<div class="mock-switch"><slot /></div>',
	props: ['modelValue', 'activeText', 'inactiveText', 'inlinePrompt'],
	emits: ['update:modelValue'],
}

describe('FormStatus Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormStatus, {
			global: {
				plugins: [i18n],
				stubs: {
					ElSwitch: mockElSwitch,
				},
			},
			props: {
				modelValue: false,
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided status', () => {
		const { wrapper } = factory({
			modelValue: true,
		})

		expect(wrapper.props('modelValue')).toBe(true)
		expect(wrapper.text()).toContain('Enabled')
	})

	it('displays correct text based on status', async () => {
		const { wrapper } = factory({
			modelValue: false,
		})

		expect(wrapper.text()).toContain('Disabled')

		await wrapper.setProps({ modelValue: true })
		expect(wrapper.text()).toContain('Enabled')
	})

	it('emits update event when status changes', async () => {
		const { wrapper } = factory({
			modelValue: false,
		})

		const switchComponent = wrapper.findComponent({ name: 'ElSwitch' })
		await switchComponent.vm.$emit('update:modelValue', true)

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0]).toEqual([true])
	})
})
