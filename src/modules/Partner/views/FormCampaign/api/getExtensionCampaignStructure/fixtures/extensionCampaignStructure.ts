import { AdFormat,CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import { type IExtensionCampaignStructure } from '../types'

export const extensionCampaignStructure: IExtensionCampaignStructure = {
	id: 331,
	slug: 'BA-CMP-1740612001',
	campaignType: CampaignType.EXTENSION,
	title: 'Test Campaing CPC strategy',
	description: 'Test Campaing CPC strategy',
	category: 'Auto',
	holding: {
		id: 36,
		title: 'Test Holding Kirill',
		description: 'Test Holding  for CPA check',
		logo: '',
		advertisers: 1,
	},
	advertiser: {
		id: 40,
		title: 'Test Kirill',
		description: 'Test Kirill',
		wallet: {
			balance: 984,
			currency: {
				code: CurrencyName.USD,
				enTitle: 'US Dollar',
				ruTitle: 'Доллар США',
				flag: CurrencyIcon.USD,
				visible: true,
				ptTitle: 'US Dollar',
				esTitle: 'US Dollar',
			},
			icon: CurrencyIcon.USD,
		},
		holding: {
			id: 36,
			title: 'Test Holding Kirill',
			description: 'Test Holding  for CPA check',
			logo: '',
			advertisers: 1,
		},
	},
	visible: true,
	adSets: [
		{
			id: 397,
			slug: 'BA-GRP-1739903949',
			format: AdFormat.CHATBOT_TEXT,
			title: 'Test Group CPC',
			created: '2025-02-18 13:52:35',
			published: true,
			visible: true,
			'ads': [
				{
					'id': 373,
					'slug': 'BA-CRV-SM-1740235517',
					'title': 'Test CPC strategy',
					'visible': true,
					'created': '2025-02-18 13:53:21',
				},
			],
		},
	],
}
