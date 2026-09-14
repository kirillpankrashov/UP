import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import ExtensionSetup from '../ExtensionSetup.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => {
			if (key === 'links.twitchExtension') return 'https://twitch.extension.link'
			return key
		},
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Extension ExtensionSetup', () => {
	const factory = (extensionEnabled = true) => {
		const wrapper = mount(ExtensionSetup, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					LinkIcon: true,
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

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-setup"]').exists()).toBe(false)
	})

	it('renders when extension is disabled', async () => {
		const { wrapper } = factory(false)

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-setup"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.setupExtension')
	})

	it('has correct link attributes', async () => {
		const { wrapper } = factory(false)

		await nextTick()

		const link = wrapper.find('a')
		expect(link.attributes('href')).toBe('https://twitch.extension.link')
		expect(link.attributes('target')).toBe('_blank')
	})

	it('updates visibility when extension status changes', async () => {
		const { wrapper, settingsStore } = factory(true)

		await nextTick()
		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-setup"]').exists()).toBe(false)

		settingsStore.widget = {
			...widgetData,
			extensionEnabled: false,
		}

		await nextTick()
		expect(wrapper.find('[data-name="campaigns-adset-card-tags-extension-extension-setup"]').exists()).toBe(true)
	})
})
