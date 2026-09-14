import { AdFormat,CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import { type IPerformanceCampaignStructure } from '../types'

export const performanceCampaignStructure: IPerformanceCampaignStructure = {
	id: 327,
	slug: 'PF-CMP-1735130010',
	campaignType: CampaignType.PERFORMANCE,
	title: 'Interactive  test',
	description: 'In sint id aliqua Provident natus laborum Vel incidunt amet ex in ut quae id laudantium',
	category: 'Travel',
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
	visible: true,
	adSets: [
		{
			id: 29,
			slug: 'PF-GRP-1735000551',
			format: AdFormat.INTERACTIVE,
			title: 'Interactive Group name',
			visible: true,
			created: '2024-12-16 15:29:20',
		},
	],
}
