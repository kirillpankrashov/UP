import {
	AdFormat,
	AdsetStatus,
	CampaignType,
	Platform,
} from '@/core/types'

export interface IPerformanceAdsetShortResponse {
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IPerformanceAdsetsShortResponse {
	active: IPerformanceAdsetShortResponse[]
	inactive: IPerformanceAdsetShortResponse[]
	future: IPerformanceAdsetShortResponse[]
	unavailable: IPerformanceAdsetShortResponse[]
}

export interface IPerformanceAdsetShort {
	campaignType: CampaignType.PERFORMANCE
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IPerformanceAdsetsShort {
	active: IPerformanceAdsetShort[]
	inactive: IPerformanceAdsetShort[]
	future: IPerformanceAdsetShort[]
	unavailable: IPerformanceAdsetShort[]
}
