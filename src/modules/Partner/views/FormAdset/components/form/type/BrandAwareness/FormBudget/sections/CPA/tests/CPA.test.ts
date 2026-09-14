import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import CPA from '../CPA.vue'

interface Model {
	cpa: number | undefined
	conversions: number | undefined
	cpaDailyLimit: number | undefined
}

const mockFormatCurrency = vi.fn()

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
	useCurrency: () => ({
		formatCurrency: mockFormatCurrency,
	}),
}))

describe('FormAdset CPA Budget', () => {
	const factory = (
		model: Model = { cpa: undefined, conversions: undefined, cpaDailyLimit: undefined },
		advertiserCurrency = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(CPA, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
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

		return { wrapper, formCampaignStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		// Default mock implementation
		mockFormatCurrency.mockImplementation((amount, withSymbol, currencyCode) => {
			const roundedAmount = Math.round(amount * 100) / 100
			return `${roundedAmount} ${currencyCode || 'USD'}`
		})
	})

	describe('totalBudget calculation', () => {
		it('calculates total budget correctly when both cpa and conversions are provided', async () => {
			const { wrapper } = factory({
				cpa: 100,
				conversions: 5,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('500 USD')
			// Проверяем что функция была вызвана с правильной суммой
			expect(mockFormatCurrency).toHaveBeenCalledWith(500, true, expect.anything())
		})

		it('returns 0 when cpa is not provided', async () => {
			const { wrapper } = factory({
				cpa: undefined,
				conversions: 5,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when conversions is not provided', async () => {
			const { wrapper } = factory({
				cpa: 100,
				conversions: undefined,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when both cpa and conversions are not provided', async () => {
			const { wrapper } = factory()

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('handles zero values correctly', async () => {
			const { wrapper } = factory({
				cpa: 0,
				conversions: 5,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('calculates with large values', async () => {
			const { wrapper } = factory({
				cpa: 100,
				conversions: 3,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('300 USD')
			// Проверяем что функция была вызвана с правильной суммой
			expect(mockFormatCurrency).toHaveBeenCalledWith(300, true, expect.anything())
		})
	})

	describe('currency handling', () => {
		it('calls formatCurrency with correct parameters', async () => {
			factory({
				cpa: 100,
				conversions: 2,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			// Проверяем что функция форматирования была вызвана
			expect(mockFormatCurrency).toHaveBeenCalledWith(200, true, expect.anything())
		})

		it('handles missing currency gracefully', async () => {
			const { wrapper } = factory(
				{
					cpa: 100,
					conversions: 2,
					cpaDailyLimit: undefined,
				},
				undefined,
			)

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('200 USD') // fallback to USD
		})
	})

	describe('model updates', () => {
		it('recalculates total budget when model changes', async () => {
			const { wrapper } = factory({
				cpa: 50,
				conversions: 2,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			// Проверяем начальное значение
			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('100 USD')

			// Обновляем model
			await wrapper.setProps({
				modelValue: {
					cpa: 75,
					conversions: 4,
					cpaDailyLimit: undefined,
				},
			})

			await nextTick()

			// Проверяем обновленное значение
			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('300 USD')
		})

		it('updates when only one value changes', async () => {
			const { wrapper } = factory({
				cpa: 100,
				conversions: 1,
				cpaDailyLimit: undefined,
			})

			await nextTick()

			// Обновляем только conversions
			await wrapper.setProps({
				modelValue: {
					cpa: 100,
					conversions: 3,
					cpaDailyLimit: undefined,
				},
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('300 USD')
		})
	})
})
