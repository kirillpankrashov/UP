import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import History from '../History.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number) => `FMT-${value}`,
	}),
}))

const toggleSidebarVisibilityMock = vi.fn()

vi.mock('@/components/layouts', () => ({
	DashboardSection: {
		name: 'DashboardSection',
		props: ['title', 'noBorder'],
		template: '<div data-test="dashboard-section"><slot /></div>',
	},
}))

vi.mock('@/components/element-plus', () => ({
	ElPagination: {
		name: 'ElPagination',
		props: ['currentPage'],
		template: '<button data-test="el-pagination" @click="$emit(\'current-change\', currentPage + 1)" />',
	},
	ElTable: {
		name: 'ElTable',
		props: ['data'],
		template: `
			<div data-test="el-table">
				<div
					v-for="row in data"
					:key="row.date"
					data-test="history-row"
					@click="$emit('row-click', row)"
				>
					{{ row.date }}
				</div>
			</div>
		`,
	},
	ElTableColumn: {
		name: 'ElTableColumn',
		template: '<div />',
		props: ['label', 'prop', 'width', 'align', 'sortable'],
	},
}))

describe('Partner Agency History section', () => {
	const createWrapper = (historyData: any[]) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const referralStore = useAgencyReferralStore(pinia)
		referralStore.history.data = historyData
		referralStore.history.isFetching = false
		referralStore.history.amount = 100
		referralStore.history.page = 1
		referralStore.history.perPage = 25
		referralStore.history.total = 2

		const wrapper = mount(History, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					HistorySkeleton: {
						name: 'HistorySkeleton',
						template: '<div data-test="creators-history-skeleton" />',
					},
					Detail: {
						name: 'Detail',
						template: '<div data-test="history-detail" />',
						methods: {
							toggleSidebarVisibility: toggleSidebarVisibilityMock,
						},
					},
				},
			},
		})

		return { wrapper, pinia, referralStore }
	}

	it('fetches history on mount and shows empty state when data is empty', async () => {
		toggleSidebarVisibilityMock.mockReset()
		const { referralStore, wrapper } = createWrapper([])

		await nextTick()

		expect(referralStore.fetchReferralHistory).toHaveBeenCalledTimes(1)
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.history.none')
	})

	it('renders table and handles row click (fetch detail + toggle sidebar)', async () => {
		toggleSidebarVisibilityMock.mockReset()
		const { referralStore, wrapper } = createWrapper([
			{
				date: '23.04.2024',
				amount: 10,
				streamer: { name: 'Streamer 1' },
			},
		])

		// clear mount-call noise for clarity
		;(referralStore.fetchReferralHistory as any).mockClear()

		await nextTick()

		const row = wrapper.find('[data-test="history-row"]')
		await row.trigger('click')

		expect(referralStore.fetchReferralHistoryDetail).toHaveBeenCalledWith('23-04-2024')
		expect(toggleSidebarVisibilityMock).toHaveBeenCalledTimes(1)
	})

	it('changes page via pagination (fetch history with next page)', async () => {
		const { referralStore, wrapper } = createWrapper([
			{
				date: '23.04.2024',
				amount: 10,
				streamer: { name: 'Streamer 1' },
			},
		])

		;(referralStore.fetchReferralHistory as any).mockClear()
		await nextTick()

		await wrapper.find('[data-test="el-pagination"]').trigger('click')

		expect(referralStore.fetchReferralHistory).toHaveBeenCalledWith(2)
	})

	it('renders skeleton while history is loading', async () => {
		const { referralStore, wrapper } = createWrapper([])
		referralStore.history.isFetching = true

		await nextTick()

		expect(wrapper.find('[data-test="creators-history-skeleton"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		expect(wrapper.text()).not.toContain('creators.history.none')
	})
})

