import { CampaignType } from '@/core/types'

import type { IPrerollAdsetInfo, IPrerollAdsetInfoResponse } from './types'

export const responseToData = (adset: IPrerollAdsetInfoResponse): IPrerollAdsetInfo => {
	return {
		campaignType: CampaignType.PREROLL,
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
			visible: adset.campaign.visible,
		},
		attachments: adset.attachments,
		productUrl: adset.product_url,
		status: adset.status,
		ssp: {
			bidFloor: adset.ssp_bid_floor,
			commission: adset.ssp_commission,
		},
		videoDescriptionText: adset.video_description_text,
		vod: adset.vod,
	}
}
