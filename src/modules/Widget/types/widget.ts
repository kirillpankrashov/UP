import type {
	AdvertisingMode,
	AdvertisingPosition,
	LeaderboardPosition,
	Platform,
	TPlatformInfoResponse,
} from '@/core/types'

import type { IWidgetStreamer } from './widget-streamer'

export interface IWidgetSettings {
  url: string
  obsDockSlug: string
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
    frequency: number
    position: AdvertisingPosition
  }
  leaderboard: {
    position: LeaderboardPosition
  }
  adManualEnabled: boolean
  ignoreCategories: string[]
  enabled: boolean
  botEnabled: boolean
  extensionEnabled: boolean
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
  }
  relogin: boolean
  bsRequired: boolean
  allowAdultContent: boolean
  sspTextFrequency: number
  obsWebSocket: {
    pass: string | null
    port: number | null
  }
  version: string | null
}

export interface IWidget extends IWidgetSettings {
  streamer: IWidgetStreamer | null
  twitch: TPlatformInfoResponse | null
  youtube: TPlatformInfoResponse | null
  trovo: TPlatformInfoResponse | null
  vkplay: TPlatformInfoResponse | null
  tiktok: TPlatformInfoResponse | null
}
