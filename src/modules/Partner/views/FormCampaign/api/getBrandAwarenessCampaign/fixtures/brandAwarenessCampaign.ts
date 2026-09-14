import { CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'
import { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

import { type IBrandAwarenessCampaign } from '../types'

export const brandAwarenessCampaign: IBrandAwarenessCampaign = {
	id: 1193,
	slug: 'BA-CMP-1740158059',
	campaignType: CampaignType.BRAND_AWARENESS,
	typeEdit: false,
	affiliateNetwork: null,
	category: {
		id: 1,
		title: 'Category 1',
		icon: '',
		darkMarket: false,
	},
	holding: {
		id: 1,
		title: 'Holding 1',
		description: '',
		logo: '',
		advertisers: 0,
	},
	advertiser: {
		id: 1,
		title: 'Advertiser 1',
		description: '',
		wallet: {
			balance: 0,
			currency: {
				code: CurrencyName.USD,
				enTitle: 'United States Dollar',
				ruTitle: 'Доллар США',
				flag: CurrencyIcon.USD,
				visible: true,
				ptTitle: 'Dólar Americano',
				esTitle: 'Dólar estadounidense',
			},
			icon: CurrencyIcon.USD,
		},
		holding: {
			id: 1,
			title: 'Holding 1',
			description: '',
			logo: '',
			advertisers: 0,
		},
	},
	title: {
		default: 'Granaposta/ CPA / Feb 2025',
		alternative: '',
	},
	description: 'Esta é uma campanha CPA, então o texto será enviado com um link para seu chat, e o pagamento será feito pelo FTD feito através do seu link. Não há pagamento por visualizações.\n\n****CTR ALVO DE**** 0,3%\n**FTDs alvo**: 125',
	dates: {
		start: '19.02.2025',
		end: '19.03.2025',
	},
	timeZone: 0,
	impressions: {
		current: 0,
		total: 0,
	},
	avgCpm: 0,
	channels: 0,
	clicks: 0,
	ctr: 0,
	reach: 0,
	budget: {
		current: 0,
		total: 0,
	},
	published: true,
	visible: true,
	evr: [],
	productUrlParams: [
		{
			key: '1',
			param: CampaignUrlParams.ERID_TOKEN,
			name: 'erid',
		},
	],
	closed: false,
	mediaAgency: {
		id: 1,
		title: 'Media Agency 1',
	},
	ordMarkup: 'test',
}
