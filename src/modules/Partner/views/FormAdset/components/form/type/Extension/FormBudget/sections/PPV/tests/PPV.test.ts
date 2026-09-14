import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import PPV from '../PPV.vue'

interface Model {
	bidCap: number | undefined
	impressions: number | undefined
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

describe('FormAdset PPV Budget', () => {
	const factory = (
		model: Model = { bidCap: undefined, impressions: undefined },
		advertiserCurrency = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(PPV, {
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

	describe('totalBudget calculation (CPM model)', () => {
		it('calculates total budget correctly when both bidCap and impressions are provided', async () => {
			const { wrapper } = factory({
				bidCap: 10, // $10 per 1000 impressions
				impressions: 5000, // 5000 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (5000 / 1000) * 10 = 5 * 10 = 50
			expect(totalBudgetElement.text()).toBe('50 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('calculates correctly with 1000 impressions', async () => {
			const { wrapper } = factory({
				bidCap: 5, // $5 per 1000 impressions
				impressions: 1000, // exactly 1000 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (1000 / 1000) * 5 = 1 * 5 = 5
			expect(totalBudgetElement.text()).toBe('5 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('calculates correctly with less than 1000 impressions', async () => {
			const { wrapper } = factory({
				bidCap: 20, // $20 per 1000 impressions
				impressions: 500, // 500 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (500 / 1000) * 20 = 0.5 * 20 = 10
			expect(totalBudgetElement.text()).toBe('10 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('returns 0 when bidCap is not provided', async () => {
			const { wrapper } = factory({
				bidCap: undefined,
				impressions: 5000,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when impressions is not provided', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when both bidCap and impressions are not provided', async () => {
			const { wrapper } = factory()

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('handles zero values correctly', async () => {
			const { wrapper } = factory({
				bidCap: 0,
				impressions: 5000,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('calculates with decimal bidCap values', async () => {
			const { wrapper } = factory({
				bidCap: 7.5, // $7.50 per 1000 impressions
				impressions: 2000, // 2000 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (2000 / 1000) * 7.5 = 2 * 7.5 = 15
			expect(totalBudgetElement.text()).toBe('15 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('calculates with large impression values', async () => {
			const { wrapper } = factory({
				bidCap: 8, // $8 per 1000 impressions
				impressions: 25000, // 25,000 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (25000 / 1000) * 8 = 25 * 8 = 200
			expect(totalBudgetElement.text()).toBe('200 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('handles fractional results correctly', async () => {
			const { wrapper } = factory({
				bidCap: 15, // $15 per 1000 impressions
				impressions: 2333, // 2333 impressions
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (2333 / 1000) * 15 = 2.333 * 15 = 34.995, rounded to 35
			expect(totalBudgetElement.text()).toBe('35 USD')

			// Check that formatCurrency was called with the calculated value (allowing for floating point precision)
			const calls = mockFormatCurrency.mock.calls
			const calculatedValue = calls[calls.length - 1][0] // Get the last call's first argument
			expect(calculatedValue).toBeCloseTo(34.995, 5)
		})
	})

	describe('currency handling', () => {
		it('calls formatCurrency with correct parameters', async () => {
			factory({
				bidCap: 6,
				impressions: 3000,
			})

			await nextTick()

			// Expected calculation: (3000 / 1000) * 6 = 18
			expect(mockFormatCurrency).toHaveBeenCalled()
			const calls = mockFormatCurrency.mock.calls
			const lastCall = calls[calls.length - 1]
			expect(lastCall[0]).toBe(18) // amount
			expect(lastCall[1]).toBe(true) // withSymbol
		})

		it('handles missing currency gracefully', async () => {
			const { wrapper } = factory(
				{
					bidCap: 4,
					impressions: 2500,
				},
				undefined,
			)

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (2500 / 1000) * 4 = 10
			expect(totalBudgetElement.text()).toBe('10 USD') // fallback to USD
		})
	})

	describe('model updates', () => {
		it('recalculates total budget when model changes', async () => {
			const { wrapper } = factory({
				bidCap: 5,
				impressions: 2000,
			})

			await nextTick()

			// Проверяем начальное значение: (2000 / 1000) * 5 = 10
			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('10 USD')

			// Обновляем model
			await wrapper.setProps({
				modelValue: {
					bidCap: 12,
					impressions: 4000,
				},
			})

			await nextTick()

			// Проверяем обновленное значение: (4000 / 1000) * 12 = 48
			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('48 USD')
		})

		it('updates when only bidCap value changes', async () => {
			const { wrapper } = factory({
				bidCap: 8,
				impressions: 1500,
			})

			await nextTick()

			// Обновляем только bidCap
			await wrapper.setProps({
				modelValue: {
					bidCap: 16,
					impressions: 1500,
				},
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (1500 / 1000) * 16 = 24
			expect(totalBudgetElement.text()).toBe('24 USD')
		})

		it('updates when only impressions value changes', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: 1000,
			})

			await nextTick()

			// Обновляем только impressions
			await wrapper.setProps({
				modelValue: {
					bidCap: 10,
					impressions: 3000,
				},
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (3000 / 1000) * 10 = 30
			expect(totalBudgetElement.text()).toBe('30 USD')
		})

		it('resets to 0 when required value is removed', async () => {
			const { wrapper } = factory({
				bidCap: 12,
				impressions: 2000,
			})

			await nextTick()

			// Проверяем начальное значение: (2000 / 1000) * 12 = 24
			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('24 USD')

			// Убираем impressions
			await wrapper.setProps({
				modelValue: {
					bidCap: 12,
					impressions: undefined,
				},
			})

			await nextTick()

			// Проверяем что стало 0
			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})
	})
})
