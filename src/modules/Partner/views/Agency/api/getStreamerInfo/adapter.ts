import type { IStreamerInfoResponse } from './types'
import type { IStreamerInfo } from './types'

export const responseToData = (response: IStreamerInfoResponse): IStreamerInfo => ({
	externalCpm: response.external_cpm || null,
	internalCpm: response.internal_cpm || null,
	externalCpa: response.external_cpa || null,
	internalCpa: response.internal_cpa || null,
	externalCpc: response.external_cpc || null,
	internalCpc: response.internal_cpc || null,
	darkMarketExternalCpm: response.dark_market_external_cpm || null,
	darkMarketInternalCpm: response.dark_market_internal_cpm || null,
	darkMarketExternalCpa: response.dark_market_external_cpa || null,
	darkMarketInternalCpa: response.dark_market_internal_cpa || null,
	darkMarketExternalCpc: response.dark_market_external_cpc || null,
	darkMarketInternalCpc: response.dark_market_internal_cpc || null,
})
