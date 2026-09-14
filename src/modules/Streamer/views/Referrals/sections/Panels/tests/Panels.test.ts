import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { panelsData } from '@/modules/Streamer/views/Referrals/api/getPanels/fixtures/panelsData'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import Panels from '../Panels.vue'

vi.mock('@/core/helpers')

describe('Streamer Referrals Panels', () => {
	const factory = () => {
		const wrapper = mount(Panels, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: ['router-link'],
			},
		})

		const referralsStore = useReferralsStore()

		return { wrapper, referralsStore }
	}

	it('renders correctly when panels data is available', async () => {
		const { wrapper, referralsStore } = factory()
		referralsStore.panels = panelsData

		await nextTick()

		expect(wrapper.find('[data-test="referrals-panels-section"]').exists()).toBe(true)
	})

	it('does not render when panels data is not available', async () => {
		const { wrapper, referralsStore } = factory()
		referralsStore.panels = []

		await nextTick()

		expect(wrapper.find('[data-test="referrals-panels-section"]').exists()).toBe(false)
	})

	it('calls fetchPanels method on mount if panels are not available', async () => {
		const { referralsStore } = factory()
		referralsStore.panels = []

		await nextTick()

		expect(referralsStore.fetchPanels).toHaveBeenCalled()
	})

	it('calls open method with correct src when panel is clicked', async () => {
		const { wrapper, referralsStore } = factory()
		referralsStore.panels = panelsData

		await nextTick()

		window.open = vi.fn()
		const panelElement = wrapper.find('[data-test="referrals-panel"]')
		await panelElement.trigger('click')

		expect(window.open).toHaveBeenCalledWith(panelsData[0].src)
	})
})
