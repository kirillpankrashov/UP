import { AdvertisingFrequency, AdvertisingMode, AdvertisingPosition, Platform } from '@/core/types'
import type { TWidgetSettings } from '@/modules/Streamer/views/Settings/api'

export const widgetData: TWidgetSettings = {
	url: 'http://platform.uplify.app/ads/v1/KVEJKZPYIPQAINQ3GE8P',
	obsDockUrl: 'https://platform.uplify.app/obs-dock/hbRX78pQY1LtC0oUVntEb7T3yjlE9DI4',
	obsDockSlug: 'eyJpdiI6IkhkN3FqengrSjJES',
	obsWebSocket: {
		pass: '1234567890',
		port: 4444,
	},
	slug: 'WGT-1644526574',
	platform: Platform.TWITCH,
	boxSize: 3,
	referralPromotion: false,
	stream: {
		delay: 30,
		enabled: false,
	},
	advertising: {
		mode: AdvertisingMode.AUTO,
		frequency: AdvertisingFrequency.EVERY_30_MIN,
		position: AdvertisingPosition.RIGHT_TOP_CORNER,
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
		vkplay: {
			connected: false,
			moderator: false,
		},
		tiktok: {
			connected: false,
			moderator: false,
		},
	},
	relogin: false,
	version: '1.0',
	brandisExtensionEnabled: false,
	ssp: {
		text: {
			frequency: 5,
		},
		allowAdult: true,
	},
}
