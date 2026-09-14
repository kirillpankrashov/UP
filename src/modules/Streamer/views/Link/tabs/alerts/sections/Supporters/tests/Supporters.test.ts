import { createTestingPinia } from '@pinia/testing'
import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { ChatbotFrequency, LinkCardPosition, SupporterAlertDuration } from '@/core/types/link'
import { i18n } from '@/core/i18n'

import Supporters from '../Supporters.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Alerts Supporters', () => {
	const factory = () => {
		const mockModelValue = {
			supporterAlertPosition: LinkCardPosition.LEFT_TOP_CORNER,
			supporterAlertDuration: SupporterAlertDuration.EVERY_10_SEC,
			chatbotFrequency: ChatbotFrequency.EVERY_15_MIN,
			pollPosition: LinkCardPosition.LEFT_TOP_CORNER,
			goalPosition: LinkCardPosition.LEFT_TOP_CORNER,
		} as any

		const wrapper = mount(Supporters, {
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

	it('renders all supporter duration options', () => {
		const { wrapper } = factory()

		const select = wrapper.findAllComponents({ name: 'ElSelect' })[0]
		const options = select!.findAllComponents({ name: 'ElOption' })

		const expectedValues = [10, 15]

		expectedValues.forEach(value => {
			expect(options.some((option: VueWrapper<any>) => option.props('value') === value)).toBe(true)
		})
	})

	it('renders all LinkCardPosition options', () => {
		const { wrapper } = factory()

		const expectedValues = [
			LinkCardPosition.LEFT_TOP_CORNER,
			LinkCardPosition.RIGHT_TOP_CORNER,
			LinkCardPosition.LEFT_BOTTOM_CORNER,
			LinkCardPosition.RIGHT_BOTTOM_CORNER,
			LinkCardPosition.DISABLED,
		]

		const select = wrapper.findAllComponents({ name: 'ElSelect' })[1]
		const options = select!.findAllComponents({ name: 'ElOption' })

		options.forEach((option: VueWrapper<any>) => {
			expect(expectedValues).toContain(option.props('value'))
		})
	})
})
