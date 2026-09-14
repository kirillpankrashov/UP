import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'

import ColumnPlatform from '../ColumnPlatform.vue'

const ColumnPlatformTestHost = defineComponent({
	name: 'ColumnPlatformTestHost',
	components: { ColumnPlatform, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnPlatform :items="tableData" />
		</ElTable>
	`,
})

const tableRoutes = [
	{ path: '/', name: 'column-platform-test-root', component: { template: '<div />' } },
	{ path: '/sponsorship/campaigns', name: RouteName.BRAND_AWARENESS_CAMPAIGNS, component: { template: '<div />' } },
	{ path: '/sponsorship/groups', name: RouteName.BRAND_AWARENESS_ADSETS, component: { template: '<div />' } },
	{ path: '/sponsorship/creatives', name: RouteName.BRAND_AWARENESS_CREATIVES, component: { template: '<div />' } },
]

const createTableRouter = () =>
	createRouter({
		history: createMemoryHistory('/'),
		routes: tableRoutes,
	})

describe('Partner Campaigns ColumnPlatform Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[], routeName: RouteName) => {
		const router = createTableRouter()
		await router.push({ name: routeName })

		const wrapper = mount(ColumnPlatformTestHost, {
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

	const cellText = (wrapper: ReturnType<typeof mount>) =>
		wrapper.find('.el-table__body .el-table__cell').text().trim()

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Platform')
	})

	it('shows Twitch on ad sets when platform is Twitch', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_ADSETS)

		expect(cellText(wrapper)).toContain('Twitch')
	})

	it('shows Youtube on ad sets when platform is Youtube', async () => {
		const wrapper = await factory([{ platform: Platform.YOUTUBE }], RouteName.BRAND_AWARENESS_ADSETS)

		expect(cellText(wrapper)).toContain('Youtube')
	})

	it('shows Trovo on ad sets when platform is Trovo', async () => {
		const wrapper = await factory([{ platform: Platform.TROVO }], RouteName.BRAND_AWARENESS_ADSETS)

		expect(cellText(wrapper)).toContain('Trovo')
	})

	it('shows VK Play on ad sets when platform is VK Play', async () => {
		const wrapper = await factory([{ platform: Platform.VK_PLAY }], RouteName.BRAND_AWARENESS_ADSETS)

		expect(cellText(wrapper)).toContain('VK Play')
	})

	it('shows TikTok on ad sets when platform is TikTok', async () => {
		const wrapper = await factory([{ platform: Platform.TIKTOK }], RouteName.BRAND_AWARENESS_ADSETS)

		expect(cellText(wrapper)).toContain('TikTok')
	})

	it('uses ad set platform for creative rows', async () => {
		const wrapper = await factory([brandAwarenessCreative], RouteName.BRAND_AWARENESS_CREATIVES)

		expect(cellText(wrapper)).toContain('Twitch')
	})

	it('renders nothing when entity type is not ad sets or creatives', async () => {
		const wrapper = await factory([brandAwarenessAdset], RouteName.BRAND_AWARENESS_CAMPAIGNS)

		expect(cellText(wrapper)).toBe('')
	})
})
