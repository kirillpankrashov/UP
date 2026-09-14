import { type RouteLocationNormalizedLoaded,useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ErrorDiscord } from '@/components/AuthError'
import { Discord } from '@/modules/Streamer/views/Profile/sections'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Profile/sections/helpers', () => ({
	attach: vi.fn(),
}))

describe('Streamer Profile Discord', () => {
	const options = {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
		},
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('shows ErrorDiscord if route query has error and platform is Discord', () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {
				error: 'test',
				platform: 'discord',
			},
		} as unknown as RouteLocationNormalizedLoaded)

		const wrapper = mount(Discord, options)

		expect(wrapper.findComponent(ErrorDiscord).exists()).toBe(true)
	})
})
