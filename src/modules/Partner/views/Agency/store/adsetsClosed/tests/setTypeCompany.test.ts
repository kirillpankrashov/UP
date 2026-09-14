import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'

import { useAdsetsClosedStore } from '../adsetsClosed'

vi.mock('@/core/helpers')

describe('AdsetsClosed Store setTypeCompany', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('setTypeCompany – updates campaignType', () => {
		const store = useAdsetsClosedStore()

		store.setTypeCompany(CampaignType.PERFORMANCE)

		expect(store.campaignType).toBe(CampaignType.PERFORMANCE)
	})
})

