import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'

import Progress from '../Progress.vue'

describe('Components Progress Component', () => {
	const factory = (
		props: Record<string, unknown> = {},
		slots?: Record<string, string>,
	) =>
		mount(Progress, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
			},
			props: {
				current: 0,
				total: 100,
				text: 'Budget',
				...props,
			},
			slots,
		})

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('uses danger styling when progress is 0', async () => {
		const wrapper = factory({ current: 0, total: 100 })
		await nextTick()

		expect(wrapper.find('.bg-danger-50').exists()).toBe(true)
		expect(wrapper.find('.bg-danger-200.absolute').exists()).toBe(true)
	})

	it('uses success styling when progress is greater than 0', async () => {
		const wrapper = factory({ current: 1, total: 100 })
		await nextTick()

		expect(wrapper.find('.bg-success-50').exists()).toBe(true)
		expect(wrapper.find('.bg-success-200.absolute').exists()).toBe(true)
	})

	it('sets fill width from current and total', async () => {
		const wrapper = factory({ current: 33, total: 100 })
		await nextTick()

		const fill = wrapper.find('.absolute.left-0.top-0.h-full')
		expect(fill.attributes('style')).toContain('width: 33%')
	})

	it('caps fill and percentage at 100% when current exceeds total', async () => {
		const wrapper = factory({ current: 250, total: 100, text: 'Budget' })
		await nextTick()

		const fill = wrapper.find('.absolute.left-0.top-0.h-full')
		expect(fill.attributes('style')).toContain('width: 100%')
		expect(wrapper.text()).toMatch(/100%/)
	})

	it('shows translated default label when no slot is passed', async () => {
		const wrapper = factory({ current: 40, total: 100, text: 'Budget' })
		await nextTick()

		expect(wrapper.find('._text-s-regular.text-black').text()).toContain('40%')
		expect(wrapper.find('._text-s-regular.text-black').text()).toContain('of')
		expect(wrapper.find('._text-s-regular.text-black').text()).toContain('Budget')
	})

	it('renders slot content instead of the default percentage label', async () => {
		const wrapper = factory(
			{ current: 10, total: 100 },
			{ default: '<span data-test="progress-slot">Custom label</span>' },
		)
		await nextTick()

		expect(wrapper.find('[data-test="progress-slot"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="progress-slot"]').text()).toBe('Custom label')
		expect(wrapper.find('._text-s-regular.text-black').exists()).toBe(false)
	})

	it('does not render forecast popover when forecast or currency is missing', async () => {
		const wrapperA = factory({ current: 50, total: 100, forecast: 80 })
		const wrapperB = factory({ current: 50, total: 100, currency: CurrencyName.BRL })
		await nextTick()

		expect(wrapperA.findComponent({ name: 'ElPopover' }).exists()).toBe(false)
		expect(wrapperB.findComponent({ name: 'ElPopover' }).exists()).toBe(false)
	})

	it('renders forecast popover when forecast and currency are provided', async () => {
		const wrapper = factory({
			current: 50,
			total: 100,
			forecast: 90,
			currency: CurrencyName.BRL,
		})
		await nextTick()

		expect(wrapper.findComponent({ name: 'ElPopover' }).exists()).toBe(true)
	})

	it('positions forecast marker using forecast relative to total', async () => {
		const wrapper = factory({
			current: 20,
			total: 100,
			forecast: 75,
			currency: CurrencyName.BRL,
		})
		await nextTick()

		const marker = wrapper.find('.cursor-pointer.bg-primary')
		expect(marker.attributes('style')).toContain('left: 75%')
	})
})
