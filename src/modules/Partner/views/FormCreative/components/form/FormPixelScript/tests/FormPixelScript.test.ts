import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormPixelScript from '../FormPixelScript.vue'

vi.mock('@/core/hooks', () => ({ useLocale: () => ({ t: vi.fn((key) => key) }) }))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot /></div>',
	props: ['prop'],
}
const mockElInput = {
	name: 'ElInput',
	template: '<textarea data-test="el-input" />',
	props: ['modelValue', 'placeholder', 'type', 'size', 'autosize'],
}

describe('FormCreative FormPixelScript', () => {
	const factory = (pixelClicksScripts = 'foo') => {
		return mount(FormPixelScript, {
			plugins: [i18n],
			global: {
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
				},
			},
			props: { modelValue: { pixelClicksScripts } },
		})
	}

	it('renders ElFormItem and ElInput', () => {
		const wrapper = factory('bar')
		expect(wrapper.findComponent({ name: 'ElFormItem' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElInput' }).exists()).toBe(true)
	})

	it('passes correct props to ElInput', () => {
		const wrapper = factory('script123')
		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props().placeholder).toBe('creative.form.data.fields.pixelClicksScripts.placeholder')
		expect(input.props().type).toBe('textarea')
		expect(input.props().size).toBe('large')
		expect(input.props().autosize).toEqual({ minRows: 4 })
		expect(input.props().modelValue).toBe('script123')
	})

	it('updates v-model when pixelClicksScripts changes', async () => {
		const wrapper = factory('foo')
		await wrapper.setProps({ modelValue: { pixelClicksScripts: 'bar' } })
		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props().modelValue).toBe('bar')
	})
})
