import type { ISpCreative, ISpCreativeResponse, ISpStreamInfo } from './types'

export function responseToSpCreative (response: ISpCreativeResponse, stream: ISpStreamInfo): ISpCreative {
	return {
		id: response.id,
		slug: response.slug,
		impressionSlug: response.impression_slug ?? null,
		viewersCount: response.viewers_count,
		qr: {
			code: response.qr_code,
			link: response.qr_link,
		},
		pixels: {
			impressions: response.pixel_impressions,
		},
		adSet: {
			id: response.ad_set.id,
			slug: response.ad_set.slug,
			format: response.ad_set.format,
			frequency: response.ad_set.frequency,
			duration: response.ad_set.duration,
			campaign: {
				id: response.ad_set.campaign.id,
				slug: response.ad_set.campaign.slug,
				type: response.ad_set.campaign.type,
				ordMarkup: response.ad_set.campaign.ord_markup || '',
			},
			advertiser: {
				legalName: response.ad_set.advertiser?.legal_name ?? null,
				tin: response.ad_set.advertiser?.tin ?? null,
			},
		},
		attachments: response.attachments,
		stream,
	}
}
