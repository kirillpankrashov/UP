import { AdFormat, AdsetStatus, CampaignType, CurrencyIcon, CurrencyName, Platform, StrategyPayment } from '@/core/types'

import type { IBrandAwarenessAdsetInfo } from '../types'

export const brandAwarenessAdsetInfo: IBrandAwarenessAdsetInfo = {
	campaignType: CampaignType.BRAND_AWARENESS,
	slug: 'BA-GRP-1703224119',
	platform: Platform.TWITCH,
	title: 'Third-party Agency for Good Sun Talents',
	income: {
		current: 0,
		estimate: 917.056,
	},
	ctr: {
		current: 0,
		target: 0.3,
		global: 0.3,
	},
	impressions: {
		total: 0,
		limit: 10304,
	},
	clicks: 0,
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	time: {
		start: '10:00:00',
		end: '22:00:00',
	},
	creatorPayout: {
		currency: CurrencyName.RUB,
		price: 89,
	},
	payoutType: 'За 1000 показов',
	strategyPayment: {
		'slug': StrategyPayment.PPVA,
		'title': 'Оплата за показ с бонусом за конверсию',
	},
	bidCap: 400,
	currency: CurrencyName.USD,
	frequency: '4 раза в час',
	format: {
		id: AdFormat.CUSTOM,
		title: 'Кастом',
		description: 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/c518fb13-ed78-496a-9795-cf9c8aea8f18',
	},
	description: 'Yo!',
	ads: [
		{
			id: 344,
			slug: 'BA-CRV-C-1703144725',
			title: 'Third-party Agency for Good Sun Talents!',
			attachments: {
				zip: {
					size: 270176,
					path: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/creatives/a8b458af-6813-456a-89e8-3a27c2552c4b.zip',
					basename: 'a8b458af-6813-456a-89e8-3a27c2552c4b.zip',
					basedir: 'creatives',
					properties: {
						width: 0,
						height: 0,
					},
				},
			},
			productUrl: 'https://alpha.uplify.app/',
			chatbotText: 'Ссылка для чат-бота ниже',
		},
	],
	campaign: {
		id: 311,
		slug: 'BA-CMP-1702773664',
		type: CampaignType.BRAND_AWARENESS,
		title: 'Third-party Agency for Good Sun Talents',
		description: 'w',
		category: 'Развлечения',
		holding: {
			id: 18,
			title: 'Uplify',
			description: '',
			logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
			advertisers: 3,
		},
		advertiser: {
			id: 39,
			title: 'Link strategy',
			description: '',
			wallet: {
				balance: 999997.3,
				currency: {
					code: CurrencyName.RUB,
					enTitle: 'Russian ruble',
					ruTitle: 'Русский рубль',
					flag: CurrencyIcon.RUB,
					visible: true,
					ptTitle: 'Russian ruble',
					esTitle: 'Russian ruble',
				},
				icon: CurrencyIcon.RUB,
			},
			holding: {
				id: 18,
				title: 'Uplify',
				description: '',
				logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
				advertisers: 3,
			},
		},
		visible: true,
	},
	dailyActionLimit: {
		enabled: false,
		actionPrice: 0,
		current: 0,
		totalEarned: 0,
	},
	status: AdsetStatus.ACTIVE,
	evr: {
		list: [
			{
				'id': 2,
				'code': 'r7',
				'title': 'R7',
				'value': 0,
				'primary': false,
			},
			{
				'id': 3,
				'code': 'tutorial',
				'title': 'Tutorial',
				'value': 0,
				'primary': false,
			},
			{
				'id': 1,
				'code': 'r1',
				'title': 'R1',
				'value': 0,
				'primary': true,
			},
		],
		global: null,
		target: null,
	},
	medianCpm: null,
	ssp: {
		bidFloor: null,
		commission: null,
	},
	streamerDayLimit: 10,
	streamerDayLimitShown: 5,
}
