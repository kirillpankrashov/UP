import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import type { IExtensionCampaign } from '../types'

export const extensionCampaign: IExtensionCampaign = {
	id: 562,
	slug: 'BA-CMP-1726854397',
	type: CampaignType.EXTENSION,
	typeEdit: false,
	title: {
		default: 'Brazil // LG Ultragear // September 2024',
		alternative: '',
	},
	affiliateNetwork: null,
	description: 'CTR ALVO PARA A CAMPANHA DE 0,7%\n\nEVITEM SEREM BLOQUEADOS DA CAMPANHA!\n\nACESSEM NOSSO DISCORD PARA MAIS INFORMAÇÕES\n\nCAMPANHA PARA OS NOVOS MONITORES ULTRAGEAR DA LG!\n\nDIVULGAÇÃO DE PROMOÇÕES EXCLUSIVAS',
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
			id: 117,
			title: 'LG (Brasil)',
			description: '',
			logo: 'https://uplify-storage.s3.eu-central-1.amazonaws.com/holdings/a336ce46-6425-4fc2-a8fa-c6cbb7ff1491',
			advertisers: 1,
		},
	},
	dates: {
		start: '16.09.2024',
		end: '30.09.2024',
	},
	timeZone: -3,
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
