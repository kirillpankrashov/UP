import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import AdsetCard from '../AdsetCard.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard', () => {
	const factory = (props = {}) => {
		const wrapper = mount(AdsetCard, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					// ElTooltip: true,
					Toggle: true,
					Tags: true,
					Indicators: true,
				},
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})

		const campaignsStore = useCampaignsStore()

		return { wrapper, campaignsStore }
	}

	describe('Rendering', () => {
		it('renders all child components', async () => {
			const { wrapper } = factory()

			await nextTick()

			expect(wrapper.findComponent({ name: 'ElTooltip' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Toggle' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Tags' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Indicators' }).exists()).toBe(true)
		})

		it('displays adset title', async () => {
			const { wrapper } = factory({
				title: 'Test Campaign',
			})

			await nextTick()
			expect(wrapper.text()).toContain('Test Campaign')
		})

		it('shows adset logo', async () => {
			const { wrapper } = factory({
				logo: 'test-logo.jpg',
			})

			await nextTick()
			const logo = wrapper.find('[data-test="campaigns-adset-card-logo"]')
			expect(logo.attributes('style')).toContain('test-logo.jpg')
		})
	})

	describe('Props passing', () => {
		it('passes adset prop to child components', async () => {
			const { wrapper } = factory()

			await nextTick()

			const childComponents = ['Toggle', 'Tags', 'Indicators']
			childComponents.forEach(component => {
				const child = wrapper.findComponent({ name: component })
				expect(child.props('adset')).toEqual(expect.objectContaining(brandAwarenessCustomAdset))
			})
		})

		it('passes title to ElTooltip', async () => {
			const { wrapper } = factory({
				title: 'Test Campaign',
			})

			await nextTick()

			const tooltip = wrapper.findComponent({ name: 'ElTooltip' })
			expect(tooltip.props('content')).toBe('Test Campaign')
		})
	})

	describe('Interactions', () => {
		it('opens sidebar on click for non-closed adset', async () => {
			const { wrapper, campaignsStore } = factory({
				status: 'active',
			})

			await nextTick()
			await wrapper.find('[data-test="campaigns-adset-card"]').trigger('click')

			expect(campaignsStore.showCampaignInfoSidebar).toHaveBeenCalledOnce()
			expect(campaignsStore.showCampaignInfoSidebar).toHaveBeenCalledWith(
				expect.objectContaining({ status: 'active' }),
			)
		})

		it('does not open sidebar for closed adset', async () => {
			const { wrapper, campaignsStore } = factory({
				status: 'close',
			})

			await nextTick()
			await wrapper.find('[data-test="campaigns-adset-card"]').trigger('click')

			expect(campaignsStore.showCampaignInfoSidebar).not.toHaveBeenCalled()
		})
	})
})
