import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ChatbotFrequency, LinkCardPosition, SupporterAlertDuration } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { alertsData } from '@/modules/Streamer/views/Link/api/getAlerts/fixtures/alertsData'
import { useLinkAlertsStore } from '@/modules/Streamer/views/Link/store'

import Alerts from '../Alerts.vue'
import { Chatbot, Goal, Poll, SendPreview, Supporters } from '../sections'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Alerts', () => {
	const factory = () => {
		const wrapper = mount(Alerts, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const alertsStore = useLinkAlertsStore()

		alertsStore.data = alertsData

		return { wrapper, alertsStore }
	}

	beforeEach(() => {
		vi.useFakeTimers()
	})

	it('renders correctly', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent(SendPreview).exists()).toBe(true)
		expect(wrapper.findComponent(Supporters).exists()).toBe(true)
		expect(wrapper.findComponent(Goal).exists()).toBe(true)
		expect(wrapper.findComponent(Poll).exists()).toBe(true)
		expect(wrapper.findComponent(Chatbot).exists()).toBe(true)
	})

	it('fetches alerts on mount', () => {
		const { alertsStore } = factory()

		expect(alertsStore.fetchAlerts).toHaveBeenCalled()
	})

	it('updates model when alerts change', async () => {
		const { wrapper, alertsStore } = factory()

		const newAlerts = {
			chatbotFrequency: ChatbotFrequency.EVERY_15_MIN,
			goalPosition: LinkCardPosition.LEFT_TOP_CORNER,
			pollPosition: LinkCardPosition.RIGHT_BOTTOM_CORNER,
			supporterAlertDuration: SupporterAlertDuration.EVERY_15_SEC,
			supporterAlertPosition: LinkCardPosition.RIGHT_TOP_CORNER,
		}

		alertsStore.data = newAlerts

		await nextTick()

		expect(wrapper.vm.model).toEqual(newAlerts)
	})

	// it('calls updateAlerts when model changes', async () => {
	// 	const { wrapper, alertsStore } = factory()

	// 	await nextTick()

	// 	wrapper.vm.model.chatbotFrequency = ChatbotFrequency.EVERY_30_MIN

	// 	await nextTick()
	// 	vi.runAllTimers()

	// 	expect(alertsStore.updateAlerts).toHaveBeenCalled()
	// })
})
