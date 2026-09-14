import type {
	IUpdateSpecialProjectCreativeData,
	IUpdateSpecialProjectCreativePayload,
} from './types'

export const dataToPayload = (data: IUpdateSpecialProjectCreativeData): IUpdateSpecialProjectCreativePayload => {
	return {
		slug: data.slug,
		title: data.title.default,
		companion_cta: 'done',
		companion_heading: 'done',
		companion_text: 'done',
		product_url: data.productUrl.general,
		mobile_product_url: data.productUrl.mobile,
		chatbot_text: data.chatbotText ?? null,
		pixel_clicks: data.pixelClicks.filter(val => val !== ''),
		pixel_impressions: data.pixelImpressions.filter(val => val !== ''),
		pixel_inspections: data.pixelInspections.filter(val => val !== ''),
		pixel_clicks_scripts: data.pixelClicksScripts ?? '',
		qr_code: data.qrCode,
		script_code: data.scriptCode,
		...(data.unit.indexOf('tmp/') !== -1 ? { unit: data.unit } : {}),
		...(data.zip.indexOf('tmp/') !== -1 ? { zip: data.zip } : {}),
		...(data.video.indexOf('tmp/') !== -1 ? { video: data.video } : {}),
	}
}
