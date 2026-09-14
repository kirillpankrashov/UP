import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormQrCode from '../FormQrCode.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item" v-bind="$attrs"><slot /></div>',
	props: ['prop'],
}

const mockElCheckbox = {
	name: 'ElCheckbox',
	template: `
		<label data-test="el-checkbox" v-bind="$attrs">
			<input
				type="checkbox"
				:checked="modelValue"
				@change="$emit('update:modelValue', $event.target.checked)"
			/>
			<span><slot /></span>
		</label>
	`,
	props: ['modelValue', 'size'],
	emits: ['update:modelValue'],
}

describe('FormCreative FormQrCode Component', () => {
	const factory = (model = { qrCode: false }) =>
		mount(FormQrCode, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElCheckbox: mockElCheckbox,
				},
			},
			props: {
				modelValue: model,
			},
		})

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders qr code container and checkbox', () => {
		const wrapper = factory()

		expect(wrapper.find('[data-test="creative-qr-code"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="creative-qr-code-input"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-form-item"]').exists()).toBe(true)
	})

	it('shows checked checkbox when qrCode is true', () => {
		const wrapper = factory({ qrCode: true })
		const input = wrapper.find('[data-test="creative-qr-code-input"] input')

		expect((input.element as HTMLInputElement).checked).toBe(true)
	})

	it('shows unchecked checkbox when qrCode is false', () => {
		const wrapper = factory({ qrCode: false })
		const input = wrapper.find('[data-test="creative-qr-code-input"] input')

		expect((input.element as HTMLInputElement).checked).toBe(false)
	})

	it('updates model when checkbox is toggled', async () => {
		const wrapper = factory({ qrCode: false })
		const input = wrapper.find('[data-test="creative-qr-code-input"] input')

		await input.setValue(true)
		await nextTick()

		expect(wrapper.props('modelValue').qrCode).toBe(true)
	})

	it('reflects modelValue updates from parent props', async () => {
		const wrapper = factory({ qrCode: false })

		await wrapper.setProps({
			modelValue: { qrCode: true },
		})
		await nextTick()

		const input = wrapper.find('[data-test="creative-qr-code-input"] input')
		expect((input.element as HTMLInputElement).checked).toBe(true)
	})
})
