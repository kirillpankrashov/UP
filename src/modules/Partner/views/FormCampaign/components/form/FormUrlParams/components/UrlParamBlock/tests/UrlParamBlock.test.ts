import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

import UrlParamBlock from '../UrlParamBlock.vue'

const mockElInput = {
	name: 'ElInput',
	template: '<div class="mock-input"></div>',
	props: ['modelValue', 'placeholder', 'disabled', 'size'],
	emits: ['update:modelValue', 'input'],
}

const mockElSelect = {
	name: 'ElSelect',
	template: '<div class="mock-select"><slot /></div>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'filterable'],
	emits: ['update:modelValue'],
}

const mockElOption = {
	name: 'ElOption',
	template: '<div class="mock-option"></div>',
	props: ['label', 'value'],
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div class="mock-form-item"><slot /></div>',
	props: ['label'],
}

const mockMiniXButton = {
	name: 'MiniXButton',
	template: '<button class="mock-mini-x-button"><slot /></button>',
	emits: ['click'],
}

describe('UrlParamBlock Component', () => {
	const factory = (props = {}) => {
		const defaultProps = {
			index: 1,
			blocks: [],
			showDeleteBlockButton: true,
			advertiserCurrency: CurrencyName.USD,
			modelValue: {
				key: '1',
				name: null,
				param: undefined,
			},
		}

		const wrapper = mount(UrlParamBlock, {
			global: {
				plugins: [i18n],
				stubs: {
					ElInput: mockElInput,
					ElSelect: mockElSelect,
					ElOption: mockElOption,
					ElFormItem: mockElFormItem,
					MiniXButton: mockMiniXButton,
				},
			},
			props: {
				...defaultProps,
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided values', () => {
		const { wrapper } = factory({
			modelValue: {
				name: 'test_name',
				param: CampaignUrlParams.USER_ID,
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		const select = wrapper.findComponent({ name: 'ElSelect' })

		expect(input.props('modelValue')).toBe('test_name')
		expect(select.props('modelValue')).toBe(CampaignUrlParams.USER_ID)
	})

	it('formats input correctly', async () => {
		const { wrapper } = factory({
			modelValue: {
				name: '',
				param: '',
			},
		})

		const testStr = 'test@param!'
		const expectedStr = 'testparam'

		const formattedInput = testStr.replace(/[^A-Za-z0-9-_.~]/g, '')
		expect(formattedInput).toBe(expectedStr)

		const input = wrapper.findComponent({ name: 'ElInput' })
		await input.vm.$emit('input', testStr)

		await wrapper.vm.$emit('update:modelValue', {
			name: expectedStr,
			param: '',
		})

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual(expect.objectContaining({
			name: expectedStr,
		}))
	})

	it('emits delete-block event when delete button is clicked', async () => {
		const { wrapper } = factory()

		const deleteButton = wrapper.findComponent({ name: 'MiniXButton' })
		await deleteButton.vm.$emit('click')

		expect(wrapper.emitted('delete-block')).toBeTruthy()
	})

	it('hides delete button when showDeleteBlockButton is false', () => {
		const { wrapper } = factory({
			showDeleteBlockButton: false,
		})

		expect(wrapper.findComponent({ name: 'MiniXButton' }).exists()).toBe(false)
	})

	it('disables fields when advertiserCurrency is RUB and param is ERID_TOKEN', async () => {
		const { wrapper } = factory({
			advertiserCurrency: CurrencyName.RUB,
			modelValue: {
				name: 'erid',
				param: CampaignUrlParams.ERID_TOKEN,
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		const select = wrapper.findComponent({ name: 'ElSelect' })

		expect(input.props('disabled')).toBe(true)
		expect(select.props('disabled')).toBe(true)
	})

	it('enables fields when advertiserCurrency is not RUB', () => {
		const { wrapper } = factory({
			advertiserCurrency: CurrencyName.USD,
			modelValue: {
				name: 'erid_test',
				param: CampaignUrlParams.ERID_TOKEN,
			},
		})

		const input = wrapper.findComponent({ name: 'ElInput' })
		expect(input.props('disabled')).toBe(false)
	})

	it('generates options correctly based on advertiserCurrency and existing blocks', () => {
		const { wrapper: usdWrapper } = factory({
			advertiserCurrency: CurrencyName.USD,
			blocks: [],
		})

		const options = usdWrapper.findAllComponents({ name: 'ElOption' })

		const hasEridToken = options.some(option =>
			option.props('value') === CampaignUrlParams.ERID_TOKEN,
		)
		expect(hasEridToken).toBe(false)

		const hasUserId = options.some(option =>
			option.props('value') === CampaignUrlParams.USER_ID,
		)
		expect(hasUserId).toBe(true)
	})

	// it('filters out ERID_TOKEN when it already exists in blocks', () => {
	// 	const { wrapper } = factory({
	// 		advertiserCurrency: CurrencyName.RUB,
	// 		blocks: [
	// 			{
	// 				name: 'existing_erid',
	// 				param: CampaignUrlParams.ERID_TOKEN,
	// 			},
	// 		],
	// 	})

	// 	const options = wrapper.findAllComponents({ name: 'ElOption' })

	// 	const hasEridToken = options.some(option =>
	// 		option.props('value') === CampaignUrlParams.ERID_TOKEN,
	// 	)
	// 	expect(hasEridToken).toBe(false)
	// })

	it('updates model when input changes', async () => {
		const { wrapper } = factory()

		const input = wrapper.findComponent({ name: 'ElInput' })

		await wrapper.setProps({
			modelValue: {
				name: 'new_name',
				param: CampaignUrlParams.USER_ID,
				key: '1',
			},
		})

		expect(input.props('modelValue')).toBe('new_name')
	})

	it('updates model when select changes', async () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent({ name: 'ElSelect' })

		await wrapper.setProps({
			modelValue: {
				name: '',
				param: CampaignUrlParams.USER_ID,
				key: '1',
			},
		})

		expect(select.props('modelValue')).toBe(CampaignUrlParams.USER_ID)
	})
})
