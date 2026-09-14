import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import PPVA from '../PPVA.vue'

interface Model {
	bidCap: number | undefined
	impressions: number | undefined
	margin: number | undefined
	agencyCommission: number | undefined
	cpmPercent: number | undefined
	cpa: number | undefined
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

describe('FormAdset PPVA Budget', () => {
	const factory = (
		model: Model = {
			bidCap: undefined,
			impressions: undefined,
			margin: undefined,
			agencyCommission: undefined,
			cpmPercent: undefined,
			cpa: undefined,
		},
		advertiserCurrency = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(PPVA, {
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

		mockFormatCurrency.mockImplementation((amount, withSymbol, currencyCode) => {
			const roundedAmount = Math.round(amount * 100) / 100
			return `${roundedAmount} ${currencyCode || 'USD'}`
		})
	})

	describe('totalBudget calculation (base CPM)', () => {
		it('calculates total budget correctly when both bidCap and impressions are provided', async () => {
			const { wrapper } = factory({
				bidCap: 10, // $10 per 1000 impressions
				impressions: 5000, // 5000 impressions
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				cpa: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			// Expected: (5000 / 1000) * 10 = 5 * 10 = 50
			expect(totalBudgetElement.text()).toBe('50 USD')
			expect(mockFormatCurrency).toHaveBeenCalled()
		})

		it('returns 0 when bidCap is not provided', async () => {
			const { wrapper } = factory({
				bidCap: undefined,
				impressions: 5000,
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				cpa: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})

		it('returns 0 when impressions is not provided', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: undefined,
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				cpa: undefined,
			})

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('0')
		})
	})

	describe('totalBudgetPPVA breakdown calculation', () => {
		it('returns empty array when required fields are missing', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: 5000,
				margin: undefined, // missing
				agencyCommission: 10,
				cpmPercent: 50,
				cpa: 25,
			})

			await nextTick()

			const breakdownContainer = wrapper.find('[data-test="adset-budget-ppva-breakdown"]')
			expect(breakdownContainer.findAll('[data-test^="adset-budget-ppva-item-"]')).toHaveLength(0)
		})

		it('calculates full breakdown when all fields are provided', async () => {
			const { wrapper } = factory({
				bidCap: 10, // $10 per 1000 impressions
				impressions: 5000, // 5000 impressions = total budget $50
				margin: 20, // 20% of $50 = $10
				agencyCommission: 10, // 10% of $50 = $5
				cpmPercent: 60, // 60% of remaining $35 = $21 (CPM)
				cpa: 25, // $25 per conversion, remainder $14 (CPA) / $25 = 0.6 conversions
			})

			await nextTick()

			const breakdownItems = wrapper.findAll('[data-test^="adset-budget-ppva-item-"]')
			expect(breakdownItems).toHaveLength(7) // 7 items in the breakdown

			// Check if all breakdown items are rendered
			expect(wrapper.find('[data-test="adset-budget-ppva-item-0"]').exists()).toBe(true) // totalBudget
			expect(wrapper.find('[data-test="adset-budget-ppva-item-1"]').exists()).toBe(true) // margin
			expect(wrapper.find('[data-test="adset-budget-ppva-item-2"]').exists()).toBe(true) // agencyCommission
			expect(wrapper.find('[data-test="adset-budget-ppva-item-3"]').exists()).toBe(true) // creatorsPayout
			expect(wrapper.find('[data-test="adset-budget-ppva-item-4"]').exists()).toBe(true) // conversion
			expect(wrapper.find('[data-test="adset-budget-ppva-item-5"]').exists()).toBe(true) // creatorsCPM
			expect(wrapper.find('[data-test="adset-budget-ppva-item-6"]').exists()).toBe(true) // creatorsCPA
		})

		it('calculates margin correctly', async () => {
			// Test specific calculation: total budget $100, margin 15% = $15
			mockFormatCurrency.mockImplementation((amount) => {
				if (amount === 100) return '100 USD'
				if (amount === 15) return '15 USD'
				if (amount === 8.5) return '8.5 USD'
				if (amount === 76.5) return '76.5 USD'
				if (amount === 45.9) return '45.9 USD'
				if (amount === 30.6) return '30.6 USD'
				return `${Math.round(amount * 100) / 100} USD`
			})

			const { wrapper } = factory({
				bidCap: 10,
				impressions: 10000, // Total budget: (10000 / 1000) * 10 = $100
				margin: 15, // 15% of $100 = $15
				agencyCommission: 8.5, // 8.5% of $100 = $8.5
				cpmPercent: 60, // 60% of remaining $76.5 = $45.9
				cpa: 50, // CPA value
			})

			await nextTick()

			const marginItem = wrapper.find('[data-test="adset-budget-ppva-item-1"] b')
			expect(marginItem.text()).toContain('15 USD (15%)')
		})

		it('calculates agency commission correctly', async () => {
			mockFormatCurrency.mockImplementation((amount) => {
				if (amount === 100) return '100 USD'
				if (amount === 12) return '12 USD'
				return `${Math.round(amount * 100) / 100} USD`
			})

			const { wrapper } = factory({
				bidCap: 10,
				impressions: 10000, // Total budget: $100
				margin: 10, // 10% of $100 = $10
				agencyCommission: 12, // 12% of $100 = $12
				cpmPercent: 50,
				cpa: 30,
			})

			await nextTick()

			const agencyCommissionItem = wrapper.find('[data-test="adset-budget-ppva-item-2"] b')
			expect(agencyCommissionItem.text()).toContain('12 USD (12%)')
		})

		it('calculates creators payout (CPM/CPA split) correctly', async () => {
			mockFormatCurrency.mockImplementation((amount) => {
				if (amount === 100) return '100 USD' // Total budget
				if (amount === 60) return '60 USD' // CPM part
				if (amount === 40) return '40 USD' // CPA part
				if (amount === 0) return '0 USD' // Zero values
				return `${Math.round(amount * 100) / 100} USD`
			})

			const { wrapper } = factory({
				bidCap: 10,
				impressions: 10000, // Total budget: $100
				margin: 0, // No margin
				agencyCommission: 0, // No commission, remainder = $100
				cpmPercent: 60, // 60% of $100 = $60 (CPM)
				cpa: 25, // CPA part = $100 - $60 = $40
			})

			await nextTick()

			const creatorsPayoutItem = wrapper.find('[data-test="adset-budget-ppva-item-3"] b')
			expect(creatorsPayoutItem.text()).toContain('60 USD (CPM) / 40 USD (CPA)')
		})

		it('calculates conversion count correctly', async () => {
			const { wrapper } = factory({
				bidCap: 20,
				impressions: 5000, // Total budget: (5000 / 1000) * 20 = $100
				margin: 0, // No margin
				agencyCommission: 0, // No commission
				cpmPercent: 0, // All budget goes to CPA
				cpa: 25, // $25 per conversion: $100 / $25 = 4 conversions
			})

			await nextTick()

			const conversionItem = wrapper.find('[data-test="adset-budget-ppva-item-4"] b')
			expect(conversionItem.text()).toBe('4') // Exact conversion count
		})

		it('handles decimal conversions correctly', async () => {
			const { wrapper } = factory({
				bidCap: 15,
				impressions: 4000, // Total budget: (4000 / 1000) * 15 = $60
				margin: 0, // No margin
				agencyCommission: 0, // No commission
				cpmPercent: 0, // All budget goes to CPA
				cpa: 17, // $60 / $17 = 3.529... rounds to 3.5
			})

			await nextTick()

			const conversionItem = wrapper.find('[data-test="adset-budget-ppva-item-4"] b')
			expect(conversionItem.text()).toBe('3.5') // Rounded to 1 decimal place
		})
	})

	describe('currency handling', () => {
		it('handles missing currency gracefully', async () => {
			const { wrapper } = factory(
				{
					bidCap: 5,
					impressions: 2000,
					margin: undefined,
					agencyCommission: undefined,
					cpmPercent: undefined,
					cpa: undefined,
				},
				undefined,
			)

			await nextTick()

			const totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('10 USD') // fallback to USD
		})
	})

	describe('model updates', () => {
		it('recalculates when basic fields change', async () => {
			const { wrapper } = factory({
				bidCap: 8,
				impressions: 2500,
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				cpa: undefined,
			})

			await nextTick()

			// Initial calculation: (2500 / 1000) * 8 = 20
			let totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('20 USD')

			// Update model
			await wrapper.setProps({
				modelValue: {
					bidCap: 12,
					impressions: 5000,
					margin: undefined,
					agencyCommission: undefined,
					cpmPercent: undefined,
					cpa: undefined,
				},
			})

			await nextTick()

			// New calculation: (5000 / 1000) * 12 = 60
			totalBudgetElement = wrapper.find('[data-test="adset-budget-total-budget"] b')
			expect(totalBudgetElement.text()).toBe('60 USD')
		})

		it('shows breakdown when all PPVA fields are provided', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: 3000,
				margin: undefined,
				agencyCommission: undefined,
				cpmPercent: undefined,
				cpa: undefined,
			})

			await nextTick()

			// Initially no breakdown items
			let breakdownItems = wrapper.findAll('[data-test^="adset-budget-ppva-item-"]')
			expect(breakdownItems).toHaveLength(0)

			// Add all required PPVA fields
			await wrapper.setProps({
				modelValue: {
					bidCap: 10,
					impressions: 3000,
					margin: 15,
					agencyCommission: 10,
					cpmPercent: 70,
					cpa: 20,
				},
			})

			await nextTick()

			// Now breakdown should be visible
			breakdownItems = wrapper.findAll('[data-test^="adset-budget-ppva-item-"]')
			expect(breakdownItems).toHaveLength(7)
		})

		it('hides breakdown when required PPVA field is removed', async () => {
			const { wrapper } = factory({
				bidCap: 10,
				impressions: 3000,
				margin: 15,
				agencyCommission: 10,
				cpmPercent: 70,
				cpa: 20,
			})

			await nextTick()

			// Initially breakdown should be visible
			let breakdownItems = wrapper.findAll('[data-test^="adset-budget-ppva-item-"]')
			expect(breakdownItems).toHaveLength(7)

			// Remove one required field
			await wrapper.setProps({
				modelValue: {
					bidCap: 10,
					impressions: 3000,
					margin: undefined, // Remove margin
					agencyCommission: 10,
					cpmPercent: 70,
					cpa: 20,
				},
			})

			await nextTick()

			// Breakdown should be hidden
			breakdownItems = wrapper.findAll('[data-test^="adset-budget-ppva-item-"]')
			expect(breakdownItems).toHaveLength(0)
		})
	})
})
