import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/fixtures/brandAwarenessCustomAdsetShort'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { checkListData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/checkListData'

import ActiveCampaigns from '../ActiveCampaigns.vue'

describe('Streamer Dashboard Values ActiveCampaigns', () => {
	const factory = () => {
		const wrapper = mount(ActiveCampaigns, {
			global: {
				directives: {
					loading: ElLoadingDirective,
				},
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const dashboardStore = useDashboardStore()
		const campaignsStore = useCampaignsStore()
		dashboardStore.checklist = checkListData

		return { wrapper, dashboardStore, campaignsStore }
	}

	it('renders caption when there are active campaigns', () => {
		const { wrapper, campaignsStore } = factory()

		campaignsStore.activeCampaignsShort = {
			data: {
				active: [],
				future: [],
				inactive: [],
				unavailable: [],
			},
		}

		expect(wrapper.find('[data-test="values-item-caption"]').text()).toContain('New campaigns coming soon')
	})

	it('renders correct number of campaign cards', async () => {
		const { wrapper, campaignsStore } = factory()

		campaignsStore.activeCampaignsShort = {
			data: {
				active: [brandAwarenessCustomAdsetShort, brandAwarenessCustomAdsetShort, brandAwarenessCustomAdsetShort, brandAwarenessCustomAdsetShort],
				future: [],
				inactive: [],
				unavailable: [],
			},
		}

		await nextTick()

		expect(wrapper.findAll('.campaign-card')).toHaveLength(wrapper.vm.CAMPAIGN_COUNT)
		expect(wrapper.find('[data-test="campaigns-left"]').text()).toContain(`+${wrapper.vm.remainingCampaignsCount}`)
	})

	it('renders correct number of campaign cards if campaigns is not enough', async () => {
		const { wrapper, campaignsStore } = factory()

		campaignsStore.activeCampaignsShort = {
			data: {
				active: [brandAwarenessCustomAdsetShort, brandAwarenessCustomAdsetShort],
				future: [],
				inactive: [],
				unavailable: [],
			},
		}

		await nextTick()

		expect(wrapper.findAll('.campaign-card')).toHaveLength(wrapper.vm.campaignsToShow.length)
		expect(wrapper.find('[data-test="campaigns-left"]').exists()).toBe(false)
	})
})
