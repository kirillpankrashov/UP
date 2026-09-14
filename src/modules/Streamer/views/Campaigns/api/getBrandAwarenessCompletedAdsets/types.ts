import type { CampaignType } from '@/core/types'

export interface IBrandAwarenessCompletedAdsetResponse {
	id: number
	slug: string
	title: string
	description: string
	logo: string
	start: string
	end: string
	status: 'close'
}

export interface IBrandAwarenessCompletedAdset {
	campaignType: CampaignType.BRAND_AWARENESS
	id: number
	slug: string
	title: string
	description: string
	logo: string
	dates: {
		start: string
		end: string
	}
	status: 'close'
}
