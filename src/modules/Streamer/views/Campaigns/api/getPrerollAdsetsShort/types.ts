import {
	AdFormat,
	AdsetStatus,
	CampaignType,
	Platform,
} from '@/core/types'

export interface IPrerollAdsetShortResponse {
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export type IPrerollAdsetsShortResponse = IPrerollAdsetShortResponse[]

export interface IPrerollAdsetShort {
	campaignType: CampaignType.PREROLL
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export type IPrerollAdsetsShort = IPrerollAdsetShort[]
