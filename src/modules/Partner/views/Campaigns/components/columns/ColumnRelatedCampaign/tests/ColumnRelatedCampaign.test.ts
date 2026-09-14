import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'

import ColumnRelatedCampaign from '../ColumnRelatedCampaign.vue'

const ColumnRelatedCampaignTestHost = defineComponent({
	name: 'ColumnRelatedCampaignTestHost',
	components: { ColumnRelatedCampaign, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnRelatedCampaign :items="tableData" />
		</ElTable>
	`,
})

const createRouterForRelatedCampaign = () =>
	createRouter({
		history: createMemoryHistory('/'),
		routes: [
			{ path: '/', name: 'column-related-campaign-root', component: { template: '<div />' } },
			{ path: '/sponsorship/groups', name: RouteName.BRAND_AWARENESS_ADSETS, component: { template: '<div />' } },
			{ path: '/sponsorship/creatives', name: RouteName.BRAND_AWARENESS_CREATIVES, component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug', name: RouteName.CAMPAIGN_EDIT, component: { template: '<div />' } },
		],
	})

describe('Partner Campaigns ColumnRelatedCampaign Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[], routeName: RouteName) => {
		const router = createRouterForRelatedCampaign()
		await router.push({ name: routeName })

		const wrapper = mount(ColumnRelatedCampaignTestHost, {
			attachTo: document.body,
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
					router,
				],
			},
			props: { tableData },
		})

		await flushPromises()
		lastWrapper = wrapper

		return wrapper
	}

	const findLink = (wrapper: ReturnType<typeof mount>) =>
		wrapper.findComponent(RouterLink)

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Related Campaign')
	})

	it('links parent campaign title from ad set row to campaign edit route', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)
		const link = findLink(wrapper)

		expect(link.exists()).toBe(true)
		expect(link.text()).toBe(brandAwarenessAdset.campaign.title.default)
		expect(link.props('to')).toEqual({
			name: RouteName.CAMPAIGN_EDIT,
			params: { campaignSlug: brandAwarenessAdset.campaign.slug },
		})
	})

	it('links parent campaign title from creative row to campaign edit route', async () => {
		const wrapper = await factory([brandAwarenessCreative], RouteName.BRAND_AWARENESS_CREATIVES)
		const link = findLink(wrapper)

		expect(link.text()).toBe(brandAwarenessCreative.adSet.campaign.title.default)
		expect(link.props('to')).toEqual({
			name: RouteName.CAMPAIGN_EDIT,
			params: { campaignSlug: brandAwarenessCreative.adSet.campaign.slug },
		})
	})
})
