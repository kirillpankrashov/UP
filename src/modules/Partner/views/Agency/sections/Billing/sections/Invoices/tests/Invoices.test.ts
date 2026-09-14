import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import Invoices from '../Invoices.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))
vi.mock('@/modules/Partner/views/Agency/api')

vi.mock('@/components/element-plus', () => ({
	ElTable: {
		name: 'ElTable',
		props: ['data'],
		template: `
			<div data-test="invoices-table">
				<div v-for="row in data" :key="row.invoice || row.date" data-test="invoice-row">
					{{ row.invoice ? 'has-invoice' : 'no-invoice' }}
				</div>
				<slot />
			</div>
		`,
	},
	ElTableColumn: {
		name: 'ElTableColumn',
		props: ['label', 'prop', 'align'],
		template: '<div />',
	},
	ElPagination: {
		name: 'ElPagination',
		props: ['currentPage'],
		template: '<button data-test="el-pagination" @click="$emit(\'current-change\', currentPage + 1)" />',
	},
	ElSkeleton: {
		name: 'ElSkeleton',
		props: ['loading', 'animated'],
		template: '<div data-test="el-skeleton"><slot name="template" /></div>',
	},
	ElSkeletonItem: {
		name: 'ElSkeletonItem',
		props: ['variant', 'class', 'style'],
		template: '<span data-test="el-skeleton-item" />',
	},
}))

describe('Agency Billing Invoices', () => {
	const createWrapper = (invoices: any[]) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency-billing': {
					isFetchingData: false,
					isFormUpdating: false,
					billing: null,
					invoices: {
						total: invoices.length,
						perPage: 10,
						page: 2,
						data: invoices,
						loading: false,
						isFetched: true,
					},
				},
			},
		})

		const wrapper = mount(Invoices, {
			global: {
				plugins: [i18n, pinia],
				stubs: {},
			},
		})

		return { wrapper, pinia }
	}

	it('shows skeleton while invoices are loading and no rows yet', async () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency-billing': {
					isFetchingData: false,
					isFormUpdating: false,
					billing: null,
					invoices: {
						total: 0,
						perPage: 10,
						page: 1,
						data: [],
						loading: true,
						isFetched: false,
					},
				},
			},
		})

		const wrapper = mount(Invoices, {
			global: {
				plugins: [i18n, pinia],
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="partner-agency-invoices-skeleton"]').exists()).toBe(true)
		expect(wrapper.text()).not.toContain('creators.creatorsTable.none')
		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(false)
	})

	it('shows empty state when no invoices', () => {
		const { wrapper } = createWrapper([])

		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.creatorsTable.none')
	})

	it('renders table and pagination when invoices exist', () => {
		const invoices = [
			{ date: '2024-01-01', amount: 10, currency: { code: 'usd', flag: '$' }, invoice: 'https://example.com/1.pdf' },
			{ date: '2024-01-02', amount: 20, currency: { code: 'rub', flag: '₽' }, invoice: null },
		]

		const { wrapper } = createWrapper(invoices)

		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
		expect(wrapper.findAll('[data-test="invoice-row"]')).toHaveLength(2)
		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(true)
	})

	it('calls fetchInvoices with the next page on pagination change', async () => {
		const invoices = [
			{ date: '2024-01-01', amount: 10, currency: { code: 'usd', flag: '$' }, invoice: 'https://example.com/1.pdf' },
		]

		const { wrapper } = createWrapper(invoices)

		// ElPagination stub emits currentPage + 1
		const button = wrapper.find('[data-test="el-pagination"]')
		await button.trigger('click')

		const billingStore = (wrapper.vm as any).billingStore
		expect(billingStore.fetchInvoices).toHaveBeenCalledWith(3)
	})
})

