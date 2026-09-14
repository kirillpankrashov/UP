import { CampaignType } from '@/core/types'

import type { IPerformanceAdsetInfo, IPerformanceAdsetInfoResponse } from './types'

export const responseToData = (adset: IPerformanceAdsetInfoResponse): IPerformanceAdsetInfo => {
	return {
		campaignType: CampaignType.PERFORMANCE,
		slug: adset.slug,
		platform: adset.platform,
		title: adset.title,
		income: {
			current: adset.income,
			estimate: adset.estimate_income,
		},
		impressions: adset.impressions,
		clicks: adset.clicks,
		actions: adset.actions,
		creatorPayout: {
			value: adset.creator_payout,
			currency: adset.creator_payout_currency,
		},
		ctr: {
			current: adset.ctr,
			global: adset.global_target_ctr,
			target: adset.target_ctr,
		},
		dates: {
			start: adset.start,
			end: adset.end,
		},
		payoutType: adset.payout_type,
		payableType: adset.payable_type,
		bidCap: adset.bid_cap,
		bidCpa: adset.bid_cpa,
		currency: adset.currency,
		format: adset.format,
		description: adset.description,
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
		attachments: adset.attachments,
		productUrl: adset.product_url,
		chatbotText: adset.chatbot_text,
		status: adset.status,
		ssp: {
			bidFloor: adset.ssp_bid_floor,
			commission: adset.ssp_commission,
		},
	}
}
