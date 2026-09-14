import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'

import ColumnBudget from '../ColumnBudget.vue'

const ProgressStub = defineComponent({
	name: 'Progress',
	props: ['current', 'total', 'text', 'forecast', 'currency'],
	template: '<div data-test="progress-stub" />',
})

const ColumnBudgetTestHost = defineComponent({
	name: 'ColumnBudgetTestHost',
	components: { ColumnBudget, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnBudget :items="tableData" />
		</ElTable>
	`,
})

const tableRoutes = [
	{ path: '/sponsorship/campaigns', name: RouteName.BRAND_AWARENESS_CAMPAIGNS, component: { template: '<div />' } },
	{ path: '/sponsorship/groups', name: RouteName.BRAND_AWARENESS_ADSETS, component: { template: '<div />' } },
	{ path: '/sponsorship/creatives', name: RouteName.BRAND_AWARENESS_CREATIVES, component: { template: '<div />' } },
]

const createTableRouter = () =>
	createRouter({
		history: createMemoryHistory(),
		routes: tableRoutes,
	})

describe('Partner Campaigns ColumnBudget Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
		vi.useRealTimers()
	})

	const factory = async (
		tableData: unknown[],
		routeName: RouteName,
	) => {
		const router = createTableRouter()
		await router.push({ name: routeName })

		const wrapper = mount(ColumnBudgetTestHost, {
			attachTo: document.body,
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
					router,
				],
				stubs: {
					Progress: ProgressStub,
				},
			},
			props: { tableData },
		})

		await flushPromises()
		lastWrapper = wrapper

		return wrapper
	}

	const findProgress = (wrapper: ReturnType<typeof mount>) =>
		wrapper.findComponent(ProgressStub)

	it('passes budget and campaign advertiser currency to Progress on campaigns route', async () => {
		const wrapper = await factory([brandAwarenessCampaign], RouteName.BRAND_AWARENESS_CAMPAIGNS)
		const progress = findProgress(wrapper)

		expect(progress.exists()).toBe(true)
		expect(progress.props('current')).toBe(brandAwarenessCampaign.budget.current)
		expect(progress.props('total')).toBe(brandAwarenessCampaign.budget.total)
		expect(progress.props('currency')).toBe(brandAwarenessCampaign.advertiser.wallet.currency.code)
		expect(String(progress.props('text'))).toMatch(/\d/)
		expect(progress.props('forecast')).not.toBeUndefined()
	})

	it('passes ad set campaign advertiser currency to Progress on ad sets route', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)
		const progress = findProgress(wrapper)

		expect(progress.exists()).toBe(true)
		expect(progress.props('currency')).toBe(
			brandAwarenessAdset.campaign.advertiser.wallet.currency.code,
		)
		expect(progress.props('current')).toBe(brandAwarenessAdset.budget.current)
		expect(progress.props('total')).toBe(brandAwarenessAdset.budget.total)
	})

	it('uses USD as fallback currency on creatives route', async () => {
		const wrapper = await factory([brandAwarenessCampaign], RouteName.BRAND_AWARENESS_CREATIVES)
		const progress = findProgress(wrapper)

		expect(progress.props('currency')).toBe(CurrencyName.USD)
	})

	it('passes forecast 0 when the campaign has ended before today', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const row = {
			...brandAwarenessCampaign,
			dates: { start: '01.06.2025', end: '14.06.2025' },
			budget: { current: 1000, total: 5000 },
			impressions: { current: 500, total: 10000 },
			avgCpm: 20,
		}

		const wrapper = await factory([row], RouteName.BRAND_AWARENESS_CAMPAIGNS)
		expect(findProgress(wrapper).props('forecast')).toBe(0)
	})

	it('passes total budget as forecast on the first day of the period', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const row = {
			...brandAwarenessCampaign,
			dates: { start: '15.06.2025', end: '30.06.2025' },
			budget: { current: 100, total: 8000 },
			impressions: { current: 10, total: 100 },
			avgCpm: 15,
		}

		const wrapper = await factory([row], RouteName.BRAND_AWARENESS_CAMPAIGNS)
		expect(findProgress(wrapper).props('forecast')).toBe(8000)
	})

	it('clamps forecast to current spend when projection is below current', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 10, 12, 0, 0))

		const row = {
			...brandAwarenessCampaign,
			dates: { start: '01.06.2025', end: '30.06.2025' },
			budget: { current: 9000, total: 10000 },
			impressions: { current: 100, total: 100000 },
			avgCpm: 1,
		}

		const wrapper = await factory([row], RouteName.BRAND_AWARENESS_CAMPAIGNS)
		expect(findProgress(wrapper).props('forecast')).toBe(9000)
	})

	it('clamps forecast to total budget when projection exceeds total', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 10, 12, 0, 0))

		const row = {
			...brandAwarenessCampaign,
			dates: { start: '01.06.2025', end: '30.06.2025' },
			budget: { current: 500, total: 6000 },
			impressions: { current: 50000, total: 200000 },
			avgCpm: 500,
		}

		const wrapper = await factory([row], RouteName.BRAND_AWARENESS_CAMPAIGNS)
		expect(findProgress(wrapper).props('forecast')).toBe(6000)
	})
})
