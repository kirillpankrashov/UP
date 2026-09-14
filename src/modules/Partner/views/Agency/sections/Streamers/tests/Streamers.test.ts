import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAdsetsActiveStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import Streamers from '../Streamers.vue'

vi.mock('@/core/helpers')

vi.mock('@/modules/Partner/views/Agency/api')

describe('Partner Agency Streamers Section', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamersStore = useAgencyStreamersStore(pinia)
		const adsetsActiveStore = useAdsetsActiveStore(pinia)

		const wrapper = mount(Streamers, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					Search: { name: 'Search', template: '<div data-test="streamers-search-stub" />' },
					StreamersList: { name: 'StreamersList', template: '<div data-test="streamers-list-stub" />' },
					StreamerSettings: { name: 'StreamerSettings', template: '<div data-test="streamer-settings-stub" />' },
					StreamerAdsets: { name: 'StreamerAdsets', template: '<div data-test="streamer-adsets-stub" />' },
					AdsetInfo: {
						name: 'AdsetInfo',
						props: ['store'],
						template: '<div data-test="adset-info-stub" />',
					},
					AdsetStreamers: {
						name: 'AdsetStreamers',
						props: ['adsetsStore', 'modelValue'],
						emits: ['update:modelValue'],
						template: '<div data-test="adset-streamers-stub" />',
					},
				},
			},
		})

		return { wrapper, streamersStore, adsetsActiveStore }
	}

	it('renders all child sections/components', async () => {
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="streamers-search-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="streamers-list-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="streamer-settings-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="streamer-adsets-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-info-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-streamers-stub"]').exists()).toBe(true)
	})

	it('calls fetchStreamers on mounted', async () => {
		const { streamersStore } = factory()
		await nextTick()

		expect(streamersStore.fetchStreamers).toHaveBeenCalledTimes(1)
	})

	it('passes adsets store to AdsetInfo and AdsetStreamers', async () => {
		const { wrapper, adsetsActiveStore } = factory()
		await nextTick()

		const adsetInfo = wrapper.findComponent({ name: 'AdsetInfo' })
		const adsetStreamers = wrapper.findComponent({ name: 'AdsetStreamers' })

		expect(adsetInfo.props('store')).toBe(adsetsActiveStore)
		expect(adsetStreamers.props('adsetsStore')).toBe(adsetsActiveStore)
	})

	it('binds AdsetStreamers modelValue to adsetStreamersSidebarVisible', async () => {
		const { wrapper, adsetsActiveStore } = factory()
		await nextTick()

		const adsetStreamers = wrapper.findComponent({ name: 'AdsetStreamers' })
		expect(adsetStreamers.props('modelValue')).toBe(false)

		adsetsActiveStore.adsetStreamersSidebarVisible = true
		await nextTick()

		expect(adsetStreamers.props('modelValue')).toBe(true)
	})
})
