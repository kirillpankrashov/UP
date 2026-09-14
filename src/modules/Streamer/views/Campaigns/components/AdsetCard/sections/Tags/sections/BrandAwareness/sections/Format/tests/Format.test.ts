import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Format from '../Format.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags BrandAwareness Format', () => {
	const factory = (props = {}, platform = Platform.TWITCH) => {
		const wrapper = mount(Format, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = {
			...widgetData,
			platform,
		}

		return { wrapper, settingsStore }
	}

	describe('Format label', () => {
		it('shows PiP label for SSP Media Format on Twitch', () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.YANDEX_FS,
					title: 'Some Format',
				},
			}, Platform.TWITCH)

			expect(wrapper.text()).toContain('campaignRow.format.fullscreen')
		})

		it('shows fullscreen label for SSP Media Format on YouTube', () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.FULLSCREEN,
					title: 'Some Format',
				},
			}, Platform.YOUTUBE)

			expect(wrapper.text()).toContain('Some Format')
		})

		it('shows format title for non-SSP Media Format', () => {
			const { wrapper } = factory({
				format: {
					id: 2,
					title: 'Custom Format',
				},
			})

			expect(wrapper.text()).toContain('Custom Format')
		})

		it('shows undefined format message when format title is missing', () => {
			const { wrapper } = factory({
				format: {
					id: 2,
					title: '',
				},
			})

			expect(wrapper.text()).toContain('campaignRow.tags.undefinedFormat')
		})
	})

	it('passes correct props to ElTag', () => {
		const { wrapper } = factory()

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			round: true,
		}))
	})
})
