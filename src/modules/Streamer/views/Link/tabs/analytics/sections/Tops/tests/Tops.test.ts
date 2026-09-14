import { defineComponent } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { TopList, useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'

import Tops from '../Tops.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Link Analytics Tops', () => {
	const factory = () => {
		const wrapper = mount(Tops, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: {
					'router-link': true,
					StatCard: true,
					ElDatePicker: defineComponent({
						name: 'ElDatePicker',
						emits: ['change'],
						template: '<button data-test="link-analytics-tops-date-picker" type="button" @click="$emit(\'change\')">date-picker</button>',
					}),
				},
			},
		})

		// const streamerStore = useStreamerStore()
		// streamerStore.profile = profileData

		const analyticsStore = useLinkAnalyticsStore()

		return { wrapper, analyticsStore }
	}

	it('updates current list and date on button click', async () => {
		const { wrapper, analyticsStore } = factory()

		const btn = wrapper.find('[data-test="link-analytics-tops-list-yesterday-btn"]')
		await btn.trigger('click')

		expect(analyticsStore.currentList).toBe(TopList.YESTERDAY)
		expect(analyticsStore.topPeriod.date).toHaveLength(2)
	})

	it('calls fetchPeriod on date change', async () => {
		const { wrapper, analyticsStore } = factory()

		const datePicker = wrapper.find('[data-test="link-analytics-tops-date-picker"]')
		await datePicker.trigger('click')

		expect(analyticsStore.fetchPeriod).toHaveBeenCalled()
		expect(analyticsStore.currentList).toBe(TopList.PERIOD)
	})
})
