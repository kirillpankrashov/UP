import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormLegals from '../FormLegals.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item">{{ label }}<slot /></div>',
	props: ['label'],
}

const mockElInput = {
	name: 'ElInput',
	template: '<input data-test="el-input" :value="value" :disabled="disabled" />',
	props: ['value', 'size', 'disabled'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

describe('FormCreative FormLegals Component', () => {
	const factory = (creative: any) => {
		const wrapper = mount(FormLegals, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
				},
			},
			props: {
				creative,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders both legal fields when media and text ERID exist', () => {
		const { wrapper } = factory({
			legalCompliance: {
				erid: {
					media: 'ERID-MEDIA-123',
					text: 'ERID-TEXT-456',
				},
			},
		})

		const formItems = wrapper.findAll('[data-test="el-form-item"]')
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })

		expect(formItems).toHaveLength(2)
		expect(inputs).toHaveLength(2)
		expect(inputs[0].props('value')).toBe('ERID-MEDIA-123')
		expect(inputs[1].props('value')).toBe('ERID-TEXT-456')
		expect(inputs[0].props('disabled')).toBe(true)
		expect(inputs[1].props('disabled')).toBe(true)
	})

	it('renders only media legal field when only media ERID exists', () => {
		const { wrapper } = factory({
			legalCompliance: {
				erid: {
					media: 'ERID-MEDIA-ONLY',
					text: '',
				},
			},
		})

		const formItems = wrapper.findAll('[data-test="el-form-item"]')
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })

		expect(formItems).toHaveLength(1)
		expect(inputs).toHaveLength(1)
		expect(inputs[0].props('value')).toBe('ERID-MEDIA-ONLY')
		expect(formItems[0].text()).toContain('creative.form.labels.fields.creative.label')
	})

	it('renders only chatbot legal field when only text ERID exists', () => {
		const { wrapper } = factory({
			legalCompliance: {
				erid: {
					media: '',
					text: 'ERID-TEXT-ONLY',
				},
			},
		})

		const formItems = wrapper.findAll('[data-test="el-form-item"]')
		const inputs = wrapper.findAllComponents({ name: 'ElInput' })

		expect(formItems).toHaveLength(1)
		expect(inputs).toHaveLength(1)
		expect(inputs[0].props('value')).toBe('ERID-TEXT-ONLY')
		expect(formItems[0].text()).toContain('creative.form.labels.fields.chatbot.label')
	})

	it('renders no legal fields when ERID values are empty', () => {
		const { wrapper } = factory({
			legalCompliance: {
				erid: {
					media: '',
					text: '',
				},
			},
		})

		expect(wrapper.findAll('[data-test="el-form-item"]')).toHaveLength(0)
		expect(wrapper.findAll('[data-test="el-input"]')).toHaveLength(0)
	})
})
