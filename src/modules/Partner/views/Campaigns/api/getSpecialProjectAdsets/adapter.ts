import { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { ISpecialProjectAdset, ISpecialProjectAdsetResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<ISpecialProjectAdsetResponse[]>): IPaginatedData<ISpecialProjectAdset[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(adset => ({
			id: adset.id,
			slug: adset.slug,
			format: adset.format,
			platform: adset.platform,
			campaign: {
				id: adset.campaign.id,
				slug: adset.campaign.slug,
				type: CampaignType.SPECIAL_PROJECT,
				title: {
					default: adset.campaign.title,
				},
				description: adset.campaign.description,
				category: {
					...adset.campaign.category,
					darkMarket: adset.campaign.category.is_dark_market,
				},
				visible: adset.campaign.visible,
			},
			currency: {
				code: adset.currency.code,
				enTitle: adset.currency.en_title,
				ruTitle: adset.currency.ru_title,
				flag: adset.currency.flag,
				visible: adset.currency.visible,
				ptTitle: adset.currency.pt_title,
				esTitle: adset.currency.es_title,
			},
			description: adset.description,
			title: {
				default: adset.title,
				alternative: adset.title_alternative,
			},
			dates: {
				start: adset.start,
				end: adset.end,
			},
			bidCap: adset.bid_cap,
			published: adset.published,
			visible: adset.visible,
		})),
	}
}
