import type {
	CampaignType,
	CurrencyName,
	IAdFormat,
	PayoutType,
	Platform,
	PrerollAdsetStatus,
} from '@/core/types'

export interface IPrerollAdsetResponse {
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	payable_type: PayoutType
	impressions: number
	clicks: number
	actions: number
	income: number
	currency: CurrencyName
	ctr: number
	start: string
	end: string
	creator_avg_views: number
	campaign_impressions: number
	earnings_limit: number
	status: PrerollAdsetStatus
}

export type IPrerollAdsetsResponse = IPrerollAdsetResponse[]

export interface IPrerollAdset {
	campaignType: CampaignType.PREROLL
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	payableType: PayoutType
	clicks: number
	actions: number
	income: number
	currency: CurrencyName
	ctr: number
	dates: {
		start: string
		end: string
	}
	impressions: {
		campaign: number
		creator: number
	}
	creatorAvgViews: number
	earningsLimit: number
	status: PrerollAdsetStatus
}

export type IPrerollAdsets = IPrerollAdset[]
