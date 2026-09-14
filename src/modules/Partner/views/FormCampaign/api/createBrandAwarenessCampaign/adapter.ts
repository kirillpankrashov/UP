import type {
	ICreateBrandAwarenessCampaignData,
	ICreateBrandAwarenessCampaignPayload,
} from './types'

export const dataToPayload = (data: ICreateBrandAwarenessCampaignData): ICreateBrandAwarenessCampaignPayload => {
	return {
		title: data.title,
		description: data.description,
		category: data.category === undefined ? null : data.category,
		affiliate_network: data.affiliateNetwork === -1 || data.affiliateNetwork === undefined ? null : data.affiliateNetwork,
		holding: data.holding === undefined ? null : data.holding,
		advertiser: data.advertiser === undefined ? null : data.advertiser,
		end: data.end || null,
		start: data.start || null,
		time_zone: data.timezone === undefined ? null : data.timezone,
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
