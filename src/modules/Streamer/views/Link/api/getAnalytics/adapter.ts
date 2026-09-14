import type { ILinkAnalytics, ILinkAnalyticsResponse } from './types'

export const responseToData = (response: ILinkAnalyticsResponse): ILinkAnalytics => {
	return {
		isPremium: response.is_premium || false,
		avgCpm: response.avg_cpm || 0,
		impressions: response.impressions || 0,
		revenue: {
			day: response.revenue_day || 0,
			month: response.revenue_month || 0,
		},
	}
}
