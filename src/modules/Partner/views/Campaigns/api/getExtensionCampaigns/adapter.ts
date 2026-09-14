import { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IExtensionCampaign, IExtensionCampaignResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IExtensionCampaignResponse[]>): IPaginatedData<IExtensionCampaign[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(campaign => ({
			id: campaign.id,
			slug: campaign.slug,
			type: CampaignType.EXTENSION,
			typeEdit: campaign.type_edit,
			title: {
				default: campaign.title,
				alternative: campaign.title_alternative,
			},
			affiliateNetwork: campaign.affiliate_network,
			description: campaign.description,
			category: {
				...campaign.category,
				darkMarket: campaign.category.is_dark_market,
			},
			holding: {
				...campaign.holding,
			},
			advertiser: {
				...campaign.advertiser,
				wallet: {
					...campaign.advertiser.wallet,
					currency: {
						code: campaign.advertiser.wallet.currency.code,
						enTitle: campaign.advertiser.wallet.currency.en_title,
						ruTitle: campaign.advertiser.wallet.currency.ru_title,
						flag: campaign.advertiser.wallet.currency.flag,
						visible: campaign.advertiser.wallet.currency.visible,
						ptTitle: campaign.advertiser.wallet.currency.pt_title,
						esTitle: campaign.advertiser.wallet.currency.es_title,
					},
				},
			},
			dates: {
				start: campaign.start,
				end: campaign.end,
			},
			timeZone: campaign.time_zone,
			impressions: {
				current: campaign.impressions,
				total: campaign.total_impressions,
			},
			budget: {
				current: campaign.budget,
				total: campaign.total_budget,
			},
			avgCpm: campaign.avg_cpm,
			channels: campaign.channels,
			clicks: campaign.clicks,
			ctr: campaign.ctr,
			reach: campaign.reach,
			published: campaign.published,
			visible: campaign.visible,
			productUrlParams: campaign.product_url_additional_params,
			closed: campaign.closed,
		})),
	}
}
