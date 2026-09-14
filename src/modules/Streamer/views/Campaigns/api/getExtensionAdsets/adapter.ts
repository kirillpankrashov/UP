import { CampaignType } from '@/core/types'

import type { IExtensionAdset, IExtensionAdsetResponse, IExtensionAdsets, IExtensionAdsetsResponse } from './types'

export const responseToData = (response: IExtensionAdsetsResponse): IExtensionAdsets => {
	const adapter = (adset: IExtensionAdsetResponse): IExtensionAdset => {
		return {
			campaignType: CampaignType.EXTENSION,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
			platform: adset.platform,
			description: adset.description,
			logo: adset.logo,
			impressions: adset.impressions,
			clicks: adset.clicks,
			actions: adset.actions,
			income: adset.income,
			currency: adset.currency,
			ctr: adset.ctr,
			dates: {
				start: adset.start,
				end: adset.end,
			},
			status: adset.status,
			restore: adset.restore,
			blocked: {
				at: adset.blocked_at,
				until: adset.blocked_until,
				reason: adset.blocked_reason,
			},
			adsetReady: adset.adset_ready,
			ready: adset.ready,
		}
	}

	return {
		active: response.active.map(adapter),
		inactive: response.inactive.map(adapter),
		future: response.future.map(adapter),
		unavailable: response.unavailable.map(adapter),
	}
}
