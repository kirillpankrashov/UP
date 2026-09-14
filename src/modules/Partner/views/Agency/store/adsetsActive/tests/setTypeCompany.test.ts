import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'

import { useAdsetsActiveStore } from '../adsetsActive'

vi.mock('@/core/helpers')

describe('AdsetsActive Store setTypeCompany', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('setTypeCompany – updates campaignType', () => {
		const store = useAdsetsActiveStore()

		store.setTypeCompany(CampaignType.PERFORMANCE)

		expect(store.campaignType).toBe(CampaignType.PERFORMANCE)
	})
})

