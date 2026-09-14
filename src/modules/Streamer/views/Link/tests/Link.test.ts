import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Streamer/router'
import { Link } from '@/modules/Streamer/views/Link'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { Tab } from '@/modules/Streamer/views/Link/types'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link', () => {
	vi.mocked(useRouter).mockReturnValue({
		replace: vi.fn(),
		query: {},
	} as any)
	vi.mocked(useRoute).mockReturnValue({
		replace: vi.fn(),
		query: {},
	} as any)

	const factory = (props: any) => {
		const wrapper = mount(Link, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link', 'Analytics', 'Posts', 'Profile', 'Setup'],
			},
			props,
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		const profileStore = useLinkProfileStore()
		profileStore.profile = linkProfileData

		return { wrapper, streamerStore, profileStore }
	}

	it('renders properly', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.findComponent({ name: 'Analytics' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Posts' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Profile' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Setup' }).exists()).toBe(true)
	})

	it(`sets default tab to ${Tab.SETUP} if no tab is specified in route`, async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.vm.router.replace).toHaveBeenCalledWith({ query: { tab: Tab.SETUP } })
	})

	it('redirects to NOT_FOUND if freemiumActive is false', async () => {
		const { wrapper, streamerStore } = factory({})
		streamerStore.profile!.freemiumActive = false

		await nextTick()

		expect(wrapper.vm.router.replace).toHaveBeenCalledWith({ name: RouteName.NOT_FOUND })
	})
})
