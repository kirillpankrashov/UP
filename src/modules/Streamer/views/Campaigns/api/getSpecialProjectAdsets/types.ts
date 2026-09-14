import type {
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	Platform,
	StrategyPayment,
} from '@/core/types'

export interface ISpecialProjectAdsetResponse {
	id: number
	slug: string
	title: string
	description: string | null
	platform: Platform
	format: IAdFormat
	logo: string | null
	start: string | null
	end: string | null
	impressions: number
	strategy_payment: StrategyPayment | null
	payout_type: string
	currency: CurrencyName
	restore: boolean
	status: AdsetStatus
}

export interface ISpecialProjectAdsetsResponse {
	active: ISpecialProjectAdsetResponse[]
	inactive: ISpecialProjectAdsetResponse[]
	future: ISpecialProjectAdsetResponse[]
	unavailable: ISpecialProjectAdsetResponse[]
}

export interface ISpecialProjectAdset {
	campaignType: CampaignType.SPECIAL_PROJECT
	id: number
	slug: string
	title: string
	description: string | null
	platform: Platform
	format: IAdFormat
	logo: string | null
	dates: {
		start: string | null
		end: string | null
	}
	impressions: number
	strategyPayment: StrategyPayment | null
	payoutType: string
	currency: CurrencyName
	restore: boolean
	status: AdsetStatus
}

export interface ISpecialProjectAdsets {
	active: ISpecialProjectAdset[]
	inactive: ISpecialProjectAdset[]
	future: ISpecialProjectAdset[]
	unavailable: ISpecialProjectAdset[]
}
