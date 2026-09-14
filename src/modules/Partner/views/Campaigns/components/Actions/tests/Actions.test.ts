import { defineComponent, ref, toRef } from 'vue'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'

import Actions from '../Actions.vue'

const createTestRouter = () =>
	createRouter({
		history: createMemoryHistory(),
		routes: [
			{ path: '/sponsorship/campaigns', name: RouteName.BRAND_AWARENESS_CAMPAIGNS, component: { template: '<div />' } },
			{ path: '/sponsorship/groups', name: RouteName.BRAND_AWARENESS_ADSETS, component: { template: '<div />' } },
			{ path: '/sponsorship/creatives', name: RouteName.BRAND_AWARENESS_CREATIVES, component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug/analytics', name: RouteName.ANALYTICS, component: { template: '<div />' } },
		],
	})

const ActionTableHost = defineComponent({
	name: 'ActionTableHost',
	components: { Actions, ElTable },
	props: {
		showAnalytics: { type: Boolean, default: true },
		tableData: { type: Array, default: () => [brandAwarenessCampaign] },
	},
	setup(props) {
		const columns = ref<Record<string, boolean>>({
			state: true,
			name: true,
			moderation: false,
		})
		const showAnalytics = toRef(props, 'showAnalytics')

		return { columns, showAnalytics }
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<Actions v-model="columns" :show-analytics="showAnalytics" />
		</ElTable>
	`,
})

describe('Partner Campaigns Actions Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	beforeEach(() => {
		window.localStorage.clear()
	})

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (
		options: { routeName: RouteName, showAnalytics?: boolean, tableData?: any[] } = { routeName: RouteName.BRAND_AWARENESS_CAMPAIGNS },
	) => {
		const router = createTestRouter()
		await router.push({ name: options.routeName })

		const wrapper = mount(ActionTableHost, {
			attachTo: document.body,
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
					router,
				],
			},
			props: {
				showAnalytics: options.showAnalytics ?? true,
				tableData: options.tableData,
			},
		})

		await flushPromises()
		lastWrapper = wrapper

		return { wrapper, router }
	}

	it('persists column visibility to localStorage when a filter checkbox changes', async () => {
		const { wrapper } = await factory()

		await wrapper.find('.cursor-pointer').trigger('click')
		await flushPromises()

		const stateCheckbox = document.querySelector<HTMLInputElement>('.el-popper input[name="state"]')
		expect(stateCheckbox).toBeTruthy()

		stateCheckbox!.checked = false
		stateCheckbox!.dispatchEvent(new Event('change', { bubbles: true }))
		await flushPromises()

		const raw = window.localStorage.getItem(TABLE_FILTER_KEY)
		expect(raw).toBeTruthy()
		const parsed = JSON.parse(raw as string)

		expect(parsed[CampaignType.BRAND_AWARENESS][AdEntityType.CAMPAIGNS]).toMatchObject({
			state: false,
			name: true,
			moderation: false,
		})
	})

	it('renders analytics link for campaign rows with correct route', async () => {
		const { wrapper } = await factory({ routeName: RouteName.BRAND_AWARENESS_CAMPAIGNS })

		const link = wrapper.findComponent(RouterLink)
		expect(link.exists()).toBe(true)
		expect(link.props('to')).toEqual({
			name: RouteName.ANALYTICS,
			params: { campaignSlug: brandAwarenessCampaign.slug },
			query: {
				start: '2024-09-16',
				end: '2024-09-29',
			},
			hash: undefined,
		})
	})

	it('renders analytics link for adset rows with parent campaign slug and #creatives hash', async () => {
		const { wrapper } = await factory({
			routeName: RouteName.BRAND_AWARENESS_ADSETS,
			tableData: [brandAwarenessAdset],
		})

		const link = wrapper.findComponent(RouterLink)
		expect(link.exists()).toBe(true)
		expect(link.props('to')).toEqual({
			name: RouteName.ANALYTICS,
			params: { campaignSlug: brandAwarenessAdset.campaign.slug },
			query: {
				start: '2025-02-19',
				end: '2025-03-18',
			},
			hash: '#creatives',
		})
	})

	it('renders analytics link for creative rows with grandparent campaign slug and #creatives hash', async () => {
		const { wrapper } = await factory({
			routeName: RouteName.BRAND_AWARENESS_CREATIVES,
			tableData: [brandAwarenessCreative],
		})

		const link = wrapper.findComponent(RouterLink)
		expect(link.exists()).toBe(true)
		expect(link.props('to')).toEqual({
			name: RouteName.ANALYTICS,
			params: { campaignSlug: brandAwarenessCreative.adSet.campaign.slug },
			query: {
				start: '2025-02-17',
				end: '2025-02-27',
			},
			hash: '#creatives',
		})
	})

	it('does not render analytics link when showAnalytics is false', async () => {
		const { wrapper } = await factory({ routeName: RouteName.BRAND_AWARENESS_CAMPAIGNS, showAnalytics: false })

		expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
	})

	it('shows column filter popover trigger', async () => {
		const { wrapper } = await factory()

		expect(wrapper.findComponent(Actions).exists()).toBe(true)
		expect(wrapper.find('.cursor-pointer').exists()).toBe(true)
	})
})
