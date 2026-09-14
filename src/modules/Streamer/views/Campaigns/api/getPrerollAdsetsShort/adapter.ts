import { CampaignType } from '@/core/types'

import type { IPrerollAdsetShort, IPrerollAdsetShortResponse, IPrerollAdsetsShort, IPrerollAdsetsShortResponse } from './types'

export const responseToData = (response: IPrerollAdsetsShortResponse): IPrerollAdsetsShort => {
	const adapter = (adset: IPrerollAdsetShortResponse): IPrerollAdsetShort => {
		return {
			campaignType: CampaignType.PREROLL,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
			platform: adset.platform,
			logo: adset.logo,
			status: adset.status,
		}
	}

	return response.map(adapter)
}
