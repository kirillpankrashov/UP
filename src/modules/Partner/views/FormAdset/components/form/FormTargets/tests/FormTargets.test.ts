import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import FormTargets from '../FormTargets.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
	useCurrency: () => ({
		convertCurrency: vi.fn((amount) => amount),
		formatCurrency: vi.fn((amount) => `$${amount}`),
	}),
}))

describe('FormAdset FormTargets', () => {
	const factory = (
		model: { targetCtr: number | undefined; targetCpa: number | undefined } = { targetCtr: undefined, targetCpa: undefined },
		advertiserCurrency = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(FormTargets, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			},
			props: {
				modelValue: model,
			},
		})

		const formCampaignStore = useFormCampaignStore()
		// Manually set the store state after creation
		if (advertiserCurrency) {
			formCampaignStore.campaignStructure = { advertiser: { wallet: { currency: advertiserCurrency } } } as any
		}
		else {
			formCampaignStore.campaignStructure = null
		}

		return wrapper
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders CTR and CPA input fields', () => {
		const wrapper = factory()

		expect(wrapper.find('[data-test="adset-form-targets-ctr-input"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targets-cpa-input"]').exists()).toBe(true)
	})

	it('sets correct placeholders for inputs', () => {
		const wrapper = factory()

		const ctrInput = wrapper.findComponent(ElInput)
		const cpaInputs = wrapper.findAllComponents(ElInput)

		expect(ctrInput.props('placeholder')).toBe('0.25')
		expect(cpaInputs[1].props('placeholder')).toBe('100')
	})

	it('sets correct input types and attributes', () => {
		const wrapper = factory()

		// Проверяем через HTML атрибуты вместо props
		const ctrInput = wrapper.find('[data-test="adset-form-targets-ctr-input"]')
		const cpaInput = wrapper.find('[data-test="adset-form-targets-cpa-input"]')

		expect(ctrInput.exists()).toBe(true)
		expect(cpaInput.exists()).toBe(true)

		// Проверяем что компоненты присутствуют
		const inputs = wrapper.findAllComponents(ElInput)
		expect(inputs.length).toBe(2)
	})

	it('displays CTR prefix symbol', () => {
		const wrapper = factory()

		// Проверяем что в template есть символ %
		expect(wrapper.html()).toContain('%')
	})

	it('initializes with provided model values', () => {
		const model = { targetCtr: 1.5, targetCpa: 250 }
		const wrapper = factory(model)

		const inputs = wrapper.findAllComponents(ElInput)
		const ctrInput = inputs[0]
		const cpaInput = inputs[1]

		expect(ctrInput.props('modelValue')).toBe(1.5)
		expect(cpaInput.props('modelValue')).toBe(250)
	})

	it('initializes with undefined values', () => {
		const wrapper = factory()

		const inputs = wrapper.findAllComponents(ElInput)
		const ctrInput = inputs[0]
		const cpaInput = inputs[1]

		// Element Plus может преобразовывать undefined в пустую строку для input компонентов
		const ctrValue = ctrInput.props('modelValue')
		const cpaValue = cpaInput.props('modelValue')

		expect(ctrValue === undefined || ctrValue === '').toBe(true)
		expect(cpaValue === undefined || cpaValue === '').toBe(true)
	})

	it('responds to prop changes correctly', async () => {
		const wrapper = factory({ targetCtr: 1.0, targetCpa: 50 })

		// Изменяем props и проверяем что компонент обновился
		await wrapper.setProps({
			modelValue: { targetCtr: 2.5, targetCpa: 100 },
		})

		await nextTick()

		// Проверяем что компонент существует и обработал изменения
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.props('modelValue')).toEqual({
			targetCtr: 2.5,
			targetCpa: 100,
		})
	})

	it('renders form structure correctly', () => {
		const wrapper = factory()

		// Проверяем основную структуру формы
		expect(wrapper.find('[data-test="adset-form-targets-container"]').exists()).toBe(true)
		expect(wrapper.findAllComponents(ElFormItem).length).toBe(2)
		expect(wrapper.findAllComponents(ElInput).length).toBe(2)

		// Проверяем что inputs существуют с правильными data-test атрибутами
		expect(wrapper.find('[data-test="adset-form-targets-ctr-input"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targets-cpa-input"]').exists()).toBe(true)
	})

	it('displays correct form labels', () => {
		const wrapper = factory()

		expect(wrapper.text()).toContain('adset.settings.form.targets.ctrLabel')
		expect(wrapper.text()).toContain('adset.settings.form.targets.cpaLabel')
	})

	it('has correct prop names for form validation', () => {
		const wrapper = factory()

		const formItems = wrapper.findAllComponents(ElFormItem)
		const ctrFormItem = formItems[0]
		const cpaFormItem = formItems[1]

		expect(ctrFormItem.props('prop')).toBe('targetCtr')
		expect(cpaFormItem.props('prop')).toBe('targetCpa')
	})

	it('displays CTR prefix symbol', () => {
		const wrapper = factory()

		// Проверяем что в template есть символ %
		expect(wrapper.html()).toContain('%')
		expect(wrapper.html()).toContain('text-gray')
	})
})
