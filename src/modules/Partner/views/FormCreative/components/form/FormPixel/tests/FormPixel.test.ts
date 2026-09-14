import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormPixel from '../FormPixel.vue'

const mockT = vi.fn((key) => key)
vi.mock('@/core/hooks', () => ({ useLocale: () => ({ t: mockT }) }))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot /></div>',
	props: ['prop'],
}
const mockElInput = {
	name: 'ElInput',
	template: '<input data-test="el-input" />',
	props: ['modelValue', 'placeholder', 'size'],
}
const mockPlusIcon = {
	name: 'PlusIcon',
	template: '<svg data-test="plus-icon"></svg>',
}

describe('FormCreative FormPixel', () => {
	const factory = (pixelClicks = ['a', 'b']) =>
		mount(FormPixel, {
			plugins: [i18n],
			global: {
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
					PlusIcon: mockPlusIcon,
				},
			},
			props: { modelValue: { pixelClicks } },
		})

	it('renders ElFormItem and ElInput for each pixelClicks', () => {
		const wrapper = factory(['a', 'b', 'c'])
		expect(wrapper.findComponent({ name: 'ElFormItem' }).exists()).toBe(true)
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs.length).toBe(3)
	})

	it('passes correct props to ElInput', () => {
		const wrapper = factory(['foo'])
		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props().placeholder).toBe('creative.form.data.fields.pixelClicks.placeholder')
		expect(input.props().size).toBe('large')
		expect(input.props().modelValue).toBe('foo')
	})

	it('adds new pixel on button click', async () => {
		const wrapper = factory(['a'])
		await wrapper.find('button').trigger('click')
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs.length).toBe(2)
		expect(inputs[1].props().modelValue).toBe('')
	})

	it('disables add button if any pixel is empty', async () => {
		const wrapper = factory(['a', ''])
		const btn = wrapper.find('button')
		expect(btn.attributes('disabled')).toBeDefined()
	})

	it('enables add button if all pixels are filled', () => {
		const wrapper = factory(['a', 'b'])
		const btn = wrapper.find('button')
		expect(btn.attributes('disabled')).toBeUndefined()
	})

	it('updates v-model when pixelClicks changes', async () => {
		const wrapper = factory(['a'])
		await wrapper.setProps({ modelValue: { pixelClicks: ['x', 'y'] } })
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })
		expect(inputs.length).toBe(2)
		expect(inputs[0].props().modelValue).toBe('x')
		expect(inputs[1].props().modelValue).toBe('y')
	})
})
