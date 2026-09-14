import type { TCPM, TCPMFormatsResponse } from '@/core/types'

export interface IUpdateAgencyData {
  streamersParticipate: boolean
  useDarkMarket: boolean
  commission: number | null
  cpm: TCPM
  ignoredCategories: number[]
}

export interface IUpdateAgencyPayload {
  streamers_participate: boolean
  use_dark_market: boolean
  commission: number | null
	internal_cpa: number | null
	internal_cpc: number | null
	internal_cpm: TCPMFormatsResponse | null
	external_cpa: number | null
	external_cpc: number | null
	external_cpm: TCPMFormatsResponse | null
	dark_market_internal_cpa: number | null
	dark_market_internal_cpc: number | null
	dark_market_internal_cpm: TCPMFormatsResponse | null
	dark_market_external_cpa: number | null
	dark_market_external_cpc: number | null
	dark_market_external_cpm: TCPMFormatsResponse | null
  ignore_categories: number[]
}
