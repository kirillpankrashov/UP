import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useLinkAlertsStore } from '@/modules/Streamer/views/Link/store'

import SendPreview from '../SendPreview.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Alerts SendPreview', () => {
	const factory = () => {
		const wrapper = mount(SendPreview, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link', 'ElOption'],
			},
		})

		const alertsStore = useLinkAlertsStore()

		return { wrapper, alertsStore }
	}

	it('calls requestDemo request on btn click', async () => {
		const { wrapper, alertsStore } = factory()

		const spy = vi.spyOn(wrapper.vm, 'sendTest')

		const btn = wrapper.findComponent('[data-test="streamer-link-alerts-demo-btn"]')

		btn.trigger('click')

		await nextTick()

		expect(spy).toHaveBeenCalled()
		expect(alertsStore.requestDemo).toHaveBeenCalled()
	})
})
