import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElOption, ElSelect } from '@/components/element-plus'

import FormBudget from '../FormBudget.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

describe('FormAdset SpecialProject FormBudget Component', () => {
	const mockStrategyPayments = [
		{ id: StrategyPayment.PPP, title: 'PPP' },
		{ id: StrategyPayment.CPC, title: 'CPC' },
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
				stubs: {
					PPP: {
						name: 'PPP',
						template: '<div data-test="ppp-settings-component"></div>',
					},
				},
			},
			props: {
				modelValue: {
					strategyPayment: StrategyPayment.PPP,
					bidCap: undefined,
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders root and strategy select', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="adset-form-budget-root"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-budget-strategy-select"]').exists()).toBe(true)
	})

	it('renders strategy options from dict store', async () => {
		const { wrapper } = factory()
		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(2)
		expect(options[0].props('value')).toBe(StrategyPayment.PPP)
		expect(options[0].props('label')).toBe('PPP')
		expect(options[1].props('value')).toBe(StrategyPayment.CPC)
		expect(options[1].props('label')).toBe('CPC')
	})

	it('renders settings component for PPP strategy', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPP,
				bidCap: 100,
			},
		})
		await nextTick()

		expect(wrapper.find('[data-test="adset-form-budget-settings-component"]').exists()).toBe(true)
	})

	it('does not render settings component for unsupported strategy', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.CPC,
				bidCap: 100,
			},
		})
		await nextTick()

		expect(wrapper.find('[data-test="adset-form-budget-settings-component"]').exists()).toBe(false)
	})

	it('resets bidCap when strategyPayment changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPP,
				bidCap: 250,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		select.vm.$emit('change', StrategyPayment.CPC)
		await nextTick()

		expect(wrapper.props('modelValue').bidCap).toBeUndefined()
	})

	it('handles empty strategy list', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: {
					strategyPaymentTypes: [],
				},
			},
		})
		await nextTick()

		expect(wrapper.findAllComponents(ElOption)).toHaveLength(0)
	})
})
