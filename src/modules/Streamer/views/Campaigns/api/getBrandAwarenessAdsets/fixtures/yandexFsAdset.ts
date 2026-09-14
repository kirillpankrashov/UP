import { AdFormat, AdsetStatus, CampaignType, CurrencyName, Platform, StrategyPayment } from '@/core/types'

import type { IBrandAwarenessAdset } from '../types'

export const yandexFsAdset: IBrandAwarenessAdset = {
	id: 368,
	slug: 'BA-GRP-1703224119',
	title: 'Внешние рекламные сети',
	format: {
		id: AdFormat.YANDEX_FS,
		title: 'Yandex Campaign',
		description: 'Mid-roll hosted live stream full screen',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/fullscreen_video.svg',
	},
	platform: Platform.TWITCH,
	description: 'Yo!',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	impressions: {
		current: 0,
		dailyLimit: 28,
		dailyLimitRest: 0,
	},
	restLimitPercent: 100,
	estimateIncome: 917.056,
	campaignType: CampaignType.BRAND_AWARENESS,
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	time: {
		start: null,
		end: null,
	},
	blocked: {
		at: null,
		until: null,
		reason: null,
	},
	currency: {
		creator: CurrencyName.RUB,
		adset: CurrencyName.USD,
	},
	ctr: 0,
	status: AdsetStatus.ACTIVE,
	restore: true,
	dailyActionLimit: {
		enabled: false,
		today: 0,
		limit: 0,
	},
	strategyPayment: StrategyPayment.PPV,
	streamerDayLimit: null,
	streamerDayLimitShown: null,
}
