import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { ChatbotFrequency, LinkCardPosition, SupporterAlertDuration } from '@/core/types/link'
import { i18n } from '@/core/i18n'

import Chatbot from '../Chatbot.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Alerts Chatbot', () => {
	const factory = () => {
		const mockModelValue = {
			goalPosition: LinkCardPosition.LEFT_TOP_CORNER,
			pollPosition: LinkCardPosition.RIGHT_TOP_CORNER,
			chatbotFrequency: ChatbotFrequency.EVERY_15_MIN,
			supporterAlertPosition: LinkCardPosition.LEFT_BOTTOM_CORNER,
			supporterAlertDuration: SupporterAlertDuration.EVERY_10_SEC,
		}

		const wrapper = mount(Chatbot, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: ['router-link', 'ElOption'],
			},
			props: {
				modelValue: mockModelValue,
			},
		})

		return { wrapper }
	}

	it('renders all ChatbotFrequency options', () => {
		const { wrapper } = factory()

		const expectedValues = [
			ChatbotFrequency.EVERY_15_MIN,
			ChatbotFrequency.EVERY_30_MIN,
			ChatbotFrequency.EVERY_HOUR,
			ChatbotFrequency.DISABLED,
		]

		const options = wrapper.findAllComponents({ name: 'ElOption' })
		options.forEach(option => {
			expect(expectedValues).toContain(option.props().value)
		})
	})
})
