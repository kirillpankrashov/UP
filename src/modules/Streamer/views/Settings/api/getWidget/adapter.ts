import type { TWidgetSettings, TWidgetSettingsResponse } from '../types'

export const responseToData = (response: TWidgetSettingsResponse): TWidgetSettings => {
	return {
		url: response.url,
		obsDockSlug: response.slug_obs_dock,
		obsDockUrl: `${location.origin}/obs-dock/${response.slug_obs_dock}`,
		obsWebSocket: {
			pass: response.obs_socket_pass,
			port: response.obs_socket_port,
		},
		slug: response.slug,
		platform: response.platform,
		boxSize: response.box_size,
		referralPromotion: response.referral_promotion,
		stream: {
			delay: response.stream_delay,
			enabled: response.stream_active,
		},
		advertising: {
			mode: response.advertising_mode,
			frequency: response.advertising_frequency,
			position: response.advertising_position,
		},
		adManualEnabled: response.ad_manual_enable,
		ignoreCategories: response.ignore_categories,
		enabled: response.widget_active,
		botEnabled: response.bot_active,
		extensionEnabled: response.extension_active,
		brandisExtensionEnabled: response.brandis_extension_active,
		nightbot: {
			twitch: {
				connected: response.nightbot_twitch_connected,
				moderator: response.nightbot_twitch_moderator,
			},
			youtube: {
				connected: response.nightbot_youtube_connected,
				moderator: response.nightbot_youtube_moderator,
			},
			trovo: {
				connected: response.nightbot_trovo_connected,
				moderator: response.nightbot_trovo_moderator,
			},
			vkplay: {
				connected: response.nightbot_vkplay_connected,
				moderator: response.nightbot_vkplay_moderator,
			},
			tiktok: {
				connected: response.nightbot_tiktok_connected,
				moderator: response.nightbot_tiktok_moderator,
			},
		},
		relogin: response.relogin,
		version: response.version,
		ssp: {
			allowAdult: response.allow_adult_content,
			text: {
				frequency: response.ssp_text_frequency,
			},
		},
	}
}
