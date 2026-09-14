import { AdFormat, CampaignType, CurrencyIcon, CurrencyName, Platform, StrategyPayment } from '@/core/types'

import type { ISpecialProjectAdset } from '../types'

export const specialProjectAdset: ISpecialProjectAdset = {
	id: 1193,
	format: {
		'id': AdFormat.FULLSCREEN,
		'title': 'Sponsored мessages',
		'description': 'Send sponsored messages via chatbot to selected platform.',
		'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/97bcbd05-2d67-44dc-94d1-af092de6fb58',
	},
	platform: Platform.TWITCH,
	campaign: {
		'id': 649,
		'slug': 'SP-CMP-1740158059',
		type: CampaignType.SPECIAL_PROJECT,
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
		visible: true,
	},
	currency: {
		code: CurrencyName.BRL,
		enTitle: 'Brazilian Real',
		ruTitle: 'Бразильский реал',
		flag: CurrencyIcon.BRL,
		visible: true,
		ptTitle: 'Brazilian Real',
		esTitle: 'Brazilian Real',
	},
	'slug': 'SP-GRP-1740236719',
	'title': {
		default: 'Granaposta/ CPA / Feb 2025 / Twitch group',
		alternative: '',
	},
	'description': 'Esta é uma campanha CPA, então o texto será enviado com um link para seu chat, e o pagamento será feito pelo FTD feito através do seu link. Não há pagamento por visualizações.\n\n****CTR ALVO DE**** 0,3%\n**FTDs alvo**: 125',
	dates: {
		'start': '19.02.2025',
		'end': '19.03.2025',
	},
	bidCap: 0,
	published: true,
	visible: true,
}
