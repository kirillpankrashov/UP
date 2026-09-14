import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { specialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/fixtures/specialProjectAdsetInfo'

import SpecialProjectInfo from '../SpecialProject.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, arg?: unknown) => (arg === undefined ? key : `${key}:${arg}`),
	}),
}))

describe('Streamer Campaigns AdsetInfo Info SpecialProject', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		// Fix "now" so daysLeft is deterministic (31.03.2027 - 30.03.2027 = 1 day).
		vi.setSystemTime(new Date('2027-03-30T12:00:00.000Z'))
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('renders payment type, format and end date', async () => {
		const wrapper = mount(SpecialProjectInfo, {
			props: { adset: specialProjectAdsetInfo },
		})

		await nextTick()

		expect(wrapper.find('[data-test="campaigns-info-payment-type"]').text()).toBe(specialProjectAdsetInfo.strategyPayment.title)
		expect(wrapper.find('[data-test="campaigns-info-format"]').text()).toBe(specialProjectAdsetInfo.format.title)

		const expectedDaysLeft = (() => {
			const diff = moment(specialProjectAdsetInfo.dates.end, 'DD.MM.YYYY').diff(moment(), 'days')
			return diff < 0 ? 0 : diff
		})()

		expect(wrapper.find('[data-test="campaigns-info-end-date"]').text()).toBe(`helpers.timeLeft.days:${expectedDaysLeft}`)
	})

	it('renders em dash when format is missing', async () => {
		const adset = {
			...specialProjectAdsetInfo,
			format: undefined,
		} as any

		const wrapper = mount(SpecialProjectInfo, {
			props: { adset },
		})

		await nextTick()

		expect(wrapper.find('[data-test="campaigns-info-format"]').text()).toBe('—')
	})
})

