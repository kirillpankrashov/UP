import {
	AdFormat,
	AdsetStatus,
	CampaignType,
	Platform,
} from '@/core/types'

export interface IExtensionAdsetShortResponse {
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IExtensionAdsetsShortResponse {
	active: IExtensionAdsetShortResponse[]
	inactive: IExtensionAdsetShortResponse[]
	future: IExtensionAdsetShortResponse[]
	unavailable: IExtensionAdsetShortResponse[]
}

export interface IExtensionAdsetShort {
	campaignType: CampaignType.EXTENSION
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IExtensionAdsetsShort {
	active: IExtensionAdsetShort[]
	inactive: IExtensionAdsetShort[]
	future: IExtensionAdsetShort[]
	unavailable: IExtensionAdsetShort[]
}
