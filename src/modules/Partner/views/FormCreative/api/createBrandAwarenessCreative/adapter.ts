import type {
	ICreateBrandAwarenessCreativeData,
	ICreateBrandAwarenessCreativePayload,
} from './types'

export const dataToPayload = (data: ICreateBrandAwarenessCreativeData): ICreateBrandAwarenessCreativePayload => {
	return {
		slug: data.adsetSlug,
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
		video: data.video,
		unit: data.unit,
		zip: data.zip,
	}
}