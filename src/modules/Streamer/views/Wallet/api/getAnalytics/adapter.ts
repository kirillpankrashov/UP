import type { IWalletAnalyticsDay, IWalletAnalyticsDayResponse } from './types'

export const responseToData = (response: IWalletAnalyticsDayResponse[]): IWalletAnalyticsDay[] => {
	return response.map(day => ({
		date: day.date,
		brandAwareness: day.brand_awareness || 0,
		performance: day.performance || 0,
		extension: day.extension || 0,
		cpaTargetActions: day.cpa_target_actions || 0,
		freemium: day.freemium || 0,
		referral: day.referral || 0,
		youtubeText: day.youtube_text || 0,
	}))
}
