import type { TCPMFormatsData } from '@/core/types'

import type { IUpdateAgencyData, IUpdateAgencyPayload } from './types'

export const dataToPayload = (data: IUpdateAgencyData): IUpdateAgencyPayload => {
	const formatCpm = (cpm: TCPMFormatsData) => {
		return Object.entries(cpm).reduce((acc, [key, value]) => {
			acc[key as keyof TCPMFormatsData] = value ? +value : null
			return acc
		}, {} as TCPMFormatsData)
	}
	return {
		streamers_participate: data.streamersParticipate,
		use_dark_market: data.useDarkMarket,
		commission: data.commission ? +data.commission : null,
		external_cpm: data.cpm.externalCpm ? formatCpm(data.cpm.externalCpm) : null,
		internal_cpm: data.cpm.internalCpm ? formatCpm(data.cpm.internalCpm) : null,
		external_cpa: data.cpm.externalCpa ? +data.cpm.externalCpa : null,
		internal_cpa: data.cpm.internalCpa ? +data.cpm.internalCpa : null,
		external_cpc: data.cpm.externalCpc ? +data.cpm.externalCpc : null,
		internal_cpc: data.cpm.internalCpc ? +data.cpm.internalCpc : null,
		dark_market_external_cpm: data.cpm.darkMarketExternalCpm ? formatCpm(data.cpm.darkMarketExternalCpm) : null,
		dark_market_internal_cpm: data.cpm.darkMarketInternalCpm ? formatCpm(data.cpm.darkMarketInternalCpm) : null,
		dark_market_external_cpa: data.cpm.darkMarketExternalCpa ? +data.cpm.darkMarketExternalCpa : null,
		dark_market_internal_cpa: data.cpm.darkMarketInternalCpa ? +data.cpm.darkMarketInternalCpa : null,
		dark_market_external_cpc: data.cpm.darkMarketExternalCpc ? +data.cpm.darkMarketExternalCpc : null,
		dark_market_internal_cpc: data.cpm.darkMarketInternalCpc ? +data.cpm.darkMarketInternalCpc : null,
		ignore_categories: data.ignoredCategories,
	}
}
