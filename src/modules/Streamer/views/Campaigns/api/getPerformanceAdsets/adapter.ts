import { CampaignType } from '@/core/types'

import type { IPerformanceAdset, IPerformanceAdsetResponse, IPerformanceAdsets, IPerformanceAdsetsResponse } from './types'

export const responseToData = (response: IPerformanceAdsetsResponse): IPerformanceAdsets => {
	const adapter = (adset: IPerformanceAdsetResponse): IPerformanceAdset => {
		return {
			campaignType: CampaignType.PERFORMANCE,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
			platform: adset.platform,
			description: adset.description,
			logo: adset.logo,
			payableType: adset.payable_type,
			impressions: adset.impressions,
			clicks: adset.clicks,
			ctr: adset.ctr,
			actions: adset.actions,
			income: adset.income,
			currency: adset.currency,
			dates: {
				start: adset.start,
				end: adset.end,
			},
			status: adset.status,
			adsetReady: adset.adset_ready,
			ready: adset.ready,
			restore: adset.restore,
			blocked: {
				at: adset.blocked_at,
				until: adset.blocked_until,
				reason: adset.blocked_reason,
			},
		}
	}

	return {
		active: response.active.map(adapter),
		inactive: response.inactive.map(adapter),
		future: response.future.map(adapter),
		unavailable: response.unavailable.map(adapter),
	}
}
