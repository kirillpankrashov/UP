import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdvertisingFrequency, AdvertisingMode, AdvertisingPosition } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Settings from '../Settings.vue'

vi.mock('vue-router')
vi.mock('vue-qr/src/packages/vue-qr.vue', () => ({
	default: {
		name: 'VueQr',
		template: '<div data-test="vue-qr-mock" />',
	},
}))
vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()

	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})
vi.mock('@/core/helpers')

describe('Streamer Settings', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {},
	} as any)

	const factory = (props: any) => {
		const wrapper = mount(Settings, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = widgetData

		return { wrapper, settingsStore }
	}

	beforeEach(() => {
		vi.useFakeTimers()
	})

	it('calls updateWidget on advertising mode change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.advertising.mode = AdvertisingMode.MANUAL

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on advertising frequency change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.advertising.frequency = AdvertisingFrequency.EVERY_15_MIN

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on advertising box size change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.boxSize = 7

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on advertising position change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.advertising.position = AdvertisingPosition.RIGHT_BOTTOM_CORNER

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on ssp text frequency change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.ssp.text.frequency = 15

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on ssp adult content status change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.ssp.allowAdult = false

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on stream delay change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.stream.delay = 10

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})

	it('calls updateWidget on ignore categories change', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		wrapper.vm.widget!.ignoreCategories = [0, 1, 2, 3]

		await nextTick()
		vi.runAllTimers()

		expect(settingsStore.updateWidget).toHaveBeenCalledOnce()
	})
})
