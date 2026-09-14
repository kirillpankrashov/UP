import { CampaignType } from '@/core/types'

import type { IPerformanceAdsetShort, IPerformanceAdsetShortResponse, IPerformanceAdsetsShort, IPerformanceAdsetsShortResponse } from './types'

export const responseToData = (response: IPerformanceAdsetsShortResponse): IPerformanceAdsetsShort => {
	const adapter = (adset: IPerformanceAdsetShortResponse): IPerformanceAdsetShort => {
		return {
			campaignType: CampaignType.PERFORMANCE,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
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
