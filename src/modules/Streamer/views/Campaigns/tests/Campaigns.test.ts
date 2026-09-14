import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useCampaignAnalyticsStore, useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Campaigns from '../Campaigns.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: (key: string) => key }),
}))

vi.mock('@vueuse/core', () => ({
	useTitle: vi.fn(),
}))

describe('Streamer Campaigns', () => {
	const factory = (storeOverrides: {
		campaigns?: Record<string, any>
		settings?: Record<string, any>
		analytics?: Record<string, any>
	} = {}) => {
		const wrapper = mount(Campaigns, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							campaigns: storeOverrides.campaigns ?? {},
							settings: storeOverrides.settings ?? {},
							campaignAnalytics: storeOverrides.analytics ?? {},
						},
					}),
				],
				stubs: {
					DashboardLayout: {
						name: 'DashboardLayout',
						template: '<div data-test="dashboard-layout" v-bind="$attrs"><slot /></div>',
						props: ['fullWidth'],
					},
					DashboardTitle: {
						name: 'DashboardTitle',
						template: '<div data-test="dashboard-title"></div>',
						props: ['title'],
					},
					ElTabs: {
						name: 'ElTabs',
						template: '<div data-test="el-tabs"><slot /></div>',
						props: ['modelValue'],
						emits: ['update:modelValue'],
					},
					ElTabPane: {
						name: 'ElTabPane',
						template: '<div data-test="el-tab-pane"><slot /></div>',
						props: ['name', 'label', 'lazy'],
					},
					CurrentPlatform: {
						name: 'CurrentPlatform',
						template: '<div data-test="current-platform"></div>',
					},
					UplifyLink: {
						name: 'UplifyLink',
						template: '<div data-test="uplify-link"></div>',
					},
					AdsetsActive: {
						name: 'AdsetsActive',
						template: '<div data-test="adsets-active"></div>',
					},
					AdsetsClosed: {
						name: 'AdsetsClosed',
						template: '<div data-test="adsets-closed"></div>',
					},
					AdsetInfo: {
						name: 'AdsetInfo',
						template: '<div data-test="adset-info"></div>',
					},
					Analytics: {
						name: 'Analytics',
						template: '<div data-test="analytics"></div>',
					},
				},
			},
		})

		const campaignsStore = useCampaignsStore()
		const settingsStore = useSettingsStore()
		const analyticsStore = useCampaignAnalyticsStore()

		return { wrapper, campaignsStore, settingsStore, analyticsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders Analytics and hides main content when analyticsStore.isActive is true', async () => {
		const { wrapper, analyticsStore } = factory()

		analyticsStore.isActive = true
		await nextTick()

		expect(wrapper.find('[data-test="analytics"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="dashboard-title"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="el-tabs"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="adset-info"]').exists()).toBe(false)
	})

	it('renders main content and hides Analytics when analyticsStore.isActive is false', async () => {
		const { wrapper, settingsStore } = factory()

		settingsStore.widget = { id: 1 } as any
		await nextTick()

		expect(wrapper.find('[data-test="analytics"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="dashboard-title"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-tabs"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-info"]').exists()).toBe(true)
	})

	it('does not render ElTabs when settingsStore.widget is null', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="el-tabs"]').exists()).toBe(false)
	})

	it('renders ElTabs when settingsStore.widget is set', async () => {
		const { wrapper, settingsStore } = factory()

		settingsStore.widget = { id: 1 } as any
		await nextTick()

		expect(wrapper.find('[data-test="el-tabs"]').exists()).toBe(true)
	})

	it('always renders AdsetInfo alongside tabs when analytics is not active', async () => {
		const { wrapper, settingsStore } = factory()

		settingsStore.widget = { id: 1 } as any
		await nextTick()

		expect(wrapper.find('[data-test="adset-info"]').exists()).toBe(true)
	})

	it('passes full-width true to DashboardLayout when analyticsStore.isActive', async () => {
		const { wrapper, analyticsStore } = factory()

		analyticsStore.isActive = true
		await nextTick()

		expect(wrapper.findComponent({ name: 'DashboardLayout' }).props('fullWidth')).toBe(true)
	})

	it('passes full-width false to DashboardLayout when analytics is not active', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent({ name: 'DashboardLayout' }).props('fullWidth')).toBe(false)
	})
})
