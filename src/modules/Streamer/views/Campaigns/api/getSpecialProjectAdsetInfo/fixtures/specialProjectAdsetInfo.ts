import { AdFormat, AdsetStatus, CampaignType, Platform, StrategyPayment } from '@/core/types'
import { CurrencyName } from '@/core/types'
import type { ISpecialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/types'

export const specialProjectAdsetInfo: ISpecialProjectAdsetInfo = {
	'campaignType': CampaignType.SPECIAL_PROJECT,
	'slug': 'SP-GRP-1773308540',
	'title': 'Test campaign 1',
	'description': 'Test adset 3',
	'platform': Platform.TWITCH,
	'format': {
		'id': AdFormat.CUSTOM,
		'title': 'Кастомизированное решение для спецпроекта',
		'description': 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
		'icon': 'https://storage.googleapis.com/stage-us/formats/advertise.svg',
	},
	'impressions': 0,
	'clicks': 0,
	'dates': {
		'start': '12.03.2026',
		'end': '31.03.2027',
	},
	'strategyPayment': {
		'slug': StrategyPayment.PPP,
		'title': 'Оплата за участие',
	},
	'payoutType': 'Фиксированная стоимость',
	'currency': CurrencyName.RUB,
	'frequency': 0,
	'duration': 0,
	'widgetUrl': 'http://alpha.uplify.app/streamer/widget/special-project/WGT-1652254212/SP-GRP-1773308540',
	'ads': [
		{
			'id': 3,
			'slug': 'SP-CRV-C-1774055829',
			'title': 'Test ad 3',
			'attachments': {
				'zip': {
					'size': 381798,
					'path': 'https://storage.googleapis.com/stage-us/creatives/b892c1e1-0664-40d6-a179-699934eef97d.zip',
					'basename': 'b892c1e1-0664-40d6-a179-699934eef97d.zip',
					'basedir': 'creatives',
					'properties': {
						'index': 'creatives/custom/5997afb4-bb1b-4c55-80fa-6dee5b721ec0/index.html',
						'width': 0,
						'height': 0,
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
				'video': null,
				'unit': null,
			},
			'productUrl': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			'chatbotText': 'Test ad 3',
		},
	],
	'status': AdsetStatus.ACTIVE,
}
