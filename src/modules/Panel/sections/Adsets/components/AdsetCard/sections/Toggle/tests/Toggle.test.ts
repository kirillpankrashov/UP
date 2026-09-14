import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdsetStatus, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Toggle from '../Toggle.vue'

vi.mock('@/modules/Streamer/views/Campaigns/api')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, params?: Record<string, unknown>) => {
			if (key === 'campaignRow.disabledUntil' && params?.date) {
				return `Disabled until ${params.date}`
			}
			return key
		},
	}),
}))

describe('Toggle Component', () => {
	const factory = (props = {}, brandisExtensionEnabled = true) => {
		const wrapper = mount(Toggle, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					CheckIcon: true,
					CloseIcon: true,
				},
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
			brandisExtensionEnabled,
		}

		const campaignsStore = useCampaignsStore()

		return { wrapper, settingsStore, campaignsStore }
	}

	describe('Visibility', () => {
		it('does not render toggle for closed adset', async () => {
			const { wrapper } = factory({
				status: 'close',
			})

			await nextTick()
			expect(wrapper.find('[data-name="campaigns-adset-card-toggle"] div').exists()).toBe(false)
		})

		it('does not render toggle for unavailable adset', async () => {
			const { wrapper } = factory({
				status: AdsetStatus.UNAVAILABLE,
			})

			await nextTick()
			expect(wrapper.find('[data-name="campaigns-adset-card-toggle"] div').exists()).toBe(false)
		})

		it('does not render toggle for preroll campaign', async () => {
			const { wrapper } = factory({
				campaignType: CampaignType.PREROLL,
			})

			await nextTick()
			expect(wrapper.find('[data-name="campaigns-adset-card-toggle"] div').exists()).toBe(false)
		})

		it('does not render toggle for performance campaign when brandis extension disabled', async () => {
			const { wrapper } = factory({
				campaignType: CampaignType.PERFORMANCE,
			}, false)

			await nextTick()
			expect(wrapper.find('[data-name="campaigns-adset-card-toggle"] div').exists()).toBe(false)
		})
	})

	describe('Toggle functionality', () => {
		it('shows enable label for inactive adset', async () => {
			const { wrapper } = factory({
				status: AdsetStatus.INACTIVE,
			})

			await nextTick()
			expect(wrapper.text()).toContain('campaignRow.enable')
		})

		it('shows disable label for active adset', async () => {
			const { wrapper } = factory({
				status: AdsetStatus.ACTIVE,
			})

			await nextTick()
			expect(wrapper.text()).toContain('campaignRow.disable')
		})

		it('calls changeCampaignStatus on click', async () => {
			const { wrapper, campaignsStore } = factory({
				status: AdsetStatus.ACTIVE,
			})

			await nextTick()
			await wrapper.find('[data-test="campaigns-adset-card-toggle"]').trigger('click')
			expect(campaignsStore.changeCampaignStatus).toHaveBeenCalledOnce()
		})
	})

	describe('Blocked status', () => {
		it('shows blocked until message when applicable', async () => {
			const { wrapper } = factory({
				status: AdsetStatus.INACTIVE,
				restore: false,
				blocked: {
					until: '2024-12-31 12:00',
				},
			})

			await nextTick()
			expect(wrapper.text()).toContain('Disabled until')
		})

		it('does not show blocked until message for active adset', async () => {
			const { wrapper } = factory({
				status: AdsetStatus.ACTIVE,
				restore: false,
				blocked: {
					until: '2024-12-31 12:00',
				},
			})

			await nextTick()
			expect(wrapper.text()).not.toContain('Disabled until')
		})
	})
})
