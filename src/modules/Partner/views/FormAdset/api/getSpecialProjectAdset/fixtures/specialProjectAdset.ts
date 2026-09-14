import { AdFormat, CampaignType, CurrencyIcon, CurrencyName, Platform, StrategyPayment } from '@/core/types'

import { type ISpecialProjectAdset } from '../types'

export const specialProjectAdset: ISpecialProjectAdset = {
	'id': 1310,
	'format': {
		'id': AdFormat.FULLSCREEN,
		'title': 'Оверлей 50%',
		'description': 'Креатив, занимающий до 50% от видимой области трансляции.',
		'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/bbfa981a-365b-4e0b-af68-ac890df8ce71.svg',
	},
	'duration': 15,
	'frequency': 180,
	'formatEdit': false,
	'platform': Platform.TWITCH,
	'campaign': {
		'id': 698,
		'slug': 'SP-CMP-1748317663',
		'type': CampaignType.SPECIAL_PROJECT,
		'title': 'Russia // RuStore // Май 2025',
		'description': 'Промокампания RuStore',
		'category': 'Игры & Киберспорт',
		'visible': true,
	},
	'slug': 'SP-GRP-1747955378',
	'title': 'Twitch // RuStore x Сymanneth // Май 2025',
	'titleAlternative': 'Twitch RuStore x Сymanneth Май 2025',
	'description': '',
	'start': '19.05.2025',
	'end': '31.05.2025',
	'strategyPayment': StrategyPayment.PPP,
	'currency': {
		'code': CurrencyName.RUB,
		'enTitle': 'Russian ruble',
		'ruTitle': 'Русский рубль',
		'ptTitle': 'Russian ruble',
		'esTitle': 'Russian ruble',
		'flag': CurrencyIcon.RUB,
		'visible': true,
	},
	'bidCap': 0.001,
	'timeZone': 3,
	'targeting': {
		'streamers': [
			{
				'id': 36355,
				'price': 0.001,
			},
			{
				'id': 15208,
				'price': 0.001,
			},
		],
		'countriesAuditory': {
			'list': [],
			'exclude': false,
		},
		'devicesAuditory': {
			'list': [],
			'exclude': false,
		},
	},
	'published': true,
	'visible': true,
	'priority': false,
}
