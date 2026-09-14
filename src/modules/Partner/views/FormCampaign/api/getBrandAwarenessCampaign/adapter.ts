import { CampaignType } from '@/core/types'
import type { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

import type {
	IBrandAwarenessCampaign,
	IBrandAwarenessCampaignResponse,
} from './types'

export const responseToData = (response: IBrandAwarenessCampaignResponse): IBrandAwarenessCampaign => {
	return {
		id: response.id,
		slug: response.slug,
		campaignType: CampaignType.BRAND_AWARENESS,
		typeEdit: response.type_edit,
		title: {
			default: response.title,
			alternative: response.title_alternative,
		},
		description: response.description,
		affiliateNetwork: response.affiliate_network?.id || null,
		category: {
			...response.category,
			darkMarket: response.category.is_dark_market,
		},
		holding: response.holding,
		advertiser: {
			...response.advertiser,
			wallet: {
				...response.advertiser.wallet,
				currency: {
					...response.advertiser.wallet.currency,
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
		dates: {
			start: response.start,
			end: response.end,
		},
		timeZone: response.time_zone,
		impressions: {
			current: response.impressions,
			total: response.total_impressions,
		},
		budget: {
			current: response.budget,
			total: response.total_budget,
		},
		avgCpm: response.avg_cpm,
		channels: response.channels,
		clicks: response.clicks,
		ctr: response.ctr,
		evr: response.evr,
		reach: response.reach,
		published: response.published,
		visible: response.visible,
		productUrlParams: Object.entries(response.product_url_additional_params).map(([key, value]) => ({
			key,
			param: value as CampaignUrlParams,
			name: key,
		})),
		closed: response.closed,
		mediaAgency: response.media_agency,
		ordMarkup: response.ord_markup,
	}
}
