import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'
import { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

import { type IPrerollCampaign } from '../types'

export const prerollCampaign: IPrerollCampaign = {
	id: 320,
	slug: 'VOD-CMP-1725662005',
	campaignType: CampaignType.PREROLL,
	typeEdit: false,
	title: {
		default: 'maxim test preroll campaign',
		alternative: '',
	},
	description: 'description of the campaign',
	affiliateNetwork: null,
	category: {
		id: 2,
		title: 'Telecom',
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
	dates: {
		start: '26.08.2024',
		end: '27.08.2024',
	},
	impressions: {
		current: 0,
		total: 100000,
	},
	budget: {
		current: 0,
		total: 1000,
	},
	avgCpm: 10,
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
