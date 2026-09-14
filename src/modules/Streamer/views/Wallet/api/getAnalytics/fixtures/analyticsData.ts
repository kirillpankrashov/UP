import moment from 'moment'

import type { IWalletAnalyticsDay } from '../types'

const _generateAnalytics = () => {
	const days: IWalletAnalyticsDay[] = []
	for (let i = 1; i <= 31; i++) {
		days.push({
			date: moment().subtract(i, 'day').format('YYYY-MM-DD'),
			brandAwareness: 10 * i,
			performance: 10 * i,
			extension: 10 * i,
			cpaTargetActions: 10 * i,
			freemium: 10 * i,
			referral: 10 * i,
			youtubeText: 10 * i,
		})
	}
	return days
}

export const analyticsData: IWalletAnalyticsDay[] = _generateAnalytics()
