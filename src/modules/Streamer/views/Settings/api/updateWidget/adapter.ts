import type { TWidgetSettings, TWidgetSettingsResponse } from '../index'

export type TWidgetPayload = Pick<TWidgetSettingsResponse,
	'slug'
	| 'url'
	| 'ad_manual_enable'
	| 'advertising_mode'
	| 'advertising_frequency'
	| 'advertising_position'
	| 'ignore_categories'
	| 'stream_delay'
	| 'extension_active'
	| 'bot_active'
	| 'box_size'
	| 'slug_obs_dock'
	| 'platform'
	| 'referral_promotion'
	| 'brandis_extension_active'
	| 'ssp_text_frequency'
	| 'allow_adult_content'
	| 'obs_socket_pass'
	| 'obs_socket_port'
>

export const modelToPayload = (response: TWidgetSettings): TWidgetPayload => {
	return {
		slug: response.slug,
		url: response.url,
		ad_manual_enable: response.adManualEnabled,
		advertising_mode: response.advertising.mode,
		advertising_frequency: response.advertising.frequency,
		advertising_position: response.advertising.position,
		ignore_categories: response.ignoreCategories,
		stream_delay: response.stream.delay,
		extension_active: response.extensionEnabled,
		bot_active: response.botEnabled,
		box_size: response.boxSize,
		slug_obs_dock: response.obsDockSlug,
		platform: response.platform,
		referral_promotion: response.referralPromotion,
		brandis_extension_active: response.brandisExtensionEnabled,
		ssp_text_frequency: response.ssp.text.frequency,
		allow_adult_content: response.ssp.allowAdult,
		obs_socket_pass: response.obsWebSocket.pass,
		obs_socket_port: response.obsWebSocket.port,
	}
}
