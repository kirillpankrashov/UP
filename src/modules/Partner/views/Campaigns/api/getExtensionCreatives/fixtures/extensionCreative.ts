import { AdFormat, CampaignType, CurrencyIcon, CurrencyName, Platform } from '@/core/types'

import type { IExtensionCreative } from '../types'

export const extensionCreative: IExtensionCreative = {
	id: 1193,
	adSet: {
		'id': 1192,
		format: {
			'id': AdFormat.FULLSCREEN,
			'title': 'Sponsored мessages',
			'description': 'Send sponsored messages via chatbot to selected platform.',
			'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/97bcbd05-2d67-44dc-94d1-af092de6fb58',
		},
		platform: Platform.TWITCH,
		campaign: {
			'id': 649,
			'slug': 'BA-CMP-1740158059',
			type: CampaignType.EXTENSION,
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
		'slug': 'BA-GRP-1740091316',
		'title': 'Twitch // VK Видео // Pop-up banner CS // Февраль 2025',
		'description': '',
		dates: {
			'start': '17.02.2025',
			'end': '28.02.2025',
		},
		impressions: {
			'current': 0,
			'total': 114286,
		},
		'avgCpm': 450,
		'channels': 0,
		'clicks': 0,
		'ctr': 0,
		'reach': 0,
		'spent': 0,
		'budget': 51428.7,
		'published': true,
		'visible': true,
	},
	'slug': 'BA-CRV-V-1740523087',
	'title': {
		default: 'Granaposta/ CPA / Feb 2025 / Twitch group',
		alternative: 'VK Видео // Pop-up banner CS // Февраль 2025',
	},
	'description': '',
	impressions: {
		'current': 0,
		'total': 114286,
	},
	'avgCpm': 450,
	'channels': 0,
	'clicks': 0,
	'ctr': 0,
	'reach': 0,
	'spent': 0,
	published: true,
	visible: true,
}
