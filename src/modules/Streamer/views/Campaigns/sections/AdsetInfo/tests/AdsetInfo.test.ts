import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import AdsetInfo from '../AdsetInfo.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo', () => {
	const factory = () => {
		const wrapper = mount(AdsetInfo, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElDrawer: {
						name: 'ElDrawer',
						template: `
							<div>
								<slot></slot>
							</div>
						`,
						props: ['modelValue', 'title', 'size'],
					},
					Stats: true,
					Info: true,
					ReportBtn: true,
					Description: true,
					Creative: true,
					PrerollLinks: true,
				},
			},
		})

		const appStore = useAppStore()
		const campaignStore = useCampaignsStore()

		return { wrapper, appStore, campaignStore }
	}

	describe('Drawer behavior', () => {
		it('sets correct drawer size for desktop', async () => {
			const { wrapper, appStore } = factory()
			appStore.isMobile = false

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('size')).toBe('560px')
		})

		it('sets correct drawer size for mobile', async () => {
			const { wrapper, appStore } = factory()
			appStore.isMobile = true

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('size')).toBe('100%')
		})

		it('binds drawer visibility to store', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfoSidebarVisible = true

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('modelValue')).toBe(true)
		})

		it('sets drawer title from adset', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = {
				...brandAwarenessAdsetInfo,
				title: 'Test Campaign',
			}

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('title')).toBe('Test Campaign')
		})
	})

	describe('Component rendering', () => {
		it('renders all components for brand awareness campaign', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = brandAwarenessAdsetInfo

			await nextTick()

			expect(wrapper.findComponent({ name: 'Stats' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'ReportBtn' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'PrerollLinks' }).exists()).toBe(false)
		})

		it('renders all components for performance campaign', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = performanceAdsetInfo

			await nextTick()

			expect(wrapper.findComponent({ name: 'Stats' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'ReportBtn' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'PrerollLinks' }).exists()).toBe(false)
		})

		it('renders all components for preroll campaign', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = prerollAdsetInfo

			await nextTick()

			expect(wrapper.findComponent({ name: 'Stats' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'ReportBtn' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'PrerollLinks' }).exists()).toBe(true)
		})

		it('does not render content when adset is null', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = null

			await nextTick()

			expect(wrapper.findComponent({ name: 'Stats' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'ReportBtn' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PrerollLinks' }).exists()).toBe(false)
		})
	})

	describe('Props passing', () => {
		it('passes correct props to child components', async () => {
			const { wrapper, campaignStore } = factory()
			campaignStore.adsetInfo = brandAwarenessAdsetInfo

			await nextTick()

			const components = ['Stats', 'Info', 'ReportBtn', 'Description', 'Creative']
			components.forEach(component => {
				const child = wrapper.findComponent({ name: component })
				expect(child.props('adset')).toEqual(brandAwarenessAdsetInfo)
			})
		})
	})
})
