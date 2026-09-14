import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import CPC from '../CPC.vue'

interface Model {
	cpc: number | undefined
	clicks: number | undefined
	cpcDailyLimit: number | undefined
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

describe('FormAdset CPC Budget', () => {
	const factory = (
		model: Model = { cpc: undefined, clicks: undefined, cpcDailyLimit: undefined },
		advertiserCurrency = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(CPC, {
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
		it('calculates total budget correctly when both cpc and clicks are provided', async () => {
			const { wrapper } = factory({
				cpc: 5,
				clicks: 100,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('500 USD')
			// Проверяем что функция была вызвана с правильной суммой
			expect(mockFormatCurrency).toHaveBeenCalledWith(500, true, expect.anything())
		})

		it('returns 0 when cpc is not provided', async () => {
			const { wrapper } = factory({
				cpc: undefined,
				clicks: 100,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when clicks is not provided', async () => {
			const { wrapper } = factory({
				cpc: 5,
				clicks: undefined,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when both cpc and clicks are not provided', async () => {
			const { wrapper } = factory()

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('handles zero values correctly', async () => {
			const { wrapper } = factory({
				cpc: 0,
				clicks: 100,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('calculates with decimal CPC values', async () => {
			const { wrapper } = factory({
				cpc: 2.5,
				clicks: 50,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('125 USD')
			// Проверяем что функция была вызвана с правильной суммой
			expect(mockFormatCurrency).toHaveBeenCalledWith(125, true, expect.anything())
		})

		it('calculates with large click values', async () => {
			const { wrapper } = factory({
				cpc: 1,
				clicks: 1000,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('1000 USD')
			expect(mockFormatCurrency).toHaveBeenCalledWith(1000, true, expect.anything())
		})
	})

	describe('currency handling', () => {
		it('calls formatCurrency with correct parameters', async () => {
			factory({
				cpc: 3,
				clicks: 50,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			expect(mockFormatCurrency).toHaveBeenCalledWith(150, true, expect.anything())
		})

		it('handles missing currency gracefully', async () => {
			const { wrapper } = factory(
				{
					cpc: 2,
					clicks: 75,
					cpcDailyLimit: undefined,
				},
				undefined,
			)

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('150 USD') // fallback to USD
		})
	})

	describe('model updates', () => {
		it('recalculates total budget when model changes', async () => {
			const { wrapper } = factory({
				cpc: 2,
				clicks: 25,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('50 USD')

			await wrapper.setProps({
				modelValue: {
					cpc: 4,
					clicks: 50,
					cpcDailyLimit: undefined,
				},
			})

			await nextTick()

			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('200 USD')
		})

		it('updates when only CPC value changes', async () => {
			const { wrapper } = factory({
				cpc: 1,
				clicks: 100,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			await wrapper.setProps({
				modelValue: {
					cpc: 3,
					clicks: 100,
					cpcDailyLimit: undefined,
				},
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('300 USD')
		})

		it('updates when only clicks value changes', async () => {
			const { wrapper } = factory({
				cpc: 2,
				clicks: 50,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			await wrapper.setProps({
				modelValue: {
					cpc: 2,
					clicks: 150,
					cpcDailyLimit: undefined,
				},
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('300 USD')
		})

		it('resets to 0 when required value is removed', async () => {
			const { wrapper } = factory({
				cpc: 5,
				clicks: 20,
				cpcDailyLimit: undefined,
			})

			await nextTick()

			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('100 USD')

			await wrapper.setProps({
				modelValue: {
					cpc: 5,
					clicks: undefined,
					cpcDailyLimit: undefined,
				},
			})

			await nextTick()

			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})
	})
})
