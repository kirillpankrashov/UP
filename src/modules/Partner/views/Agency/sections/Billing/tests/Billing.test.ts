import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useBillingStore } from '@/modules/Partner/views/Agency/store'

import Billing from '../Billing.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))
vi.mock('@/modules/Partner/views/Agency/api')

describe('Partner Agency Billing section', () => {
	const factory = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const billingStore = useBillingStore(pinia)

		const wrapper = mount(Billing, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					Form: {
						name: 'Form',
						template: '<div data-test="billing-form" />',
					},
					Invoices: {
						name: 'Invoices',
						template: '<div data-test="billing-invoices" />',
					},
				},
			},
		})

		return { wrapper, billingStore }
	}

	it('renders Form and Invoices', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="billing-form"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="billing-invoices"]').exists()).toBe(true)
	})

	it('fetches billing and invoices on mount', async () => {
		const { billingStore } = factory()

		await nextTick()

		expect(billingStore.fetchBilling).toHaveBeenCalledTimes(1)
		expect(billingStore.fetchInvoices).toHaveBeenCalledTimes(1)
	})
})

