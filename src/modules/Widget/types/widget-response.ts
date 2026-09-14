import type { AdvertisingMode, AdvertisingPosition, LeaderboardPosition, Platform, TPlatformInfoResponse } from '@/core/types'

import type { IWidgetStreamer } from './widget-streamer'

export interface IWidgetSettingsUpdateResponse {
  platform?: Platform
  advertising_mode: AdvertisingMode
  advertising_frequency: number
  advertising_position?: AdvertisingPosition
  leaderboard_position: LeaderboardPosition
  ignore_categories?: string[]
  box_size?: number
}

export interface IWidgetSettingsResponse {
  url: string
  slug_obs_dock: string
  slug: string
  platform: Platform
  box_size: number
  referral_promotion: boolean
  stream_delay: number
  advertising_mode: AdvertisingMode
  advertising_frequency: number
  advertising_position: AdvertisingPosition
  allow_adult_content: boolean
  leaderboard_position: LeaderboardPosition
  ad_manual_enable: boolean
  ignore_categories: string[]
  widget_active: boolean
  bot_active: boolean
  stream_active: boolean
  extension_active: boolean
  nightbot_twitch_connected: boolean
  nightbot_twitch_moderator: boolean
  nightbot_youtube_connected: boolean
  nightbot_youtube_moderator: boolean
  nightbot_trovo_connected: boolean
  nightbot_trovo_moderator: boolean
  relogin: boolean
  bs_required: boolean
  ssp_text_frequency: number
  obs_socket_pass: string | null
  obs_socket_port: number | null
  version: string | null
}

export interface IWidgetResponse extends IWidgetSettingsResponse {
  streamer: IWidgetStreamer | null
  twitch: TPlatformInfoResponse | null
  youtube: TPlatformInfoResponse | null
  trovo: TPlatformInfoResponse | null
  vkplay: TPlatformInfoResponse | null
  tiktok: TPlatformInfoResponse | null
}
