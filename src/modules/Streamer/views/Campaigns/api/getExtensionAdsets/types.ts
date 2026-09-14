import type {
	AdsetBlockReason,
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	Platform,
} from '@/core/types'

export interface IExtensionAdsetResponse {
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	impressions: number
	clicks: number
	actions: number
	income: number
	currency: CurrencyName
	ctr: number
	start: string
	end: string
	status: AdsetStatus
	adset_ready: boolean
	ready: boolean
	restore: boolean
	blocked_at: string | null
	blocked_until: string | null
	blocked_reason: AdsetBlockReason | null
}

export interface IExtensionAdsetsResponse {
	active: IExtensionAdsetResponse[]
	inactive: IExtensionAdsetResponse[]
	future: IExtensionAdsetResponse[]
	unavailable: IExtensionAdsetResponse[]
}

export interface IExtensionAdset {
	campaignType: CampaignType.EXTENSION
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	impressions: number
	clicks: number
	actions: number
	income: number
	currency: CurrencyName
	ctr: number
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

export interface IExtensionAdsets {
	active: IExtensionAdset[]
	inactive: IExtensionAdset[]
	future: IExtensionAdset[]
	unavailable: IExtensionAdset[]
}
