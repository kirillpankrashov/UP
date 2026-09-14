import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

import Analytics from '../Analytics.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns Analytics', () => {
	const factory = () => {
		const wrapper = mount(Analytics, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					DashboardTitle: true,
					DatePicker: true,
					Graph: true,
					Table: true,
					ArrowLeftIcon: true,
				},
			},
		})

		const analyticsStore = useCampaignAnalyticsStore()

		return { wrapper, analyticsStore }
	}

	describe('Component rendering', () => {
		it('does not render when currentAdset is null', () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = null

			expect(wrapper.find('#campaigns-analytics').exists()).toBe(false)
		})

		it('renders when currentAdset is set', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			expect(wrapper.find('#campaigns-analytics').exists()).toBe(true)
		})

		// it('shows loading state when fetching data', async () => {
		// 	const { wrapper, analyticsStore } = factory()
		// 	analyticsStore.currentAdset = brandAwarenessCustomAdset
		// 	analyticsStore.isFetchingData = true
		// 	await nextTick()

		// 	const analytics = wrapper.find('#campaigns-analytics')
		// 	expect(analytics.attributes('loading')).toBe('true')
		// })

		it('renders all child components when currentAdset is set', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			expect(wrapper.findComponent({ name: 'DashboardTitle' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'DatePicker' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Graph' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Table' }).exists()).toBe(true)
		})
	})

	describe('Return button', () => {
		it('renders return button with correct text', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			const button = wrapper.find('button')
			expect(button.exists()).toBe(true)
			expect(button.text()).toContain('campaigns.analytics.returnBtn')
		})

		it('has correct button styling', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			const button = wrapper.find('button')
			expect(button.classes()).toContain('mb-6')
			expect(button.classes()).toContain('flex')
			expect(button.classes()).toContain('items-center')
			expect(button.classes()).toContain('justify-center')
			expect(button.classes()).toContain('gap-1')
			expect(button.classes()).toContain('bg-transparent')
			expect(button.classes()).toContain('text-primary')
		})

		it('calls closeAnalytics when clicked', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			await wrapper.find('button').trigger('click')
			expect(analyticsStore.closeAnalytics).toHaveBeenCalledTimes(1)
		})
	})

	describe('Dashboard title', () => {
		it('passes correct title prop', async () => {
			const { wrapper, analyticsStore } = factory()
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()

			const title = wrapper.findComponent({ name: 'DashboardTitle' })
			expect(title.props('title')).toBe(brandAwarenessCustomAdset.title)
		})
	})

	describe('Store integration', () => {
		it('updates view when store data changes', async () => {
			const { wrapper, analyticsStore } = factory()

			// Изначально компонент не отображается
			expect(wrapper.find('#campaigns-analytics').exists()).toBe(false)

			// Устанавливаем текущий adset
			analyticsStore.currentAdset = brandAwarenessCustomAdset
			await nextTick()
			expect(wrapper.find('#campaigns-analytics').exists()).toBe(true)

			// Закрываем аналитику
			analyticsStore.currentAdset = null
			await nextTick()
			expect(wrapper.find('#campaigns-analytics').exists()).toBe(false)
		})
	})
})
