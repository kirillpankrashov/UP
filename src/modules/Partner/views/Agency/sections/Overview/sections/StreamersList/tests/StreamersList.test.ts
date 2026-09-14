import { nextTick, ref } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import StreamersList from '../StreamersList.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: any, _withCents = false) => `FMT-${value}`,
	}),
}))

vi.mock('moment', () => ({
	default: (value: any) => ({
		locale: () => ({
			format: () => `MOCK_DATE_${String(value)}`,
		}),
	}),
}))

vi.mock('@/components/element-plus', () => ({
	ElDrawer: {
		name: 'ElDrawer',
		props: ['modelValue', 'beforeClose', 'title', 'size'],
		template: `
			<div
				data-test="el-drawer"
				:data-model-value="String(modelValue)"
			>
				{{ title }}
				<slot />
			</div>
		`,
	},
	ElTable: {
		name: 'ElTable',
		props: ['data'],
		template: '<div data-test="el-table"><slot /></div>',
	},
	ElTableColumn: {
		name: 'ElTableColumn',
		props: ['label', 'prop', 'sortable'],
		template: '<div data-test="el-table-column">{{ label }}</div>',
	},
}))

describe('Partner Agency Overview StreamersList', () => {
	const factory = (streamers: { amount: number; data: any[] }) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency-referral': {
					streamers: {
						isFetched: true,
						isFetching: false,
						amount: streamers.amount,
						data: streamers.data,
					},
					referral: null,
					history: {
						isFetched: false,
						page: 1,
						perPage: 25,
						total: 0,
						amount: 0,
						data: [],
						loading: false,
					},
					historyDetail: {
						isFetched: false,
						page: 1,
						perPage: 25,
						total: 0,
						data: [],
						loading: false,
					},
				},
			},
		})

		const referralStore = useAgencyReferralStore(pinia)

		// Ensure state exists for the conditional rendering.
		referralStore.streamers.amount = streamers.amount
		referralStore.streamers.data = streamers.data

		const wrapper = mount(StreamersList, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					StreamersListSkeleton: {
						name: 'StreamersListSkeleton',
						template: '<div data-test="partner-agency-overview-streamers-list-skeleton" />',
					},
				},
			},
		})

		return { wrapper, referralStore }
	}

	it('renders table from store data', async () => {
		const { wrapper } = factory({
			amount: 123,
			data: [{ streamer: { name: 'Streamer 1' }, lastActivity: '2024-01-01', amount: 10 }],
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
		expect(wrapper.text()).toContain('creators.list.columns.creator')
	})

	it('renders skeleton while streamers are loading', async () => {
		const { wrapper, referralStore } = factory({ amount: 123, data: [] })
		referralStore.streamers.isFetching = true

		await nextTick()

		expect(wrapper.find('[data-test="partner-agency-overview-streamers-list-skeleton"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
	})

	it('toggles drawer visibility via exposed method', async () => {
		const { wrapper } = factory({ amount: 10, data: [] })

		const drawer = wrapper.find('[data-test="el-drawer"]')
		expect(drawer.attributes('data-model-value')).toBe('false')

		await (wrapper.vm as any).toggleSidebarVisibility()
		await nextTick()

		const drawerAfter = wrapper.find('[data-test="el-drawer"]')
		expect(drawerAfter.attributes('data-model-value')).toBe('true')
	})
})

