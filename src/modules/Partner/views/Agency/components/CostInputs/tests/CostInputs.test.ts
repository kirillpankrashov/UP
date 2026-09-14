import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, CurrencyIcon } from '@/core/types'

import CostInputs from '../CostInputs.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/components/element-plus', () => ({
	ElFormItem: {
		name: 'ElFormItem',
		props: ['label', 'prop'],
		template: '<div data-test="el-form-item"><slot /></div>',
	},
	ElInput: {
		name: 'ElInput',
		props: ['modelValue', 'placeholder', 'disabled'],
		template: `
			<div data-test="el-input">
				<slot name="prefix" />
				<input
					data-test="el-input-inner"
					:placeholder="placeholder"
					:disabled="disabled"
					:value="modelValue"
				/>
			</div>
		`,
		emits: ['update:modelValue'],
	},
}))

describe('Partner Agency CostInputs', () => {
	const createComponent = (options: {
		disabled?: boolean
		currencySign?: CurrencyIcon
		streamer?: any
		dict: {
			agenciesPayableCpm: any
			agenciesPayableCpc: number | null
			agenciesPayableCpa: number | null
		}
		modelCpm: any
	}) => {
		const { disabled = false, currencySign = CurrencyIcon.USD, streamer, dict, modelCpm } = options

		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				dict: {
					campaigns: {
						agenciesPayableCpm: dict.agenciesPayableCpm,
						agenciesPayableCpc: dict.agenciesPayableCpc,
						agenciesPayableCpa: dict.agenciesPayableCpa,
					},
				},
			},
		})

		const wrapper = mount(CostInputs, {
			global: {
				plugins: [pinia],
			},
			props: {
				modelValue: {
					cpm: modelCpm,
				},
				disabled,
				currencySign,
				streamer,
				cpmField: 'internalCpm',
				cpaField: 'internalCpa',
				cpcField: 'internalCpc',
			},
		})

		return wrapper
	}

	it('renders only editable CPM formats and uses dict placeholders for CPM/CPC/CPA', () => {
		const wrapper = createComponent({
			dict: {
				agenciesPayableCpm: {
					[AdFormat.PIP]: 1.234,
					[AdFormat.YANDEX_FS]: 9.876,
				},
				agenciesPayableCpc: 7.1,
				agenciesPayableCpa: 5.67,
			},
			modelCpm: {
				internalCpm: {
					[AdFormat.PIP]: 10,
					[AdFormat.YANDEX_FS]: 20,
				},
				internalCpc: 100,
				internalCpa: 200,
			},
		})

		// CPM has only PIP editable; plus always renders CPC + CPA => 3 form items total
		expect(wrapper.findAll('[data-test="el-form-item"]')).toHaveLength(3)

		const placeholders = wrapper.findAll('[data-test="el-input-inner"]').map(i => i.attributes('placeholder'))
		expect(placeholders).toEqual(['1.23', '7.10', '5.67'])

		// currencySign rendered via prefix slot (CurrencyIcon.USD === '$')
		expect(wrapper.text()).toContain('$')
	})

	it('uses streamer prices for placeholders when streamer is provided', () => {
		const wrapper = createComponent({
			dict: {
				agenciesPayableCpm: {
					[AdFormat.PIP]: 111.111,
					[AdFormat.YANDEX_FS]: 222.222,
				},
				agenciesPayableCpc: 7.1,
				agenciesPayableCpa: 5.67,
			},
			streamer: {
				internalCpm: {
					[AdFormat.PIP]: 2.345,
				},
				internalCpc: 8.901,
				internalCpa: 7.65,
			},
			modelCpm: {
				internalCpm: {
					[AdFormat.PIP]: 10,
					[AdFormat.YANDEX_FS]: 20,
				},
				internalCpc: 100,
				internalCpa: 200,
			},
		})

		const placeholders = wrapper.findAll('[data-test="el-input-inner"]').map(i => i.attributes('placeholder'))
		expect(placeholders).toEqual(['2.35', '8.90', '7.65'])
	})
})

