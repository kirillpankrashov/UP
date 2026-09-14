import { CampaignType } from '@/core/types'

import type { IBrandAwarenessAdsetShort, IBrandAwarenessAdsetShortResponse, IBrandAwarenessAdsetsShort, IBrandAwarenessAdsetsShortResponse } from './types'

export const responseToData = (response: IBrandAwarenessAdsetsShortResponse): IBrandAwarenessAdsetsShort => {
	const adapter = (adset: IBrandAwarenessAdsetShortResponse): IBrandAwarenessAdsetShort => {
		return {
			campaignType: CampaignType.BRAND_AWARENESS,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format.id,
			platform: adset.platform,
			logo: adset.logo,
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
