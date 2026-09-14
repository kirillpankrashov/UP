import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import Indicators from '../Indicators.vue'

const formatNumberMock = vi.fn((value: number, _round: boolean) => `FMT-${value}`)
const tMock = vi.fn((key: string, params?: { n?: string }) => {
	if (key === 'helpers.streamers') return `helpers.streamers:${params?.n ?? ''}`
	return key
})

vi.mock('@/core/hooks', () => ({
	useCurrency: () => ({
		formatNumber: formatNumberMock,
	}),
	useLocale: () => ({
		t: tMock,
	}),
}))

const adsetFixture = adsetsActiveData.data[1] as any

describe('Agency AdsetCard Indicators Component', () => {
	it('renders correct end-date block for closed adset', () => {
		formatNumberMock.mockClear()
		tMock.mockClear()

		const closedAdset = {
			...adsetFixture,
			status: 'closed',
			dates: {
				...adsetFixture.dates,
				end: '2024-02-01',
			},
		}

		const wrapper = mount(Indicators, {
			props: {
				adset: closedAdset,
			},
		})

		expect(wrapper.find('[data-test="campaigns-adset-card-indicators"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('creators.campaignRow.dateEnd')
		expect(wrapper.text()).toContain('2024-02-01')

		// open-only captions/values shouldn't be there
		expect(wrapper.text()).not.toContain('creators.campaignRow.dateStart')
		expect(wrapper.text()).not.toContain('helpers.streamers')
		expect(formatNumberMock).not.toHaveBeenCalled()
	})

	it('renders start/end + streamers when adset is active and impressions.total is truthy', () => {
		formatNumberMock.mockClear()
		tMock.mockClear()

		const activeAdset = { ...adsetFixture, status: 'active' }
		const expectedImpressionsTotal = adsetFixture.impressions.total
		const expectedStreamers = adsetFixture.streamers

		const wrapper = mount(Indicators, {
			props: {
				adset: activeAdset,
			},
		})

		expect(wrapper.text()).toContain('creators.campaignRow.dateStart')
		expect(wrapper.text()).toContain(adsetFixture.dates.start)
		expect(wrapper.text()).toContain('creators.campaignRow.dateEnd')
		expect(wrapper.text()).toContain(adsetFixture.dates.end)
		expect(wrapper.text()).toContain(`helpers.streamers:FMT-${expectedStreamers}`)
		expect(wrapper.text()).toContain(`FMT-${expectedImpressionsTotal}`)

		expect(formatNumberMock).toHaveBeenCalledWith(expectedImpressionsTotal, false)
		expect(formatNumberMock).toHaveBeenCalledWith(expectedStreamers, false)
		expect(tMock).toHaveBeenCalledWith('helpers.streamers', { n: `FMT-${expectedStreamers}` })
	})

	it('does not render impressions block when adset.impressions.total is 0', () => {
		formatNumberMock.mockClear()

		const activeZeroImpressionsAdset = {
			...adsetFixture,
			status: 'active',
			impressions: {
				...adsetFixture.impressions,
				total: 0,
			},
		}

		const wrapper = mount(Indicators, {
			props: {
				adset: activeZeroImpressionsAdset,
			},
		})

		expect(wrapper.text()).toContain(`helpers.streamers:FMT-${adsetFixture.streamers}`)
		expect(wrapper.text()).not.toContain('FMT-0')

		// still formats streamers
		expect(formatNumberMock).toHaveBeenCalledWith(adsetFixture.streamers, false)
		expect(formatNumberMock).not.toHaveBeenCalledWith(0, false)
	})
})

