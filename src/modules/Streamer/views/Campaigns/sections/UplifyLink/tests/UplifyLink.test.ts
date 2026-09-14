import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import UplifyLink from '../UplifyLink.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/consts', () => ({
	LINK_ENABLED: true,
}))
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns UplifyLink', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (freemiumActive = false) => {
		const wrapper = mount(UplifyLink, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					'router-link': true,
					// ElAlert: true,
					// TextLink: true,
				},
			},
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = {
			...profileData,
			freemiumActive,
		}

		return { wrapper, streamerStore }
	}

	describe('Component rendering', () => {
		it('renders title', async () => {
			const { wrapper } = factory()

			await nextTick()

			expect(wrapper.text()).toContain('campaigns.freemium.title')
		})

		it('renders alert component', async () => {
			const { wrapper } = factory()

			await nextTick()

			const alert = wrapper.findComponent({ name: 'ElAlert' })

			expect(alert.exists()).toBe(true)
			expect(alert.props('type')).toBe('success')
			expect(alert.props('closable')).toBe(false)
		})

		it('renders message content', async () => {
			const { wrapper } = factory()

			await nextTick()

			expect(wrapper.text()).toContain('campaigns.freemium.msg.title')
			expect(wrapper.text()).toContain('campaigns.freemium.msg.text')
		})
	})

	describe('Links rendering', () => {
		it('renders router link when freemium is active', async () => {
			const { wrapper } = factory(true)
			await nextTick()

			const routerLink = wrapper.find('router-link-stub')
			expect(routerLink.exists()).toBe(true)
		})

		it('renders text link when freemium is not active', async () => {
			const { wrapper } = factory(false)
			await nextTick()

			const textLink = wrapper.findComponent({ name: 'TextLink' })
			expect(textLink.exists()).toBe(true)
			expect(textLink.text()).toContain('campaigns.freemium.msg.getAccess')
		})
	})

	describe('Interactions', () => {
		it('calls Intercom on text link click when freemium is not active', async () => {
			const mockIntercom = vi.fn()
			window.Intercom = mockIntercom

			const { wrapper } = factory(false)
			await nextTick()

			const textLink = wrapper.findComponent({ name: 'TextLink' })
			await textLink.trigger('click')

			expect(mockIntercom).toHaveBeenCalledWith('showNewMessage', 'intercom.freemium')
		})
	})
})
