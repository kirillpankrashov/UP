import { AdFormat, AdsetStatus, CampaignType, CurrencyName, Platform, StrategyPayment } from '@/core/types'
import type { ISpecialProjectAdset } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/types'

export const specialProjectAdset: ISpecialProjectAdset = {
	'id': 3,
	'campaignType': CampaignType.SPECIAL_PROJECT,
	'slug': 'SP-GRP-1773308540',
	'title': 'Test campaign 1',
	'description': 'Test adset 3',
	'platform': Platform.TWITCH,
	'format': {
		'id': AdFormat.SP_CUSTOM,
		'title': 'Кастомизированное решение для спецпроекта',
		'description': 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
		'icon': 'https://storage.googleapis.com/stage-us/formats/advertise.svg',
	},
	'logo': 'https://storage.googleapis.com/stage-us/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	'dates': {
		'start': '12.03.2026',
		'end': '31.03.2027',
	},
	'impressions': 0,
	'strategyPayment': StrategyPayment.PPP,
	'payoutType': 'Фиксированная стоимость',
	'currency': CurrencyName.RUB,
	'restore': false,
	'status': AdsetStatus.ACTIVE,
}
