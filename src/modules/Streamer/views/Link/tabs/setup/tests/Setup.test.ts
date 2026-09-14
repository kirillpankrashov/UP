import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore,useLinkSetupStore } from '@/modules/Streamer/views/Link/store'
import { Tab } from '@/modules/Streamer/views/Link/types'

import { Goal, LinkName, Poll } from '../sections'
import Setup from '../Setup.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Setup', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {
			tab: Tab.SETUP,
		},
	} as any)

	const factory = () => {
		const wrapper = mount(Setup, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const setupStore = useLinkSetupStore()
		setupStore.poll = pollData
		setupStore.goal = goalData

		const linkProfileStore = useLinkProfileStore()
		linkProfileStore.profile = linkProfileData

		return { wrapper, setupStore, linkProfileStore }
	}

	it('renders correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(LinkName).exists()).toBe(true)
		expect(wrapper.findComponent(Goal).exists()).toBe(true)
		expect(wrapper.findComponent(Poll).exists()).toBe(true)
	})

	it('fetches profile on mount if not available', () => {
		const { linkProfileStore } = factory()

		linkProfileStore.profile = null

		expect(linkProfileStore.fetchProfile).toHaveBeenCalled()
	})

	it('starts polling on mount', () => {
		const { setupStore } = factory()

		expect(setupStore.fetchGoal).toHaveBeenCalled()
		expect(setupStore.fetchPoll).toHaveBeenCalled()
	})
})
