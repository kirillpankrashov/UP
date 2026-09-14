
import type {
	IUpdatePrerollCampaignData,
	IUpdatePrerollCampaignPayload,
} from './types'

export const dataToPayload = (data: IUpdatePrerollCampaignData): IUpdatePrerollCampaignPayload => {
	return {
		slug: data.slug,
		title: data.title,
		description: data.description,
		category: data.category === undefined ? null : data.category,
		affiliate_network: data.affiliateNetwork === -1 || data.affiliateNetwork === undefined ? null : data.affiliateNetwork,
		holding: data.holding === undefined ? null : data.holding,
		start: data.start || null,
		end: data.end || null,
		advertiser: data.advertiser === undefined ? null : data.advertiser,
		product_url_additional_params: data.productUrlParams.reduce((acc, item) => {
			if (item.name && item.param) {
				acc[item.name] = item.param
			}
			return acc
		}, {} as Record<string, string>),
		media_agency: data.mediaAgency === undefined ? null : data.mediaAgency,
		ord_markup: data.ordMarkup,
	}
}
