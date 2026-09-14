import type { IAdsetAnalytics, IAdsetAnalyticsResponse } from './types'

export const responseToData = (response: IAdsetAnalyticsResponse): IAdsetAnalytics => {
	return {
		title: response.title,
		data: response.data.map(item => ({
			date: item.date,
			impressions: item.impressions,
			clicks: item.clicks,
			botClicks: item.bot_clicks,
			ctr: item.ctr,
		})),
	}
}
