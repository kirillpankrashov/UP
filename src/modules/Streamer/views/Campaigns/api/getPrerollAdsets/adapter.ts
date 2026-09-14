import { CampaignType } from '@/core/types'

import type { IPrerollAdset, IPrerollAdsetResponse, IPrerollAdsets, IPrerollAdsetsResponse } from './types'

export const responseToData = (response: IPrerollAdsetsResponse): IPrerollAdsets => {
	const adapter = (adset: IPrerollAdsetResponse): IPrerollAdset => {
		return {
			campaignType: CampaignType.PREROLL,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
			platform: adset.platform,
			description: adset.description,
			logo: adset.logo,
			payableType: adset.payable_type,
			impressions: {
				campaign: adset.campaign_impressions,
				creator: adset.impressions,
			},
			creatorAvgViews: adset.creator_avg_views,
			earningsLimit: adset.earnings_limit,
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
		}
	}

	return response.map(adapter)
}
