import { CampaignType } from '@/core/types'

import type { ISpecialProjectAdset, ISpecialProjectAdsetResponse, ISpecialProjectAdsets, ISpecialProjectAdsetsResponse } from './types'

export const responseToData = (response: ISpecialProjectAdsetsResponse): ISpecialProjectAdsets => {
	const adapter = (adset: ISpecialProjectAdsetResponse): ISpecialProjectAdset => {
		return {
			campaignType: CampaignType.SPECIAL_PROJECT,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			description: adset.description,
			platform: adset.platform,
			format: adset.format,
			logo: adset.logo,
			dates: {
				start: adset.start,
				end: adset.end,
			},
			impressions: adset.impressions,
			strategyPayment: adset.strategy_payment,
			payoutType: adset.payout_type,
			currency: adset.currency,
			restore: adset.restore,
			status: adset.status,
		}
	}

	return {
		active: response.active.map(adapter),
		inactive: response.inactive.map(adapter),
		future: response.future.map(adapter),
		unavailable: response.unavailable.map(adapter),
	}
}
