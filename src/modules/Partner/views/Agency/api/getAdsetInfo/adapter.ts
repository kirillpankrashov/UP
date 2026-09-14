import type { IAdsetInfo, IAdsetInfoResponse } from './types'

export const responseToData = (response: IAdsetInfoResponse): IAdsetInfo => ({
	slug: response.slug,
	campaignType: response.campaign.type,
	platform: response.platform,
	title: response.title,
	dates: {
		start: response.start,
		end: response.end,
	},
	bidCap: response.bid_cap,
	currency: response.currency,
	frequency: response.frequency,
	format: response.format,
	description: response.description,
	ads: response.ads.map(ad => ({
		id: ad.id,
		slug: ad.slug,
		title: ad.title,
		attachments: ad.attachments,
		productUrl: ad.product_url,
		chatbotText: ad.chatbot_text,
	})),
	campaign: {
		id: response.campaign.id,
		slug: response.campaign.slug,
		type: response.campaign.type,
		title: response.campaign.title,
		description: response.campaign.description,
		category: response.campaign.category,
		visible: response.campaign.visible,
	},
	dailyActionLimit: {
		enabled: response.daily_action_limit.enabled,
		actionPrice: response.daily_action_limit.action_price,
	},
	cpaPayoutType: response.cpa_payout_type,
	payoutType: response.payout_type,
})
