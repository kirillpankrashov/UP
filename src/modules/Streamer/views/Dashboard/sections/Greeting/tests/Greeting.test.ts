import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Locale, type TStreamer } from '@/core/types'
import { i18n } from '@/core/i18n'
import { TextLink } from '@/components'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import Greeting from '../Greeting.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/core/consts', () => ({
	LINK_ENABLED: true,
}))
vi.mock('@/modules/Streamer/views/Link/api')

describe('Streamer Dashboard Greeting', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (streamerProfile: TStreamer | null = null, linkProfileData: any = null) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const wrapper = mount(Greeting, {
			global: {
				plugins: [i18n, pinia],
				stubs: ['router-link'],
			},
		})

		const streamerStore = useStreamerStore()
		const linkProfileStore = useLinkProfileStore()

		if (streamerProfile) {
			streamerStore.profile = streamerProfile
		}

		if (linkProfileData) {
			linkProfileStore.profile = linkProfileData
		}

		// Mock the linkName getter to return expected URL
		vi.spyOn(linkProfileStore, 'linkName', 'get').mockReturnValue('https://uplify.link/en/123')

		return { wrapper, streamerStore, linkProfileStore }
	}

	it('renders the greeting message when LINK_ENABLED is false', async () => {
		vi.doMock('@/core/consts', () => ({
			LINK_ENABLED: false,
		}))

		const { wrapper } = factory({
			freemiumActive: false,
			username: 'JohnDoe',
		} as TStreamer)

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-greeting-text"]').text()).toBe('Welcome back, JohnDoe 👋')
	})

	it('renders the greeting message when freemium is not active', async () => {
		const { wrapper } = factory({
			freemiumActive: false,
			username: 'JohnDoe',
		} as TStreamer)

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-greeting-text"]').text()).toBe('Welcome back, JohnDoe 👋')
	})

	it('renders the link when freemium is active', async () => {
		const { wrapper } = factory({
			freemiumActive: true,
			username: 'JohnDoe',
			locale: Locale.EN,
			userId: 123,
		} as TStreamer)

		await nextTick()

		expect(wrapper.findComponent(TextLink).props('href')).toBe('https://uplify.link/en/123')
	})

	it('do not show greeting if streamer is not available', async () => {
		const { wrapper } = factory(null)

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-greeting"]').exists()).toBe(false)
	})
})
