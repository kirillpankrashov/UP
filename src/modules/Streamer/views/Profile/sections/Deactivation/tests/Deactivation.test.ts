import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { deleteProfileHandler } from '@/modules/Streamer/views/Profile/sections/Deactivation/helpers'

import { Deactivation } from '../..'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Profile/sections/Deactivation/helpers', () => ({
	deleteProfileHandler: vi.fn(),
}))

describe('Streamer Profile Deactivation', () => {

	const date = new Date(2024, 0, 30)
	vi.setSystemTime(date)

	const wrapper = mount(Deactivation, {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
		},
	})

	it('shows correct deletion date', async () => {
		expect((wrapper.vm as any).daysLeft).toBe('March 10, 2024')
	})

	it('calls deleteProfileHandler on delete profile button click', async () => {
		(wrapper.vm as any).drawerActive = true

		await nextTick()

		const deleteBtn = wrapper.find('[data-test="delete-profile-button"]')
		expect(deleteBtn.exists()).toBe(true)

		await deleteBtn.trigger('click')

		expect(deleteProfileHandler).toHaveBeenCalled()
	})
})
