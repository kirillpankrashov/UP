import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'

import ColumnFormat from '../ColumnFormat.vue'

const ColumnFormatTestHost = defineComponent({
	name: 'ColumnFormatTestHost',
	components: { ColumnFormat, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnFormat :items="tableData" />
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

describe('Partner Campaigns ColumnFormat Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[], routeName: RouteName) => {
		const router = createTableRouter()
		await router.push({ name: routeName })

		const wrapper = mount(ColumnFormatTestHost, {
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

	const bodyCellText = (wrapper: ReturnType<typeof mount>) =>
		wrapper.find('.el-table__body .el-table__cell').text().trim()

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Format')
	})

	it('shows ad set format title on ad sets route', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)

		expect(bodyCellText(wrapper)).toBe(brandAwarenessAdset.format.title)
	})

	it('shows creative parent ad set format title on creatives route', async () => {
		const row = {
			...brandAwarenessCreative,
			adSet: {
				...brandAwarenessCreative.adSet,
				format: {
					...brandAwarenessCreative.adSet.format,
					title: 'Format-from-ad-set',
				},
			},
		}

		const wrapper = await factory([row], RouteName.BRAND_AWARENESS_CREATIVES)

		expect(bodyCellText(wrapper)).toBe('Format-from-ad-set')
	})

	it('shows en dash when entity is not ad sets or creatives', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_CAMPAIGNS)

		expect(bodyCellText(wrapper)).toBe('–')
	})
})
