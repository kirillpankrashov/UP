import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import AdsetCard from '../AdsetCard.vue'

vi.mock('@/components/element-plus', () => ({
	ElTooltip: {
		template: '<div><slot /></div>',
	},
}))

vi.mock('../sections', () => ({
	Indicators: {
		props: ['adset'],
		template: '<div data-test="indicators-stub">{{ adset.slug }}</div>',
	},
	Tags: {
		props: ['adset', 'adsetsStore'],
		template: '<div data-test="tags-stub">{{ adset.slug }}</div>',
	},
}))

describe('Agency AdsetCard Component', () => {
	it('clicks getAdsetInfo only for active adsets', async () => {
		const storeMock = {
			getAdsetInfo: vi.fn(),
		} as any

		const activeAdset = {
			...adsetsActiveData.data[1],
			status: 'active',
		} as any

		const closedAdset = {
			...adsetsActiveData.data[1],
			status: 'closed',
		} as any

		const activeWrapper = mount(AdsetCard, {
			props: {
				adset: activeAdset,
				adsetsStore: storeMock,
			},
		})

		expect(activeWrapper.find('[data-test="tags-stub"]').exists()).toBe(true)
		expect(activeWrapper.find('[data-test="indicators-stub"]').exists()).toBe(true)
		expect(activeWrapper.find('[data-test="tags-stub"]').text()).toBe(activeAdset.slug)
		expect(activeWrapper.find('[data-test="indicators-stub"]').text()).toBe(activeAdset.slug)

		await activeWrapper.find('[data-test="campaigns-adset-card"]').trigger('click')
		expect(storeMock.getAdsetInfo).toHaveBeenCalledWith(activeAdset.slug)

		storeMock.getAdsetInfo.mockClear()

		const closedWrapper = mount(AdsetCard, {
			props: {
				adset: closedAdset,
				adsetsStore: storeMock,
			},
		})

		await closedWrapper.find('[data-test="campaigns-adset-card"]').trigger('click')
		expect(storeMock.getAdsetInfo).not.toHaveBeenCalled()
	})
})

