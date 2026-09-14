import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { StreamerSettingsForm } from '@/components/StreamerSettingsForm'

import { Common } from '../..'

vi.mock('@/core/helpers')

describe('Streamer Profile Common', () => {
	const wrapper = mount(Common, {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
			stubs: ['router-link'],
		},
	})

	it('has StreamerSettingsForm', () => {
		const form = wrapper.findComponent(StreamerSettingsForm)
		expect(form.exists()).toBe(true)
		expect(form.vm.isEditProfile).toBe(true)
		expect(form.vm.modelValue).toBeTruthy()
	})
})
