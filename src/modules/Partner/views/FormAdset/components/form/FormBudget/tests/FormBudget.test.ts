import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName,PayoutType } from '@/core/types'
import { i18n } from '@/core/i18n'

import FormBudget from '../FormBudget.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (val: number) => `₽${val}`,
	}),
}))

interface IModelValue {
	payableType: PayoutType
	bidCap: number | undefined
	bidCpa: number | undefined
	impressions: number | undefined
	budget: number | undefined
}

const factory = (modelValue: IModelValue = {
	payableType: PayoutType.IMPRESSIONS,
	bidCap: undefined,
	bidCpa: undefined,
	impressions: undefined,
	budget: undefined,
}, currency: CurrencyName = CurrencyName.RUB) => {
	return mount(FormBudget, {
		props: {
			modelValue,
			currency,
		},
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
		},
	})
}

describe('FormAdset FormBudget', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders radio buttons and inputs for impressions by default', async () => {
		const wrapper = factory()

		await nextTick()

		expect(wrapper.find('[data-test="payable-type-impressions"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="payable-type-actions"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="input-bidCap"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="input-impressions"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="input-bidCpa"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="input-budget"]').exists()).toBe(false)
	})

	it('renders inputs for actions when payableType is ACTIONS', async () => {
		const wrapper = factory({ ...factory().props('modelValue'), payableType: PayoutType.ACTIONS })
		await wrapper.setProps({ modelValue: { ...wrapper.props('modelValue'), payableType: PayoutType.ACTIONS } })

		expect(wrapper.find('[data-test="input-bidCpa"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="input-budget"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="input-bidCap"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="input-impressions"]').exists()).toBe(false)
	})

	it('calculates total budget for impressions', async () => {
		const wrapper = factory({
			payableType: PayoutType.IMPRESSIONS,
			bidCap: 200,
			impressions: 5000,
			bidCpa: undefined,
			budget: undefined,
		})

		await nextTick()
		const total = wrapper.find('[data-test="total-budget"] b')

		expect(total.text()).toBe('₽1000')
	})

	it('calculates total budget for actions', async () => {
		const wrapper = factory({
			payableType: PayoutType.ACTIONS,
			bidCap: undefined,
			impressions: undefined,
			bidCpa: 100,
			budget: 1000,
		})
		await nextTick()

		const total = wrapper.find('[data-test="total-budget"] b')

		expect(total.text()).toBe('10')
	})

	it('shows 0 if required fields are missing', async () => {
		const wrapper = factory({
			payableType: PayoutType.IMPRESSIONS,
			bidCap: undefined,
			impressions: undefined,
			bidCpa: undefined,
			budget: undefined,
		})
		await nextTick()

		const total = wrapper.find('[data-test="total-budget"] b')
		expect(total.text()).toBe('0')
	})

	it('shows 0 if result is NaN for actions', async () => {
		const wrapper = factory({
			payableType: PayoutType.ACTIONS,
			bidCap: undefined,
			impressions: undefined,
			bidCpa: 0,
			budget: 1000,
		})
		await nextTick()

		const total = wrapper.find('[data-test="total-budget"] b')
		expect(total.text()).toBe('0')
	})

	it('renders correct currency', async () => {
		const wrapper = factory({
			payableType: PayoutType.IMPRESSIONS,
			bidCap: 100,
			impressions: 1000,
			bidCpa: undefined,
			budget: undefined,
		}, CurrencyName.USD)

		await nextTick()

		const total = wrapper.find('[data-test="total-budget"] b')
		expect(total.text()).toBe('₽100')
	})
})
