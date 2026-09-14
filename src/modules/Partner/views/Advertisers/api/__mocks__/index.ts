import { vi } from 'vitest'

import type { IHolding } from '@/core/types'
import type { IAdvertiser } from '@/modules/Partner/views/Advertisers/api'
import { advertisers } from '@/modules/Partner/views/Advertisers/api/getAdvertisers/fixtures/advertisers'
import { holdings } from '@/modules/Partner/views/Advertisers/api/getHoldings/fixtures/holdings'

export const getAdvertisers = vi.fn(async (): Promise<IAdvertiser[]> => {
	return new Promise(resolve => resolve(advertisers))
})

export const getHoldings = vi.fn(async (): Promise<IHolding[]> => {
	return new Promise(resolve => resolve(holdings))
})
