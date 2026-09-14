import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { PlatformSelect } from '@/components'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import CurrentPlatform from '../CurrentPlatform.vue'

vi.mock('@/core/helpers')

describe('Streamer Settings CurrentPlatform', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (props: any = {}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const wrapper = mount(CurrentPlatform, {
			global: {
				plugins: [i18n, pinia],
			},
			props,
		})

		const settingsStore = useSettingsStore()

		settingsStore.widget = widgetData

		return { wrapper, settingsStore }
	}

	it('renders the PlatformSelect component', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.findComponent(PlatformSelect).exists()).toBe(true)
	})
})
