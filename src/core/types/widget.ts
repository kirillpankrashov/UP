import type {
	AdvertisingFrequency,
	AdvertisingMode,
	AdvertisingPosition,
	LeaderboardPosition,
	Platform,
} from '@/core/types'

export type TWidgetResponse = {
	slug: string
	url: string
	ad_manual_enable: boolean
	advertising_mode: AdvertisingMode
	advertising_frequency: AdvertisingFrequency
	advertising_position: AdvertisingPosition
	leaderboard_position: LeaderboardPosition
	ignore_categories: number[]
	widget_active: boolean
	stream_active: boolean
	stream_delay: number
	extension_active: boolean
	bot_active: boolean
	box_size: number
	nightbot_twitch_connected: boolean
	nightbot_twitch_moderator: boolean
	nightbot_youtube_connected: boolean
	nightbot_youtube_moderator: boolean
	nightbot_trovo_connected: boolean
	nightbot_trovo_moderator: boolean
	nightbot_vkplay_connected: boolean
	nightbot_vkplay_moderator: boolean
	nightbot_tiktok_connected: boolean
	nightbot_tiktok_moderator: boolean
	slug_obs_dock: string
	platform: Platform
	referral_promotion: boolean
	relogin: boolean
	brandis_extension_active: boolean
	max_box_size: number
	version: string
	bs_required: boolean
	status: boolean
	ssp_text_frequency: number
	allow_adult_content: boolean
  obs_socket_pass: string | null
  obs_socket_port: number | null
}

export type TWidget = {
	url: string
  obsDockSlug: string
  obsDockUrl: string
  obsWebSocket: {
    pass: string | null
    port: number | null
  }
  slug: string
  platform: Platform
  boxSize: number
  referralPromotion: boolean
  stream: {
    delay: number
    enabled: boolean
  }
  advertising: {
    mode: AdvertisingMode
    frequency: AdvertisingFrequency
    position: AdvertisingPosition
  }
  adManualEnabled: boolean
  ignoreCategories: number[]
  enabled: boolean
  botEnabled: boolean
  extensionEnabled: boolean
  brandisExtensionEnabled: boolean
  nightbot: {
    twitch: {
      connected: boolean
      moderator: boolean
    }
    youtube: {
      connected: boolean
      moderator: boolean
    }
    trovo: {
      connected: boolean
      moderator: boolean
    }
		vkplay: {
			connected: boolean
			moderator: boolean
		}
		tiktok: {
			connected: boolean
			moderator: boolean
		}
  }
  relogin: boolean
	version: string
	ssp: {
		allowAdult: boolean
		text: {
			frequency: number
		}
	}
}
