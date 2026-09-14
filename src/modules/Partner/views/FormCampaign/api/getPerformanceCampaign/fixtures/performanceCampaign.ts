import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'
import { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

import { type IPerformanceCampaign } from '../types'

export const performanceCampaign: IPerformanceCampaign = {
	id: 327,
	slug: 'PF-CMP-1735130010',
	campaignType: CampaignType.PERFORMANCE,
	typeEdit: false,
	title: {
		default: 'Interactive  test',
		alternative: '',
	},
	description: 'In sint id aliqua Provident natus laborum Vel incidunt amet ex in ut quae id laudantium',
	affiliateNetwork: null,
	category: {
		id: 10,
		title: 'Travel',
		icon: '',
		darkMarket: false,
	},
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
			balance: 999995.7,
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
	dates: {
		start: '16.12.2024',
		end: '15.01.2026',
	},
	timeZone: 0,
	externalId: 'qwerty',
	impressions: {
		current: 0,
		total: 100,
	},
	budget: {
		current: 0,
		total: 10,
	},
	avgCpm: 100,
	channels: 0,
	clicks: 0,
	ctr: 0,
	reach: 0,
	productUrlParams: [
		{
			key: '1',
			param: CampaignUrlParams.ERID_TOKEN,
			name: 'erid',
		},
	],
	published: true,
	visible: true,
	closed: false,
	mediaAgency: {
		id: 1,
		title: 'Media Agency 1',
	},
	ordMarkup: 'test',
}
