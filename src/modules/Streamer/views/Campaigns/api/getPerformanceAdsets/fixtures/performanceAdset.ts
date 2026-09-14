import { AdFormat, AdsetStatus, CampaignType, CurrencyName, PayoutType, Platform } from '@/core/types'

import type { IPerformanceAdset } from '../types'

export const performanceAdset: IPerformanceAdset = {
	campaignType: CampaignType.PERFORMANCE,
	id: 25,
	slug: 'PF-GRP-1697875677',
	title: 'Cupidatat non anim sit dolorem tempore ullamco qui',
	format: {
		id: AdFormat.INTERACTIVE,
		title: 'Интерактив',
		description: 'Мультиформатный креатив в видимой области видеоплеера Twitch',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/interactive.svg',
	},
	platform: Platform.TWITCH,
	description: 'In sint id aliqua Provident natus laborum Vel incidunt amet ex in ut quae id laudantium',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	payableType: PayoutType.IMPRESSIONS,
	impressions: 0,
	clicks: 0,
	actions: 0,
	income: 0,
	currency: CurrencyName.USD,
	ctr: 0,
	dates: {
		start: '18.11.2023',
		end: '19.12.2024',
	},
	status: AdsetStatus.ACTIVE,
	adsetReady: false,
	ready: false,
	restore: false,
	blocked: {
		at: null,
		until: null,
		reason: null,
	},
}
