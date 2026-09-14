import type { CampaignType } from '@/core/types'

export interface IPerformanceCompletedAdsetResponse {
	id: number
	slug: string
	title: string
	description: string
	logo: string
	start: string
	end: string
	status: 'close'
}

export interface IPerformanceCompletedAdset {
	campaignType: CampaignType.PERFORMANCE
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
