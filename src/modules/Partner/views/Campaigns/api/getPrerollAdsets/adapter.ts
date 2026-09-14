import { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IPrerollAdset, IPrerollAdsetResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IPrerollAdsetResponse[]>): IPaginatedData<IPrerollAdset[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(adset => ({
			id: adset.id,
			slug: adset.slug,
			platform: adset.platform,
			format: adset.format,
			campaign: {
				id: adset.campaign.id,
				slug: adset.campaign.slug,
				type: CampaignType.PREROLL,
				title: {
					default: adset.campaign.title,
				},
				description: adset.campaign.description,
				category: {
					...adset.campaign.category,
					darkMarket: adset.campaign.category.is_dark_market,
				},
				holding: {
					...adset.campaign.holding,
				},
				advertiser: {
					...adset.campaign.advertiser,
					wallet: {
						...adset.campaign.advertiser.wallet,
						currency: {
							code: adset.campaign.advertiser.wallet.currency.code,
							enTitle: adset.campaign.advertiser.wallet.currency.en_title,
							ruTitle: adset.campaign.advertiser.wallet.currency.ru_title,
							flag: adset.campaign.advertiser.wallet.currency.flag,
							visible: adset.campaign.advertiser.wallet.currency.visible,
							ptTitle: adset.campaign.advertiser.wallet.currency.pt_title,
							esTitle: adset.campaign.advertiser.wallet.currency.es_title,
						},
					},
				},
				visible: adset.campaign.visible,
			},
			description: adset.description,
			title: {
				default: adset.title,
			},
			dates: {
				start: adset.start,
				end: adset.end,
			},
			impressions: {
				current: adset.impressions,
				total: adset.total_impressions,
			},
			budget: {
				current: adset.budget,
				total: adset.total_budget,
			},
			avgCpm: adset.avg_cpm,
			channels: adset.channels,
			clicks: adset.clicks,
			ctr: adset.ctr,
			payableType: adset.payable_type,
			bidCap: adset.bid_cap,
			bidCpa: adset.bid_cpa,
			published: adset.published,
			visible: adset.visible,
		})),
	}
}
