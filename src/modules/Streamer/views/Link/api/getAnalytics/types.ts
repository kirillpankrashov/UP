export interface ILinkAnalyticsResponse {
	is_premium: boolean
	avg_cpm: number
	impressions: number
	revenue_day: number
	revenue_month: number
}

export interface ILinkAnalytics {
	isPremium: boolean
	avgCpm: number
	impressions: number
	revenue: {
		day: number
		month: number
	}
}
