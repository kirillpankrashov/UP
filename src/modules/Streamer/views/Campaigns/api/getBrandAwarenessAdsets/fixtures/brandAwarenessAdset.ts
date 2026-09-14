import { AdFormat, AdsetStatus, CampaignType, CurrencyName, Platform, StrategyPayment } from '@/core/types'

import type { IBrandAwarenessAdset } from '../types'

export const brandAwarenessCustomAdset: IBrandAwarenessAdset = {
	id: 368,
	slug: 'BA-GRP-1703224119',
	title: 'Third-party Agency for Good Sun Talents',
	format: {
		id: AdFormat.CUSTOM,
		title: 'Кастом',
		description: 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/c518fb13-ed78-496a-9795-cf9c8aea8f18',
	},
	platform: Platform.TWITCH,
	description: 'Yo!',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	impressions: {
		current: 0,
		dailyLimit: 28,
		dailyLimitRest: 0,
	},
	restLimitPercent: 14.29,
	estimateIncome: 917.056,
	campaignType: CampaignType.BRAND_AWARENESS,
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	time: {
		start: '10:00:00',
		end: '22:00:00',
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
	strategyPayment: StrategyPayment.PPVA,
	streamerDayLimit: 10,
	streamerDayLimitShown: 5,
}
