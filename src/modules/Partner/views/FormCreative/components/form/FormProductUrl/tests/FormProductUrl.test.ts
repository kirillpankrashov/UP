import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import FormProductUrl from '../FormProductUrl.vue'

const mockT = vi.fn((key) => key)
vi.mock('@/core/hooks', () => ({ useLocale: () => ({ t: mockT }) }))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div><slot /></div>',
	props: ['label', 'prop'],
}
const mockElInput = {
	name: 'ElInput',
	template: '<input />',
	props: ['modelValue', 'placeholder', 'size'],
}

describe('FormCreative FormProductUrl', () => {
	const factory = (productUrl = { general: 'g', mobile: 'm' }) =>
		mount(FormProductUrl, {
			global: {
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
				},
			},
			props: { modelValue: { productUrl } },
		})

	it('passes correct props to general input', () => {
		const wrapper = factory({ general: 'foo', mobile: 'bar' })
		const input = wrapper.findAllComponents({ name: 'ElInput' })[0]
		expect(input.props().placeholder).toBe('creative.form.data.fields.productUrl.placeholder')
		expect(input.props().size).toBe('large')
		expect(input.props().modelValue).toBe('foo')
	})

	it('passes correct props to mobile input', () => {
		const wrapper = factory({ general: 'foo', mobile: 'bar' })
		const input = wrapper.findAllComponents({ name: 'ElInput' })[1]
		expect(input.props().placeholder).toBe('creative.form.data.fields.mobileProductUrl.placeholder')
		expect(input.props().size).toBe('large')
		expect(input.props().modelValue).toBe('bar')
	})

	it('updates v-model when productUrl changes', async () => {
		const wrapper = factory({ general: 'a', mobile: 'b' })
		await wrapper.setProps({ modelValue: { productUrl: { general: 'x', mobile: 'y' } } })
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs[0].props().modelValue).toBe('x')
		expect(inputs[1].props().modelValue).toBe('y')
	})
})
