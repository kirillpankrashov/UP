import type { ICampaignStatisticsResponse } from './types'
import type { ICampaignStatistics } from './types'

export const responseToData = (response: ICampaignStatisticsResponse): ICampaignStatistics => {
	return {
		title: response.title,
		status: response.status,
		updatedAt: response.updatedAt,
		dates: {
			start: response.start,
			end: response.end,
		},
		impressions: {
			current: response.impressions,
			limit: response.impressions_limit,
		},
		spent: {
			current: response.spent,
			limit: response.spent_limit,
		},
		ctr: response.ctr,
		clicksTotal: response.clicks_total,
		fills: response.fills,
		reach: response.reach,
		channels: response.channels,
		categories: response.categories,
		avgCpm: response.avg_cpm,
		advertiser: {
			...response.advertiser,
			wallet: {
				...response.advertiser.wallet,
				currency: {
					code: response.advertiser.wallet.currency.code,
					enTitle: response.advertiser.wallet.currency.en_title,
					ruTitle: response.advertiser.wallet.currency.ru_title,
					flag: response.advertiser.wallet.currency.flag,
					visible: response.advertiser.wallet.currency.visible,
					ptTitle: response.advertiser.wallet.currency.pt_title,
					esTitle: response.advertiser.wallet.currency.es_title,
				},
			},
		},
		data: response.data,
		creatives: response.creatives.map(creative => ({
			adsetName: creative.group_name,
			creativeName: creative.creative_name,
			format: creative.format,
			impressions: creative.impressions,
			reach: creative.reach,
			clicks: creative.clicks,
			ctr: creative.ctr,
			spent: creative.spent,
		})),
		topChannels: response.top_channels,
		topCategories: response.top_categories,
	}
}
