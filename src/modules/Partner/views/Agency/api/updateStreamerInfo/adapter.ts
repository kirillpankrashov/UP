import { type TCPMFormatsData } from '@/core/types'

import type { IUpdateStreamerInfoData } from './types'
import type { IUpdateStreamerInfoPayload } from './types'

const formatCpm = (cpm: TCPMFormatsData) => {
	return Object.entries(cpm).reduce((acc, [key, value]) => {
		acc[key as keyof TCPMFormatsData] = value ? +value : null
		return acc
	}, {} as TCPMFormatsData)
}

export const dataToPayload = (data: IUpdateStreamerInfoData): IUpdateStreamerInfoPayload => ({
	external_cpm: data.externalCpm ? formatCpm(data.externalCpm) : null,
	internal_cpm: data.internalCpm ? formatCpm(data.internalCpm) : null,
	dark_market_external_cpm: data.darkMarketExternalCpm ? formatCpm(data.darkMarketExternalCpm) : null,
	dark_market_internal_cpm: data.darkMarketInternalCpm ? formatCpm(data.darkMarketInternalCpm) : null,
	internal_cpa: data.internalCpa,
	internal_cpc: data.internalCpc,
	external_cpa: data.externalCpa,
	external_cpc: data.externalCpc,
	dark_market_internal_cpa: data.darkMarketInternalCpa,
	dark_market_internal_cpc: data.darkMarketInternalCpc,
	dark_market_external_cpa: data.darkMarketExternalCpa,
	dark_market_external_cpc: data.darkMarketExternalCpc,
})
