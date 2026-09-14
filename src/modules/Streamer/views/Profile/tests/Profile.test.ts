import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { Profile } from '@/modules/Streamer/views/Profile'
import {
	Common,
	Deactivation,
	Discord,
	Platforms,
} from '@/modules/Streamer/views/Profile/sections'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Profile', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {},
	} as any)

	const wrapper = mount(Profile, {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
			stubs: ['router-link'],
		},
	})

	it('renders properly', () => {
		expect(wrapper.findComponent(Common).exists()).toBe(true)
		expect(wrapper.findComponent(Platforms).exists()).toBe(true)
		expect(wrapper.findComponent(Discord).exists()).toBe(true)
		expect(wrapper.findComponent(Deactivation).exists()).toBe(true)
	})
})
