import { AdvertisingMode, AdvertisingPosition, LeaderboardPosition, Platform } from '@/core/types'
import type { IWidget } from '@/modules/Widget/types'

export const defaultWidget: IWidget = {
	url: '',
	obsDockSlug: '',
	slug: '',
	platform: Platform.TWITCH,
	boxSize: 0,
	referralPromotion: false,
	stream: {
		delay: 0,
		enabled: false,
	},
	advertising: {
		mode: AdvertisingMode.AUTO,
		frequency: 0,
		position: AdvertisingPosition.LEFT_TOP_CORNER,
	},
	leaderboard: {
		position: LeaderboardPosition.TOP,
	},
	adManualEnabled: false,
	ignoreCategories: [],
	enabled: false,
	botEnabled: false,
	extensionEnabled: false,
	nightbot: {
		twitch: {
			connected: false,
			moderator: false,
		},
		youtube: {
			connected: false,
			moderator: false,
		},
		trovo: {
			connected: false,
			moderator: false,
		},
	},
	streamer: null,
	twitch: null,
	youtube: null,
	trovo: null,
	vkplay: null,
	tiktok: null,
	relogin: false,
	bsRequired: false,
	allowAdultContent: false,
	sspTextFrequency: 2,
	obsWebSocket: {
		pass: null,
		port: null,
	},
	version: null,
}
