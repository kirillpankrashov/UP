import { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IBrandAwarenessCreative, IBrandAwarenessCreativeResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IBrandAwarenessCreativeResponse[]>): IPaginatedData<IBrandAwarenessCreative[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(ad => ({
			id: ad.id,
			slug: ad.slug,
			adSet: {
				id: ad.ad_set.id,
				slug: ad.ad_set.slug,
				title: ad.ad_set.title,
				description: ad.ad_set.description,
				platform: ad.ad_set.platform,
				format: ad.ad_set.format,
				campaign: {
					id: ad.ad_set.campaign.id,
					slug: ad.ad_set.campaign.slug,
					type: CampaignType.BRAND_AWARENESS,
					title: {
						default: ad.ad_set.campaign.title,
					},
					description: ad.ad_set.campaign.description,
					category: {
						...ad.ad_set.campaign.category,
						darkMarket: ad.ad_set.campaign.category.is_dark_market,
					},
					holding: {
						...ad.ad_set.campaign.holding,
					},
					advertiser: {
						...ad.ad_set.campaign.advertiser,
						wallet: {
							...ad.ad_set.campaign.advertiser.wallet,
							currency: {
								code: ad.ad_set.campaign.advertiser.wallet.currency.code,
								enTitle: ad.ad_set.campaign.advertiser.wallet.currency.en_title,
								ruTitle: ad.ad_set.campaign.advertiser.wallet.currency.ru_title,
								flag: ad.ad_set.campaign.advertiser.wallet.currency.flag,
								visible: ad.ad_set.campaign.advertiser.wallet.currency.visible,
								ptTitle: ad.ad_set.campaign.advertiser.wallet.currency.pt_title,
								esTitle: ad.ad_set.campaign.advertiser.wallet.currency.es_title,
							},
						},
					},
					visible: ad.ad_set.campaign.visible,
				},
				dates: {
					start: ad.ad_set.start,
					end: ad.ad_set.end,
				},
				avgCpm: ad.ad_set.avg_cpm,
				channels: ad.ad_set.channels,
				clicks: ad.ad_set.clicks,
				ctr: ad.ad_set.ctr,
				reach: ad.ad_set.reach,
				spent: ad.ad_set.spent,
				impressions: {
					current: ad.ad_set.impressions,
					total: ad.ad_set.total_impressions,
				},
				budget: ad.ad_set.budget,
				published: ad.ad_set.published,
				visible: ad.ad_set.visible,
			},
			description: ad.description,
			title: {
				default: ad.title,
				alternative: ad.title_alternative,
			},
			impressions: {
				current: ad.impressions,
				total: ad.total_impressions,
			},
			avgCpm: ad.avg_cpm,
			channels: ad.channels,
			clicks: ad.clicks,
			ctr: ad.ctr,
			reach: ad.reach,
			spent: ad.spent,
			published: ad.published,
			visible: ad.visible,
		})),
	}
}
