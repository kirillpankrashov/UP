import type {
	AdsetBlockReason,
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	PayoutType,
	Platform,
} from '@/core/types'

export interface IPerformanceAdsetResponse {
	actions: number
	adset_ready: boolean
	blocked_at: string | null
	blocked_until: string | null
	blocked_reason: AdsetBlockReason | null
	clicks: number
	ctr: number
	currency: CurrencyName
	description: string
	end: string
	format: IAdFormat
	id: number
	impressions: number
	income: number
	logo: string
	payable_type: PayoutType
	platform: Platform
	ready: boolean
	restore: boolean
	slug: string
	start: string
	status: AdsetStatus
	title: string
}

export interface IPerformanceAdsetsResponse {
	active: IPerformanceAdsetResponse[]
	inactive: IPerformanceAdsetResponse[]
	future: IPerformanceAdsetResponse[]
	unavailable: IPerformanceAdsetResponse[]
}

export interface IPerformanceAdset {
	campaignType: CampaignType.PERFORMANCE
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	payableType: PayoutType
	impressions: number
	clicks: number
	ctr: number
	actions: number
	income: number
	currency: CurrencyName
	dates: {
		start: string
		end: string
	}
	status: AdsetStatus
	adsetReady: boolean
	ready: boolean
	restore: boolean
	blocked: {
		at: string | null
		until: string | null
		reason: AdsetBlockReason | null
	}
}

export interface IPerformanceAdsets {
	active: IPerformanceAdset[]
	inactive: IPerformanceAdset[]
	future: IPerformanceAdset[]
	unavailable: IPerformanceAdset[]
}
