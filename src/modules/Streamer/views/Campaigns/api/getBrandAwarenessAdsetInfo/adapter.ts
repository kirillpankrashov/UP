import { CampaignType } from '@/core/types'

import type { IBrandAwarenessAdsetInfo, IBrandAwarenessAdsetInfoResponse } from './types'

export const responseToData = (adset: IBrandAwarenessAdsetInfoResponse): IBrandAwarenessAdsetInfo => {
	return {
		campaignType: CampaignType.BRAND_AWARENESS,
		slug: adset.slug,
		platform: adset.platform,
		title: adset.title,
		income: {
			current: adset.income,
			estimate: adset.estimate_income,
		},
		ctr: {
			current: adset.ctr,
			target: adset.target_ctr,
			global: adset.global_target_ctr,
		},
		impressions: {
			total: adset.total_impressions,
			limit: adset.impressions_limit,
		},
		clicks: adset.clicks,
		dates: {
			start: adset.start,
			end: adset.end,
		},
		time: {
			start: adset.start_time,
			end: adset.finish_time,
		},
		creatorPayout: {
			price: adset.creator_payout,
			currency: adset.creator_payout_currency,
		},
		payoutType: adset.payout_type,
		bidCap: adset.bid_cap,
		currency: adset.currency,
		frequency: adset.frequency,
		format: adset.format,
		description: adset.description,
		ads: adset.ads.map(ad => ({
			id: ad.id,
			slug: ad.slug,
			title: ad.title,
			attachments: ad.attachments,
			productUrl: ad.product_url,
			chatbotText: ad.chatbot_text,
		})),
		campaign: {
			id: adset.campaign.id,
			slug: adset.campaign.slug,
			type: adset.campaign.type,
			title: adset.campaign.title,
			description: adset.campaign.description,
			category: adset.campaign.category,
			holding: adset.campaign.holding,
			advertiser: {
				id: adset.campaign.advertiser.id,
				title: adset.campaign.advertiser.title,
				description: adset.campaign.advertiser.description,
				wallet: {
					balance: adset.campaign.advertiser.wallet.balance,
					currency: {
						code: adset.campaign.advertiser.wallet.currency.code,
						enTitle: adset.campaign.advertiser.wallet.currency.en_title,
						ruTitle: adset.campaign.advertiser.wallet.currency.ru_title,
						flag: adset.campaign.advertiser.wallet.currency.flag,
						visible: adset.campaign.advertiser.wallet.currency.visible,
						ptTitle: adset.campaign.advertiser.wallet.currency.pt_title,
						esTitle: adset.campaign.advertiser.wallet.currency.es_title,
					},
					icon: adset.campaign.advertiser.wallet.icon,
				},
				holding: adset.campaign.advertiser.holding,
			},
			visible: adset.campaign.visible,
		},
		dailyActionLimit: {
			enabled: adset.daily_action_limit.enabled,
			actionPrice: adset.daily_action_limit.action_price,
			current: adset.daily_action_limit.current,
			totalEarned: adset.daily_action_limit.total_earned,
		},
		status: adset.status,
		evr: {
			list: adset.evr,
			global: adset.global_target_evr,
			target: adset.target_evr,
		},
		medianCpm: adset.median_cpm,
		ssp: {
			bidFloor: adset.ssp_bid_floor,
			commission: adset.ssp_commission,
		},
		strategyPayment: adset.strategy_payment,
		streamerDayLimit: adset.streamer_day_limit,
		streamerDayLimitShown: adset.streamer_day_limit_shown,
	}
}
