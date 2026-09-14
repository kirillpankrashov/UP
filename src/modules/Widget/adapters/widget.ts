import { removeEmptyProps } from '@/core/helpers'
import type {
	IWidget,
	IWidgetResponse,
	IWidgetSettings,
	IWidgetSettingsResponse,
	IWidgetSettingsUpdateResponse,
} from '@/modules/Widget/types'

export function widgetSettingToPayloadAdapter (dto: IWidgetSettingsResponse): IWidgetSettingsUpdateResponse {
	const data = {
		platform: dto.platform,
		advertising_mode: dto.advertising_mode,
		advertising_frequency: dto.advertising_frequency,
		advertising_position: dto.advertising_position,
		leaderboard_position: dto.leaderboard_position,
		ignore_categories: dto.ignore_categories,
		box_size: dto.box_size,
	}

	removeEmptyProps(data)

	return data
}

export function responseToWidgetSettingsAdapter (dto: IWidgetSettingsResponse): IWidgetSettings {
	return {
		url: dto.url,
		obsDockSlug: dto.slug_obs_dock,
		slug: dto.slug,
		platform: dto.platform,
		boxSize: dto.box_size,
		referralPromotion: dto.referral_promotion,
		stream: {
			delay: dto.stream_delay,
			enabled: dto.stream_active,
		},
		advertising: {
			mode: dto.advertising_mode,
			frequency: dto.advertising_frequency,
			position: dto.advertising_position,
		},
		leaderboard: {
			position: dto.leaderboard_position,
		},
		adManualEnabled: dto.ad_manual_enable,
		ignoreCategories: dto.ignore_categories,
		enabled: dto.widget_active,
		botEnabled: dto.bot_active,
		extensionEnabled: dto.extension_active,
		nightbot: {
			twitch: {
				connected: dto.nightbot_twitch_connected,
				moderator: dto.nightbot_twitch_moderator,
			},
			youtube: {
				connected: dto.nightbot_youtube_connected,
				moderator: dto.nightbot_youtube_moderator,
			},
			trovo: {
				connected: dto.nightbot_trovo_connected,
				moderator: dto.nightbot_trovo_moderator,
			},
		},
		relogin: dto.relogin,
		bsRequired: dto.bs_required,
		allowAdultContent: dto.allow_adult_content,
		sspTextFrequency: dto.ssp_text_frequency,
		obsWebSocket: {
			pass: dto.obs_socket_pass,
			port: dto.obs_socket_port,
		},
		version: dto.version,
	}
}

export function responseToWidgetAdapter (response: IWidgetResponse): IWidget {
	return {
		...responseToWidgetSettingsAdapter(response),
		streamer: response.streamer,
		twitch: response.twitch,
		youtube: response.youtube,
		trovo: response.trovo,
		vkplay: response.vkplay,
		tiktok: response.tiktok,
	}
}
