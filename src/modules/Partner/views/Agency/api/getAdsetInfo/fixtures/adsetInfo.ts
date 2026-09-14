import { AdFormat, CampaignType, CurrencyName, Platform } from '@/core/types'

import type { IAdsetInfo } from '../types'

export const adsetInfo: IAdsetInfo = {
	'campaignType': CampaignType.BRAND_AWARENESS,
	'slug': 'BA-GRP-1714611367',
	'platform': Platform.TWITCH,
	'title': 'Mexico // Little Caesars // March-April 2024',
	'dates': {
		'start': '23.04.2024',
		'end': '30.04.2024',
	},
	'bidCap': 150.8,
	'currency': CurrencyName.MXN,
	'frequency': '2 раза в час',
	'format': {
		'id': AdFormat.PIP,
		'title': 'Оверлей 15%',
		'description': 'Реклама mid-roll в прямой трансляции, размещенная на 15% видимой области.',
		'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/e9683334-28bc-4101-ab42-bc735f5bd9dd.svg',
	},
	'description': '',
	'payoutType': 'За 1000 показов',
	'cpaPayoutType': '',
	'campaign': {
		'id': 481,
		'slug': 'BA-CMP-1710829805',
		'type': CampaignType.BRAND_AWARENESS,
		'title': 'Mexico // Little Caesars // March-April 2024',
		'description': 'A campaign for Little Caesar on Celebration Cup 2024',
		'category': 'Еда & Рестораны',
		'visible': false,
	},
	'ads': [
		{
			'id': 967,
			'slug': 'BA-CRV-P-1714116139',
			'title': 'Mexico // 2.High5 Little Caesars  // Overlay 15 // April 2024',
			'attachments': {
				'video': {
					'size': 2606300,
					'path': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/creatives/409f0dc3-c4c4-4667-ae18-d969cf4a05dd.mp4',
					'basename': '409f0dc3-c4c4-4667-ae18-d969cf4a05dd.mp4',
					'basedir': 'creatives',
					'properties': {
						'size': 2606300,
						'duration': 15,
						'frames': 25,
						'width': 1920,
						'height': 1080,
						'audio': '',
					},
					'extend': {
						'legal_compliance': {
							'erid': {
								'media': '',
								'text': '',
							},
							'marker': {
								'media': '',
								'text': '',
							},
						},
						'stream': {
							'bidfloor': 0,
							'bid_cap': 0,
						},
					},
				},
			},
			'productUrl': 'https://celebrationcup.com.mx/stream.html',
			'chatbotText': '¡Ve la Gran Final de Celebration Cup by Little Caesars con la emoción de eFootball 2024 junto a nuestros All Stars!¡No te lo pierdas el 27 de abril!🎮',
		},
	],
	'dailyActionLimit': {
		'enabled': false,
		'actionPrice': 0,
	},
}
