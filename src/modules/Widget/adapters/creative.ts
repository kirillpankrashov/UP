import { uniqueId } from 'lodash'

import type {
	ICreative,
	ICreativeResponse,
	IDemoCreative,
	IDemoCreativeResponse,
	IPromoCreative,
	IPromoCreativeResponse,
	IRealDemoCreativeResponse,
	IStreamInfo,
} from '@/modules/Widget/types'

import { AdFrequencyMap } from '../constants/ad-frequency-map'

export function responseToCreativeAdapter (response: ICreativeResponse, stream: IStreamInfo): ICreative {
	return {
		id: response.id,
		uuid: uniqueId('uiid_'),
		slug: response.slug,
		impressionSlug: response.impression_slug || null,
		viewersCount: response.viewers_count,
		qr: {
			code: response.qr_code,
			link: response.qr_link,
		},
		companion: {
			cta: response.companion_cta,
			heading: response.companion_heading,
			text: response.companion_text,
		},
		pixels: {
			clicks: response.pixel_clicks,
			impressions: response.pixel_impressions,
		},
		adSet: {
			id: response.ad_set.id,
			slug: response.ad_set.slug,
			format: response.ad_set.format,
			frequency: AdFrequencyMap[response.ad_set.frequency],
			campaign: {
				id: response.ad_set.campaign.id,
				slug: response.ad_set.campaign.slug,
				type: response.ad_set.campaign.type,
				ordMarkup: response.ad_set.campaign.ord_markup || '',
			},
			makeScreenshots: response.ad_set.make_screenshots,
			advertiser: {
				legalName: response.ad_set?.advertiser?.legal_name,
				tin: response.ad_set?.advertiser?.tin,
			},
		},
		attachments: response.attachments,
		stream,
	}
}

export function responseDemoToCreativeAdapter (response: IDemoCreativeResponse | IRealDemoCreativeResponse | IPromoCreativeResponse): IDemoCreative | IPromoCreative {
	const format = 'format_code' in response.ad_set ? response.ad_set.format_code : response.ad_set.format
	const campaignType = 'campaign' in response ? response.campaign.type_code : response.ad_set.campaign.type

	return {
		id: parseInt(uniqueId()),
		uuid: uniqueId('uiid_'),
		slug: 'Demo',
		viewersCount: 0,
		impressionSlug: null,
		qr: {
			code: response.qr_code,
			link: response.qr_link,
		},
		companion: {
			cta: ('companion_cta' in response) ? response.companion_cta : '',
			heading: ('companion_heading' in response) ? response.companion_heading : '',
			text: ('companion_text' in response) ? response.companion_text : '',
		},
		pixels: {
			clicks: [],
			impressions: [],
			inspections: [],
		},
		adSet: {
			format,
			campaign: {
				type: campaignType,
				ordMarkup: response.ad_set.campaign?.ord_markup || '',
			},
			advertiser: {
				legalName: response.ad_set?.advertiser?.legal_name,
				tin: response.ad_set?.advertiser?.tin,
			},
			makeScreenshots: response.ad_set.make_screenshots,
		},
		attachments: response.attachments,
	}
}
