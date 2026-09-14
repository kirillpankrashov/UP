import { CampaignType } from '@/core/types'

import type { ISpecialProjectAdsetInfo, ISpecialProjectAdsetInfoResponse } from './types'

export const responseToData = (adset: ISpecialProjectAdsetInfoResponse): ISpecialProjectAdsetInfo => {
	return {
		campaignType: CampaignType.SPECIAL_PROJECT,
		slug: adset.slug,
		title: adset.title,
		description: adset.description,
		platform: adset.platform,
		format: adset.format,
		impressions: adset.impressions,
		clicks: adset.clicks,
		dates: {
			start: adset.start,
			end: adset.end,
		},
		strategyPayment: adset.strategy_payment,
		payoutType: adset.payout_type,
		currency: adset.currency,
		frequency: adset.frequency,
		duration: adset.duration,
		widgetUrl: adset.widget_url,
		ads: adset.ads.map(ad => ({
			id: ad.id,
			slug: ad.slug,
			title: ad.title,
			attachments: ad.attachments,
			productUrl: ad.product_url,
			chatbotText: ad.chatbot_text,
		})),
		status: adset.status,
	}
}
