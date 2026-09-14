import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import type { IPrerollCampaign } from '../types'

export const prerollCampaign: IPrerollCampaign = {
	id: 562,
	'slug': 'VOD-CMP-1725691784',
	type: CampaignType.PREROLL,
	typeEdit: false,
	title: {
		default: 'India // Nestle Nescafe // VOD test campaign',
		alternative: '',
	},
	affiliateNetwork: null,
	'description': 'Nestle Nescafe VOD test',
	category: {
		id: 14,
		title: 'Electronics & Gadgets',
		icon: '',
		darkMarket: false,
	},
	holding: {
		id: 117,
		title: 'LG (Brasil)',
		description: '',
		logo: 'https://uplify-storage.s3.eu-central-1.amazonaws.com/holdings/a336ce46-6425-4fc2-a8fa-c6cbb7ff1491',
		advertisers: 1,
	},
	advertiser: {
		id: 164,
		title: 'LG (Brasil)',
		description: '',
		wallet: {
			balance: 28407.3058,
			currency: {
				code: CurrencyName.BRL,
				enTitle: 'Brazilian Real',
				ruTitle: 'Бразильский реал',
				flag: CurrencyIcon.BRL,
				visible: true,
				ptTitle: 'Brazilian Real',
				esTitle: 'Brazilian Real',
			},
			icon: CurrencyIcon.BRL,
		},
		holding: {
			'id': 108,
			'title': 'Nestle (India)',
			'description': '',
			'logo': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/holdings/773173da-a226-4761-854e-da36787e1b4d',
			'advertisers': 1,
		},
	},
	dates: {
		start: '16.09.2024',
		end: '30.09.2024',
	},
	impressions: {
		current: 134852,
		total: 1320000,
	},
	budget: {
		current: 3065.1859600000003,
		total: 30003.6,
	},
	avgCpm: 22.73,
	channels: 225,
	clicks: 1001,
	ctr: 0.74,
	reach: 44951,
	published: true,
	visible: true,
	productUrlParams: [],
	closed: false,
}
