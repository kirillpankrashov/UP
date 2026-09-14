import { CampaignType } from '@/core/types'

import type {
	ISpecialProjectCreative,
	ISpecialProjectCreativeResponse,
} from './types'

export const responseToData = (response: ISpecialProjectCreativeResponse): ISpecialProjectCreative => {
	return {
		id: response.id,
		adset: {
			id: response.ad_set.id,
			campaign: {
				id: response.ad_set.campaign.id,
				slug: response.ad_set.campaign.slug,
				type: CampaignType.SPECIAL_PROJECT,
				title: response.ad_set.campaign.title,
				description: response.ad_set.campaign.description,
				category: response.ad_set.campaign.category,
				holding: response.ad_set.campaign.holding,
				advertiser: {
					...response.ad_set.campaign.advertiser,
					wallet: {
						...response.ad_set.campaign.advertiser.wallet,
						currency: {
							...response.ad_set.campaign.advertiser.wallet.currency,
							enTitle: response.ad_set.campaign.advertiser.wallet.currency.en_title,
							ruTitle: response.ad_set.campaign.advertiser.wallet.currency.ru_title,
							ptTitle: response.ad_set.campaign.advertiser.wallet.currency.pt_title,
							esTitle: response.ad_set.campaign.advertiser.wallet.currency.es_title,
						},
					},
				},
				visible: response.ad_set.campaign.visible,
			},
			slug: response.ad_set.slug,
			format: response.ad_set.format,
			title: response.ad_set.title,
			created: response.ad_set.created,
			published: response.ad_set.published,
			visible: response.ad_set.visible,
		},
		slug: response.slug,
		title: response.title,
		titleAlternative: response.title_alternative,
		description: response.description,
		attachments: response.attachments,
		productUrl: {
			general: response.product_url,
			mobile: response.mobile_product_url,
		},
		chatbotText: response.chatbot_text,
		companion: {
			heading: response.companion_heading,
			text: response.companion_text,
			cta: response.companion_cta,
		},
		qrCode: response.qr_code,
		scriptCode: response.script_code,
		pixelClicks: response.pixel_clicks,
		pixelClicksScripts: response.pixel_clicks_scripts,
		pixelImpressions: response.pixel_impressions,
		pixelInspections: response.pixel_inspections,
		pixelQuertels25: response.pixel_quertels_25,
		pixelQuertels50: response.pixel_quertels_50,
		pixelQuertels75: response.pixel_quertels_75,
		productUrlAdditionalParams: response.product_url_additional_params,
		legalCompliance: response.legal_compliance,
		published: response.published,
		visible: response.visible,
	}
}
