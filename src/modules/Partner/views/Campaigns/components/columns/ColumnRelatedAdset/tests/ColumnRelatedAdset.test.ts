import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'

import ColumnRelatedAdset from '../ColumnRelatedAdset.vue'

const ColumnRelatedAdsetTestHost = defineComponent({
	name: 'ColumnRelatedAdsetTestHost',
	components: { ColumnRelatedAdset, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnRelatedAdset :items="tableData" />
		</ElTable>
	`,
})

const createRouterForRelatedAdset = () =>
	createRouter({
		history: createMemoryHistory('/'),
		routes: [
			{ path: '/', name: 'column-related-adset-root', component: { template: '<div />' } },
			{ path: '/sponsorship/creatives', name: RouteName.BRAND_AWARENESS_CREATIVES, component: { template: '<div />' } },
			{ path: '/campaign/:campaignSlug/group/:adsetSlug', name: RouteName.ADSET_EDIT, component: { template: '<div />' } },
		],
	})

describe('Partner Campaigns ColumnRelatedAdset Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[]) => {
		const router = createRouterForRelatedAdset()
		await router.push({ name: RouteName.BRAND_AWARENESS_CREATIVES })

		const wrapper = mount(ColumnRelatedAdsetTestHost, {
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
		const wrapper = await factory([brandAwarenessCreative])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Related Group')
	})

	it('links related ad set title to ad set edit route', async () => {
		const wrapper = await factory([brandAwarenessCreative])
		const link = findLink(wrapper)

		expect(link.exists()).toBe(true)
		expect(link.text()).toBe(brandAwarenessCreative.adSet.title)
		expect(link.props('to')).toEqual({
			name: RouteName.ADSET_EDIT,
			params: {
				campaignSlug: brandAwarenessCreative.adSet.campaign.slug,
				adsetSlug: brandAwarenessCreative.adSet.slug,
			},
		})
	})
})
