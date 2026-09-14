import { AdFormat,CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import { type IPrerollCampaignStructure } from '../types'

export const prerollCampaignStructure: IPrerollCampaignStructure = {
	id: 320,
	slug: 'VOD-CMP-1725662005',
	campaignType: CampaignType.PREROLL,
	title: 'maxim test preroll campaign',
	description: 'description of the campaign',
	category: 'Telecom',
	holding: {
		id: 18,
		title: 'Uplify',
		description: '',
		logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
		advertisers: 3,
	},
	advertiser: {
		id: 32,
		title: 'Uplify USD',
		description: '',
		wallet: {
			balance: 1000663.014,
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
			id: 4,
			slug: 'VOD-GRP-1725197218',
			format: AdFormat.PREROLL,
			title: 'Group test maxim',
			visible: true,
			created: '2024-08-26 11:48:23',
		},
	],
}
