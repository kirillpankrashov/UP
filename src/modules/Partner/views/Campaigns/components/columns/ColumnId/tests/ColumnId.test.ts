import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'
import { getRouterLink } from '@/modules/Partner/views/Campaigns/helpers'

import ColumnId from '../ColumnId.vue'

const ColumnIdTestHost = defineComponent({
	name: 'ColumnIdTestHost',
	components: { ColumnId, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnId :items="tableData" />
		</ElTable>
	`,
})

const createRouterForColumnId = () =>
	createRouter({
		history: createMemoryHistory('/'),
		routes: [
			{ path: '/', name: 'column-id-test-root', component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug', name: RouteName.CAMPAIGN_EDIT, component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug/group/:adsetSlug', name: RouteName.ADSET_EDIT, component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug/group/:adsetSlug/creative/:creativeSlug', name: RouteName.CREATIVE_EDIT, component: { template: '<div />' } },
		],
	})

describe('Partner Campaigns ColumnId Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[]) => {
		const router = createRouterForColumnId()

		const wrapper = mount(ColumnIdTestHost, {
			attachTo: document.body,
			global: {
				plugins: [i18n, router],
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
		const wrapper = await factory([brandAwarenessCampaign])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('ID')
	})

	it('links campaign slug to campaign edit route', async () => {
		const wrapper = await factory([brandAwarenessCampaign])
		const link = findLink(wrapper)

		expect(link.exists()).toBe(true)
		expect(link.text()).toBe(brandAwarenessCampaign.slug)
		expect(link.props('to')).toEqual(getRouterLink(brandAwarenessCampaign))
	})

	it('links ad set slug to ad set edit route', async () => {
		const wrapper = await factory([brandAwarenessAdset])
		const link = findLink(wrapper)

		expect(link.text()).toBe(brandAwarenessAdset.slug)
		expect(link.props('to')).toEqual(getRouterLink(brandAwarenessAdset))
	})

	it('links creative slug to creative edit route', async () => {
		const wrapper = await factory([brandAwarenessCreative])
		const link = findLink(wrapper)

		expect(link.text()).toBe(brandAwarenessCreative.slug)
		expect(link.props('to')).toEqual(getRouterLink(brandAwarenessCreative))
	})
})
