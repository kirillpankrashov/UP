import  {
	AdFormat,
	AdsetStatus,
	CampaignType,
	Platform,
} from '@/core/types'

export interface IBrandAwarenessAdsetShortResponse {
	id: number
	slug: string
	title: string
	format: {
		id: AdFormat
	}
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IBrandAwarenessAdsetsShortResponse {
	active: IBrandAwarenessAdsetShortResponse[]
	inactive: IBrandAwarenessAdsetShortResponse[]
	future: IBrandAwarenessAdsetShortResponse[]
	unavailable: IBrandAwarenessAdsetShortResponse[]
}

export interface IBrandAwarenessAdsetShort {
	campaignType: CampaignType.BRAND_AWARENESS
	id: number
	slug: string
	title: string
	format: AdFormat
	platform: Platform
	logo: string
	status: AdsetStatus
}

export interface IBrandAwarenessAdsetsShort {
	active: IBrandAwarenessAdsetShort[]
	inactive: IBrandAwarenessAdsetShort[]
	future: IBrandAwarenessAdsetShort[]
	unavailable: IBrandAwarenessAdsetShort[]
}
