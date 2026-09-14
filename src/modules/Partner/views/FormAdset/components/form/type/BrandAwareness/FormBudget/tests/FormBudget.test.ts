import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElOption, ElSelect } from '@/components/element-plus'

import FormBudget from '../FormBudget.vue'

describe('FormBudget Component', () => {
	const mockStrategyPayments = [
		{ id: StrategyPayment.PPV, title: 'PPV' },
		{ id: StrategyPayment.CPC, title: 'CPC' },
		{ id: StrategyPayment.CPA, title: 'CPA' },
		{ id: StrategyPayment.PPVA, title: 'PPVA' },
	]

	const factory = (props = {}, customState = {}) => {
		const initialState = {
			dict: {
				campaigns: {
					strategyPaymentTypes: mockStrategyPayments,
				},
			},
			...customState,
		}

		const wrapper = mount(FormBudget, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState,
					}),
				],
			},
			props: {
				modelValue: {
					strategyPayment: StrategyPayment.PPV,
					bidCap: undefined,
					impressions: undefined,
					cpc: undefined,
					cpa: undefined,
					clicks: undefined,
					conversions: undefined,
					cpcDailyLimit: undefined,
					cpaDailyLimit: undefined,
					margin: undefined,
					agencyCommission: undefined,
					cpmPercent: undefined,
					targetCtr: undefined,
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders root and select with data-test', () => {
		const { wrapper } = factory()
		expect(wrapper.find('[data-test="adset-form-budget-root"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-budget-strategy-select"]').exists()).toBe(true)
	})

	it('renders all strategy options', async () => {
		const { wrapper } = factory()
		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(4)

		options.forEach((option, index) => {
			expect(option.props('value')).toBe(mockStrategyPayments[index].id)
			expect(option.props('label')).toBe(mockStrategyPayments[index].title)
		})
	})

	it('updates model value when strategy is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPV,
			},
		})
		const select = wrapper.findComponent(ElSelect)
		await select.setValue(StrategyPayment.CPC)
		await nextTick()
		expect(wrapper.props('modelValue').strategyPayment).toBe(StrategyPayment.CPC)
	})

	it('renders correct settings component for each strategy', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPV,
			},
		})
		const settings = wrapper.find('[data-test="adset-form-budget-settings-component"]')
		expect(settings.exists()).toBe(true)
		// Меняем стратегию
		await wrapper.setProps({
			modelValue: {
				strategyPayment: StrategyPayment.CPC,
				bidCap: undefined,
				impressions: undefined,
				cpc: undefined,
				cpa: undefined,
				clicks: undefined,
				conversions: undefined,
				cpcDailyLimit: undefined,
				cpaDailyLimit: undefined,
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				targetCtr: undefined,
			},
		})
		await nextTick()
		// settingsComponent должен смениться
		const settings2 = wrapper.find('[data-test="adset-form-budget-settings-component"]')
		expect(settings2.exists()).toBe(true)
	})

	it('handles empty strategyPayments array', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: {
					strategyPaymentTypes: [],
				},
			},
		})
		await nextTick()
		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined campaigns in store', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: undefined,
			},
		})
		await nextTick()
		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})
})
