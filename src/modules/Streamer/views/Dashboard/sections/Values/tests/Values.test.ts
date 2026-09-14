import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import {
	ActiveCampaigns,
	CpaEarnings,
	EstimatedEarnings,
	LinkEarnings,
} from '../sections'
import Values from '../Values.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/consts', () => ({
	LINK_ENABLED: true,
}))

describe('Streamer Dashboard Values', () => {
	const factory = () => {
		const wrapper = mount(Values, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const streamerStore = useStreamerStore()
		const linkAnalyticsStore = useLinkAnalyticsStore()

		return { wrapper, streamerStore, linkAnalyticsStore }
	}

	it('renders properly', async () => {
		const { wrapper, streamerStore, linkAnalyticsStore } = factory()

		streamerStore.profile = profileData
		linkAnalyticsStore.analytics = {
			revenue: {
				month: 1000,
				day: 100,
			},
			isPremium: true,
			avgCpm: 100,
			impressions: 1000,
		}

		await nextTick()

		expect(wrapper.findComponent(EstimatedEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(LinkEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(ActiveCampaigns).exists()).toBe(true)
	})

	it('renders CpaEarnings if streamer freemiumActive is false', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile = profileData
		streamerStore.profile.freemiumActive = false

		await nextTick()

		expect(wrapper.findComponent(EstimatedEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(LinkEarnings).exists()).toBe(false)
		expect(wrapper.findComponent(CpaEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(ActiveCampaigns).exists()).toBe(true)
	})

	it('renders CpaEarnings when LINK_ENABLED is false', async () => {
		vi.doMock('@/core/consts', () => ({
			LINK_ENABLED: false,
		}))

		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent(EstimatedEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(LinkEarnings).exists()).toBe(false)
		expect(wrapper.findComponent(CpaEarnings).exists()).toBe(true)
		expect(wrapper.findComponent(ActiveCampaigns).exists()).toBe(true)
	})
})
