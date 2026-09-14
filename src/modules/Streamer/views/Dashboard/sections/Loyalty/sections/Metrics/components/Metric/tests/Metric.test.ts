import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'
import type { TWidgetSettings } from '@/modules/Streamer/views/Settings/api'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Metric from '../Metric.vue'

describe('Streamer Dashboard Loyalty Metrics Metric', () => {
	const factory = (props: any, platform: Platform) => {
		const wrapper = mount(Metric, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const dashboardStore = useDashboardStore()
		dashboardStore.tier.data = tierData

		const settingsStore = useSettingsStore()
		settingsStore.widget = {
			platform,
		} as TWidgetSettings

		return wrapper
	}

	it('shows component if property name isn\'t extension and the platform is Twitch', async () => {
		const wrapper = factory({
			name: 'ctr',
			success: true,
			label: 'Test Label',
			value: 'Test Value',
		}, Platform.TWITCH)

		await nextTick()

		expect(wrapper.isVisible()).toBe(true)
		expect(wrapper.classes().includes('item-success')).toBe(true)
		expect(wrapper.text()).toContain('Test Label')
		expect(wrapper.text()).toContain('Test Value')
	})

	it('hides component if property name is extension and platform is not Twitch', async () => {
		const wrapper = factory({
			name: 'extension',
			success: true,
			label: 'Test Label',
			value: 'Test Value',
		}, Platform.TROVO)

		await nextTick()

		expect(wrapper.isVisible()).toBe(false)
		expect(wrapper.classes().includes('item-success')).not.toBe(true)
		expect(wrapper.text()).not.toContain('Test Label')
		expect(wrapper.text()).not.toContain('Test Value')
	})
})
