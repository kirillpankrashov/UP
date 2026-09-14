import {
	AdFormat,
	CampaignType,
	CurrencyName,
	PayoutType,
	Platform,
	PrerollAdsetStatus,
} from '@/core/types'

import type { IPrerollAdsetInfo } from '../types'

export const prerollAdsetInfo: IPrerollAdsetInfo = {
	campaignType: CampaignType.PREROLL,
	slug: 'PF-GRP-1703224119',
	platform: Platform.TWITCH,
	title: 'Third-party Agency for Good Sun Talents',
	income: {
		current: 0,
		estimate: 917.056,
	},
	impressions: 100,
	clicks: 0,
	actions: 0,
	ctr: {
		current: 0,
		target: 0.3,
		global: 0.3,
	},
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	payoutType: 'Payout type',
	payableType: PayoutType.ACTIONS,
	bidCap: 400,
	bidCpa: 100,
	currency: CurrencyName.USD,
	format: {
		id: AdFormat.INTERACTIVE,
		title: 'Interactive',
		description: 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/c518fb13-ed78-496a-9795-cf9c8aea8f18',
	},
	description: 'Yo!',
	campaign: {
		id: 311,
		slug: 'BA-CMP-1702773664',
		type: CampaignType.PERFORMANCE,
		title: 'Third-party Agency for Good Sun Talents',
		description: 'w',
		category: 'Развлечения',
		visible: true,
	},
	attachments: {
		unit: {
			size: 2298419,
			path: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/performance/e601fd2e-2fc5-4a13-85ad-a03a307f09e7.mp4',
			basename: 'e601fd2e-2fc5-4a13-85ad-a03a307f09e7.mp4',
			basedir: 'creatives',
			properties: {
				size: 2298419,
				duration: 15,
				frames: 25,
				width: 1920,
				height: 1080,
				audio: 'aac',
			},
		},
	},
	productUrl: 'https://sandbox.ord.vk.com/',
	status: PrerollAdsetStatus.CONFIRMED,
	ssp: {
		bidFloor: null,
		commission: null,
	},
	creatorPayout: {
		value: 48.6096,
		currency: CurrencyName.RUB,
	},
	videoDescriptionText: 'Test video description text',
	vod: [],
}
