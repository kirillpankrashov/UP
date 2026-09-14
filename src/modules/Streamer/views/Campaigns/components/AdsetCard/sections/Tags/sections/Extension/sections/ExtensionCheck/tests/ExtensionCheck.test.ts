import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import ExtensionCheck from '../ExtensionCheck.vue'

vi.mock('@/modules/Streamer/views/Settings/api')

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Extension ExtensionCheck', () => {
	const factory = (extensionEnabled = true) => {
		const wrapper = mount(ExtensionCheck, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					RefreshIcon: true,
				},
			},
			props: {
				adset: extensionAdset,
			},
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = {
			...widgetData,
			extensionEnabled,
		}

		return { wrapper, settingsStore }
	}

	it('does not render when extension is enabled', async () => {
		const { wrapper } = factory(true)

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-check"]').exists()).toBe(false)
	})

	it('renders when extension is disabled', async () => {
		const { wrapper } = factory(false)

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-check"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.checkExtension')
	})

	it('calls checkExtension when clicked', async () => {
		const { wrapper, settingsStore } = factory(false)

		await nextTick()

		await wrapper.trigger('click')

		expect(settingsStore.checkExtension).toHaveBeenCalledTimes(1)
	})

	it('updates visibility when extension status changes', async () => {
		const { wrapper, settingsStore } = factory(true)

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-check"]').exists()).toBe(false)

		settingsStore.widget = {
			...widgetData,
			extensionEnabled: false,
		}

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-check"]').exists()).toBe(true)
	})
})
