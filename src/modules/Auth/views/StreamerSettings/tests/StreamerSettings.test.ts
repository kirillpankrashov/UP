import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { StreamerSettingsForm } from '@/components/StreamerSettingsForm'
import { StreamerSettings } from '@/modules/Auth/views/StreamerSettings'
import { checkStreamerSettings } from '@/modules/Auth/views/StreamerSettings/helpers'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/StreamerSettings/helpers', () => ({
	checkStreamerSettings: vi.fn(),
}))

describe('StreamerSettings', () => {
	const factory = () => {
		vi.mocked(checkStreamerSettings)

		const wrapper = mount(StreamerSettings, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
			},
		})

		return { wrapper }
	}

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('calls checkStreamerSettings function', async () => {
		factory()

		expect(checkStreamerSettings).toHaveBeenCalled()
	})

	it('has StreamerSettingsForm', () => {
		const { wrapper } = factory()

		const form = wrapper.findComponent(StreamerSettingsForm)
		expect(form.exists()).toBe(true)
		expect(form.vm.isEditProfile).toBe(false)
		expect(form.vm.modelValue).toBeTruthy()
	})
})
