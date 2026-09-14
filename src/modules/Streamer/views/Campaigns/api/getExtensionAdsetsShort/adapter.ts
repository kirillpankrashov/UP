import { CampaignType } from '@/core/types'

import type { IExtensionAdsetShort, IExtensionAdsetShortResponse, IExtensionAdsetsShort, IExtensionAdsetsShortResponse } from './types'

export const responseToData = (response: IExtensionAdsetsShortResponse): IExtensionAdsetsShort => {
	const adapter = (adset: IExtensionAdsetShortResponse): IExtensionAdsetShort => {
		return {
			campaignType: CampaignType.EXTENSION,
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
