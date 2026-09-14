import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdsetStatus } from '@/core/types'
import { i18n } from '@/core/i18n'
import { yandexTextAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/fixtures/yandexTextAdsetShort'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import SspText from '../SspText.vue'

describe('Streamer Settings SspText', () => {
	const factory = () => {
		const wrapper = mount(SspText, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const settingsStore = useSettingsStore()
		const campaignsStore = useCampaignsStore()

		settingsStore.widget = widgetData

		return { wrapper, settingsStore, campaignsStore }
	}

	it('renders the component when widget is available', async () => {
		const { wrapper, campaignsStore } = factory()

		campaignsStore.activeCampaignsShort.data.active = [yandexTextAdsetShort]
		campaignsStore.activeCampaignsShort.data.inactive = []

		await nextTick()

		expect(wrapper.find('[data-test="settings-ssp-text"]').exists()).toBe(true)
	})

	it('sets isEnabled correctly', async () => {
		const { wrapper, campaignsStore } = factory()
		campaignsStore.activeCampaignsShort.data.active = [yandexTextAdsetShort]
		campaignsStore.activeCampaignsShort.data.inactive = [{
			...yandexTextAdsetShort,
			status: AdsetStatus.INACTIVE,
		}]

		await nextTick()

		expect(wrapper.vm.isEnabled).toBe(false)

		campaignsStore.activeCampaignsShort.data.inactive = []

		await nextTick()

		expect(wrapper.vm.isEnabled).toBe(true)
	})

	it('calls changeSspTextCampaignsStatuses on onChage call', async () => {
		const { wrapper, campaignsStore } = factory()

		await nextTick()

		await wrapper.vm.onChange(false)

		expect(campaignsStore.changeSspTextCampaignsStatuses).toHaveBeenCalled()
	})
})
