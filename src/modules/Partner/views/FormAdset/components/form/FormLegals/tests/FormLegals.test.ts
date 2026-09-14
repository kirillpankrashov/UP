import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormLegals from '../FormLegals.vue'

const mockT = vi.fn((key) => key)
vi.mock('@/core/hooks', () => ({ useLocale: () => ({ t: mockT }) }))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot /></div>',
	props: ['label', 'prop'],
}
const mockElInput = {
	name: 'ElInput',
	template: '<input data-test="el-input" :value="value" :disabled="disabled" />',
	props: ['value', 'size', 'disabled'],
}

describe('FormAdset FormLegals', () => {
	type LegalCompliance = {
		erid: { media: string | null; text: string | null }
		marker: { media: string | null; text: string | null }
	}
	const baseLegalCompliance: LegalCompliance = {
		erid: { media: 'media123', text: 'text456' },
		marker: { media: null, text: null },
	}

	const factory = (legalCompliance: LegalCompliance = baseLegalCompliance) =>
		mount(FormLegals, {
			plugins: [i18n],
			global: {
				stubs: { ElFormItem: mockElFormItem, ElInput: mockElInput },
			},
			props: { legalCompliance },
		})

	it('renders both ElFormItem/ElInput if both values present', () => {
		const wrapper = factory()
		const items = wrapper.findAll('[data-test="el-form-item"]')
		expect(items.length).toBe(2)
		const inputs = wrapper.findAll('[data-test="el-input"]')
		expect(inputs.length).toBe(2)
	})

	it('renders only media if text is null', async () => {
		const wrapper = factory({
			erid: { media: 'media123', text: null },
			marker: { media: null, text: null },
		})

		await nextTick()

		expect(wrapper.findAll('[data-test="el-form-item"]').length).toBe(1)
		expect(wrapper.findComponent({ name: 'ElInput' }).props().value).toBe('media123')
	})

	it('renders only text if media is null', async () => {
		const wrapper = factory({
			erid: { media: null, text: 'text456' },
			marker: { media: null, text: null },
		})

		await nextTick()

		expect(wrapper.findAll('[data-test="el-form-item"]').length).toBe(1)
		expect(wrapper.findComponent({ name: 'ElInput' }).props().value).toBe('text456')
	})

	it('renders nothing if both values are null', async () => {
		const wrapper = factory({
			erid: { media: null, text: null },
			marker: { media: null, text: null },
		})

		await nextTick()

		expect(wrapper.findAll('[data-test="el-form-item"]').length).toBe(0)
	})

	it('ElInput is always disabled', async () => {
		const wrapper = factory()

		await nextTick()

		const inputs = wrapper.findAll('[data-test="el-input"]')
		inputs.forEach((input) => {
			expect(input.attributes('disabled')).toBeDefined()
		})
	})
})
