import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'
import { useAdsetsActiveStore } from '@/modules/Partner/views/Agency/store'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import AdsetInfo from '../AdsetInfo.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))
vi.mock('../sections', () => ({
	Info: {
		name: 'Info',
		props: ['adset'],
		template: '<div data-test="adset-info-section-info" />',
	},
	Description: {
		name: 'Description',
		props: ['adset'],
		template: '<div data-test="adset-info-section-description" />',
	},
	Creative: {
		name: 'Creative',
		props: ['adset'],
		template: '<div data-test="adset-info-section-creative" />',
	},
}))

vi.mock('vue-router', () => ({
	useRoute: vi.fn(() => ({
		name: 'test',
		params: {},
		query: {},
	})),
	useRouter: vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
	})),
}))

// Mock window.videojs
;(window as any).videojs = vi.fn(() => ({
	controls: vi.fn(),
	dispose: vi.fn(),
	on: vi.fn(),
	off: vi.fn(),
	play: vi.fn(),
	pause: vi.fn(),
	ready: vi.fn(),
}))

describe('Streamer Campaigns AdsetInfo', () => {
	const factory = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const appStore = useAppStore()
		const campaignStore = useCampaignsStore(pinia)
		const adsetsStore = useAdsetsActiveStore(pinia)

		const wrapper = mount(AdsetInfo, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					AdsetInfoSkeleton: {
						name: 'AdsetInfoSkeleton',
						template: '<div data-test="partner-agency-adset-info-skeleton" />',
					},
					'router-link': {
						name: 'router-link',
						template: '<a><slot /></a>',
						props: ['to'],
					},
					TextLink: {
						name: 'TextLink',
						template: `
							<a data-test="text-link" @click="$emit('click')">
								<slot />
							</a>
						`,
					},
					ElDrawer: {
						name: 'ElDrawer',
						template: `
							<div>
								<slot></slot>
							</div>
						`,
						props: ['modelValue', 'title', 'size'],
					},
				},
			},
			props: {
				store: adsetsStore,
			},
		})

		return { wrapper, appStore, campaignStore, adsetsStore }
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
			expect(drawer.props('size')).toBe('560px')
		})

		it('binds drawer visibility to store', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetSidebarVisible = true

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('modelValue')).toBe(true)
		})

		it('sets drawer title from adset', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = {
				...adsetInfo,
				campaignType: CampaignType.BRAND_AWARENESS,
				title: 'Test Campaign',
			}

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('title')).toBe('Test Campaign')
		})

		it('sets drawer title from store when adset is not loaded yet', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = null
			adsetsStore.adsetTitle = 'Title from list'
			adsetsStore.isFetchingData = true

			await nextTick()

			const drawer = wrapper.findComponent({ name: 'ElDrawer' })
			expect(drawer.props('title')).toBe('Title from list')
		})
	})

	describe('Component rendering', () => {
		it('renders all components for brand awareness campaign', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = { ...adsetInfo, campaignType: CampaignType.BRAND_AWARENESS }

			await nextTick()

			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.find('[data-test="partner-agency-adset-info-report-btn"]').exists()).toBe(true)
		})

		it('renders all components for performance campaign', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = { ...adsetInfo, campaignType: CampaignType.PERFORMANCE }

			await nextTick()

			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.find('[data-test="partner-agency-adset-info-report-btn"]').exists()).toBe(true)
		})

		it('renders all components for preroll campaign', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = { ...adsetInfo, campaignType: CampaignType.PREROLL }

			await nextTick()

			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(true)
			expect(wrapper.find('[data-test="partner-agency-adset-info-report-btn"]').exists()).toBe(false)
		})

		it('does not render content when adset is null', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = null

			await nextTick()

			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(false)
		})

		it('shows skeleton while fetching and adset info is not loaded yet', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = null
			adsetsStore.isFetchingData = true
			adsetsStore.adsetTitle = 'Loading'

			await nextTick()

			expect(wrapper.find('[data-test="partner-agency-adset-info-skeleton"]').exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Info' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Description' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Creative' }).exists()).toBe(false)
		})
	})

	describe('Props passing', () => {
		it('passes correct props to child components', async () => {
			const { wrapper, adsetsStore } = factory()
			adsetsStore.adsetInfo = { ...adsetInfo, campaignType: CampaignType.BRAND_AWARENESS }

			await nextTick()

			const components = ['Info', 'Description', 'Creative']

			components.forEach(component => {
				const child = wrapper.findComponent({ name: component })
				expect(child.props('adset')).toEqual({ ...adsetInfo, campaignType: CampaignType.BRAND_AWARENESS })
			})
		})
	})
})
