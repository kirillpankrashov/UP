import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import type { IAdsetAnalyticsDay } from '@/modules/Streamer/views/Campaigns/api'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

import Table from '../Table.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns Analytics Table', () => {
	const mockAnalyticsData: IAdsetAnalyticsDay[] = [
		{
			date: '2024-01-01',
			impressions: 1000,
			clicks: 100,
			botClicks: 10,
			ctr: 10,
		},
		{
			date: '2024-01-02',
			impressions: 2000,
			clicks: 200,
			botClicks: 20,
			ctr: 20,
		},
		// Пустая строка для проверки фильтрации
		{
			date: '2024-01-03',
			impressions: 0,
			clicks: 0,
			botClicks: 0,
			ctr: 0,
		},
	]

	const factory = () => {
		const wrapper = mount(Table, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					// ElTable: true,
					ElTableColumn: true,
				},
			},
		})

		const analyticsStore = useCampaignAnalyticsStore()
		analyticsStore.data = mockAnalyticsData

		return { wrapper, analyticsStore }
	}

	describe('Component rendering', () => {
		it('renders all required columns', () => {
			const { wrapper } = factory()
			const columns = wrapper.findAllComponents({ name: 'ElTableColumn' })

			expect(columns).toHaveLength(5)

			const columnLabels = [
				'campaigns.analytics.fields.date',
				'campaigns.analytics.fields.impressions',
				'campaigns.analytics.fields.clicks',
				'campaigns.analytics.fields.botClicks',
				'campaigns.analytics.fields.ctr',
			]

			columns.forEach((column, index) => {
				expect(column.props('label')).toBe(columnLabels[index])
			})
		})
	})

	describe('Table data', () => {
		it('filters out rows with all zero values', async () => {
			const { wrapper } = factory()
			await nextTick()

			const table = wrapper.findComponent({ name: 'ElTable' })
			const tableData = table.props('data')

			expect(tableData).toHaveLength(2)
			expect(tableData).toEqual([
				{
					date: '2024-01-01',
					impressions: 1000,
					clicks: 100,
					botClicks: 10,
					ctr: 10,
				},
				{
					date: '2024-01-02',
					impressions: 2000,
					clicks: 200,
					botClicks: 20,
					ctr: 20,
				},
			])
		})

		it('updates table when analytics data changes', async () => {
			const { wrapper, analyticsStore } = factory()

			const newData: IAdsetAnalyticsDay[] = [{
				date: '2024-01-03',
				impressions: 3000,
				clicks: 300,
				botClicks: 30,
				ctr: 30,
			}]

			analyticsStore.data = newData
			await nextTick()

			const table = wrapper.findComponent({ name: 'ElTable' })
			const tableData = table.props('data')

			expect(tableData).toHaveLength(1)
			expect(tableData[0]).toEqual({
				date: '2024-01-03',
				impressions: 3000,
				clicks: 300,
				botClicks: 30,
				ctr: 30,
			})
		})

		it('handles empty analytics data', async () => {
			const { wrapper, analyticsStore } = factory()

			analyticsStore.data = []
			await nextTick()

			const table = wrapper.findComponent({ name: 'ElTable' })
			const tableData = table.props('data')

			expect(tableData).toHaveLength(0)
		})
	})
})
