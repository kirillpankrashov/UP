import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import type { IPerformanceCampaign } from '../types'

export const performanceCampaign: IPerformanceCampaign = {
	id: 562,
	slug: 'PF-CMP-1740044167',
	type: CampaignType.PERFORMANCE,
	typeEdit: false,
	title: {
		default: 'Russia // VK Видео // Февраль 2025',
		alternative: '',
	},
	affiliateNetwork: null,
	description: 'Промо кампания сервиса VK Видео \r\n\r\nЦелевой CTR для данной кампании составляет 0,7%',
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
			'id': 35,
			'title': 'Mail.ru',
			'description': '',
			'logo': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/holdings/3c3a8e87-1a42-46b3-b01a-c2ecac6f0d14',
			'advertisers': 9,
		},
	},
	dates: {
		start: '16.09.2024',
		end: '30.09.2024',
	},
	timeZone: -3,
	externalId: '',
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
