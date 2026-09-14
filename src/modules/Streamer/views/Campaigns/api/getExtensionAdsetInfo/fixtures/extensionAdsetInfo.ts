import { AdFormat, AdsetStatus, CampaignType, CurrencyIcon, CurrencyName, Platform } from '@/core/types'

import type { IExtensionAdsetInfo } from '../types'

export const extensionAdsetInfo: IExtensionAdsetInfo = {
	campaignType: CampaignType.EXTENSION,
	slug: 'EXT-GRP-1703224119',
	platform: Platform.TWITCH,
	title: 'Third-party Agency for Good Sun Talents',
	income: {
		current: 917.056,
		estimate: 917.056,
	},
	impressions: 100,
	clicks: 0,
	actions: 0,
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	payoutType: 'Payout type',
	bidCap: 400,
	currency: CurrencyName.USD,
	format: {
		id: AdFormat.EXT_BANNER,
		title: 'Banner',
		description: 'Баннер',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/c518fb13-ed78-496a-9795-cf9c8aea8f18',
	},
	description: 'Yo!',
	campaign: {
		id: 311,
		slug: 'BA-CMP-1702773664',
		type: CampaignType.EXTENSION,
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
	ads: [
		{
			id: 344,
			slug: 'BA-CRV-C-1703144725',
			title: 'Third-party Agency for Good Sun Talents!',
			attachments: {
				gallery: {
					'list': [
						{
							'id': 'e29c16a3-e9f1-4d1d-bc11-4dd8564c4a51',
							'path': 'https://storage.googleapis.com/stage-us/creatives/extension/gallery/96c7bc2c-f7d6-4c77-b8c7-ba0c4fdecadd',
						},
						{
							'id': '9873b074-2f4d-47b9-ba37-1e446636e3ca',
							'path': 'https://storage.googleapis.com/stage-us/creatives/extension/gallery/35c78763-2206-4292-ba53-c731aa220c7b',
						},
						{
							'id': 'a0431724-5cd1-4555-9fcb-129b43cc6733',
							'path': 'https://storage.googleapis.com/stage-us/creatives/extension/gallery/c5d638ff-0487-4c35-a0b9-97461ed0181c',
						},
						{
							'id': '4f552f42-3faa-43ec-9b51-3a11458b77ce',
							'path': 'https://storage.googleapis.com/stage-us/creatives/extension/gallery/446febfb-bfed-4c72-b924-2d870e5cfa93',
						},
					],
					'styles': '',
				},
			},
			productUrl: 'https://sandbox.ord.vk.com/',
			chatbotText: 'Test chatbot text',
		},
	],
	status: AdsetStatus.ACTIVE,
	creatorPayout: {
		value: 70.4,
		currency: CurrencyName.USD,
	},
	ctr: {
		current: 0,
		target: 0.3,
		global: 0.3,
	},
}
