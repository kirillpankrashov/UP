import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import AdsetsList from '../AdsetsList.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
		tm: () => ['No campaigns 1', 'No campaigns 2'],
	}),
}))

describe('AdsetsList Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(AdsetsList, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					AdsetCard: true,
					HelpIcon: true,
				},
			},
			props: {
				adsets: [],
				...props,
			},
		})

		const appStore = useAppStore()

		return { wrapper, appStore }
	}

	describe('Header section', () => {
		it('renders title when provided', async () => {
			const { wrapper } = factory({
				title: 'Test Title',
			})

			await nextTick()
			expect(wrapper.text()).toContain('Test Title')
		})

		it('renders description when provided', async () => {
			const { wrapper } = factory({
				description: 'Test Description',
			})

			await nextTick()
			expect(wrapper.text()).toContain('Test Description')
		})

		it('shows help icon on mobile when hint prop is true', async () => {
			const { wrapper, appStore } = factory({
				hint: true,
			})

			appStore.isMobile = true
			await nextTick()

			expect(wrapper.find('[data-test="campaigns-adsets-list-hint-icon"]').exists()).toBe(true)
		})

		it('does not show help icon on desktop', async () => {
			const { wrapper, appStore } = factory({
				hint: true,
			})

			appStore.isMobile = false
			await nextTick()

			expect(wrapper.find('[data-test="campaigns-adsets-list-hint-icon"]').exists()).toBe(false)
		})
	})

	describe('Adsets rendering', () => {
		it('renders AdsetCard for each adset', async () => {
			const adsets = [
				{ ...brandAwarenessCustomAdset, id: 1 },
				{ ...brandAwarenessCustomAdset, id: 2 },
			]

			const { wrapper } = factory({
				adsets,
			})

			await nextTick()
			const cards = wrapper.findAllComponents({ name: 'AdsetCard' })
			expect(cards).toHaveLength(2)
		})

		it('passes correct props to AdsetCard', async () => {
			const adset = { ...brandAwarenessCustomAdset, id: 1 }
			const { wrapper } = factory({
				adsets: [adset],
			})

			await nextTick()
			const card = wrapper.findComponent({ name: 'AdsetCard' })
			expect(card.props('adset')).toEqual(adset)
		})

		it('shows empty state when no adsets', async () => {
			const { wrapper } = factory({
				adsets: [],
			})

			await nextTick()
			expect(wrapper.text()).toContain('No campaigns')
		})
	})

	describe('Events', () => {
		it('emits toggleHint when help icon clicked on mobile', async () => {
			const { wrapper, appStore } = factory({
				hint: true,
			})

			appStore.isMobile = true
			await nextTick()

			await wrapper.find('[data-test="campaigns-adsets-list-hint-icon"]').trigger('click')
			expect(wrapper.emitted('toggleHint')).toBeTruthy()
		})
	})

	describe('Dashboard section props', () => {
		it('passes correct props to DashboardSection', async () => {
			const { wrapper } = factory({
				title: 'Test Title',
			})

			await nextTick()
			const section = wrapper.findComponent({ name: 'DashboardSection' })
			expect(section.props()).toEqual(expect.objectContaining({
				noLeft: true,
				noBorder: true,
				collapsable: true,
			}))
		})

		it('sets collapsable to false when no title', async () => {
			const { wrapper } = factory({
				title: undefined,
			})

			await nextTick()
			const section = wrapper.findComponent({ name: 'DashboardSection' })
			expect(section.props('collapsable')).toBe(false)
		})
	})
})
