import { AdFormat, CampaignType, CurrencyIcon, CurrencyName, PayoutType, Platform } from '@/core/types'

import type { IPrerollAdset } from '../types'

export const PrerollAdset: IPrerollAdset = {
	id: 1193,
	format: {
		'id': AdFormat.FULLSCREEN,
		'title': 'Preroll',
		'description': 'Short video ads that play before the main content, ideal for capturing attention and boosting brand visibility.',
		'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/151f3c55-5f32-457e-af63-387ba6047981',
	},
	platform: Platform.YOUTUBE,
	campaign: {
		'id': 649,
		'slug': 'BA-CMP-1740158059',
		type: CampaignType.PREROLL,
		title: {
			default: 'Granaposta/ CPA / Feb 2025',
		},
		'description': 'Esta é uma campanha CPA, então o texto será enviado com um link para seu chat, e o pagamento será feito pelo FTD feito através do seu link. Não há pagamento por visualizações.\n\nCTR ALVO DE 0,3%\nFTDs alvo: 125',
		category: {
			'id': 16,
			'title': 'Betting',
			'icon': '',
			darkMarket: false,
		},
		holding: {
			'id': 146,
			'title': 'Granaposta',
			'description': '',
			'logo': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/holdings/8a6c1907-af90-4b65-bfab-a7577b536578',
			'advertisers': 1,
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
		visible: true,
	},
	'slug': 'VOD-GRP-1725827732',
	'title': { default: 'India // Nestle Nescafe // VOD test group' },
	'description': 'India Nestle Nescafe VOD test',
	dates: {
		'start': '19.02.2025',
		'end': '19.03.2025',
	},
	impressions: {
		current: 0,
		total: 0,
	},
	avgCpm: 0,
	channels: 0,
	clicks: 0,
	ctr: 0,
	budget: {
		current: 0,
		total: 114.286,
	},
	payableType: PayoutType.IMPRESSIONS,
	bidCap: 1,
	bidCpa: 0,
	published: true,
	visible: true,
}
