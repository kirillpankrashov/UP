import { AdvertisingPosition, CurrencyIcon, CurrencyName } from '@/core/types'
import type { TDictionary } from '@/core/api'

export const dictData: TDictionary = {
	status: true,
	'platforms': {
		'twitch': 'Twitch',
		'youtube': 'YouTube',
		'trovo': 'Trovo',
		'vkplay': 'VK Play',
		'tiktok': 'TikTok',
	},
	'currencies': [
		{
			'id': CurrencyName.BRL,
			'title': 'Brazilian Real',
			'icon': CurrencyIcon.BRL,
		},
		{
			'id': CurrencyName.EUR,
			'title': 'Euro',
			'icon': CurrencyIcon.EUR,
		},
		{
			'id': CurrencyName.INR,
			'title': 'Rupee',
			'icon': CurrencyIcon.INR,
		},
		{
			'id': CurrencyName.RUB,
			'title': 'Russian ruble',
			'icon': CurrencyIcon.RUB,
		},
		{
			'id': CurrencyName.USD,
			'title': 'US Dollar',
			'icon': CurrencyIcon.USD,
		},
	],
	'countries': [		{
		'id': 'ua',
		'title': 'Ukraine',
		'currency': CurrencyName.RUB,
		'icon': null,
	},
	{
		'id': 'us',
		'title': 'United States',
		'currency': CurrencyName.USD,
		'icon': null,
	},
	{
		'id': 'es',
		'title': 'Spain',
		'currency': CurrencyName.EUR,
		'icon': null,
	},
	{
		'id': 'pt',
		'title': 'Portugal',
		'currency': CurrencyName.EUR,
		'icon': null,
	},
	{
		'id': 'ru',
		'title': 'Russia',
		'currency': CurrencyName.RUB,
		'icon': null,
	}],
	'languages': [
		{
			'id': 'us',
			'title': 'English',
			'icon': null,
		},
		{
			'id': 'es',
			'title': 'Spanish',
			'icon': null,
		},
		{
			'id': 'pt',
			'title': 'Portuguese',
			'icon': null,
		},
		{
			'id': 'ru',
			'title': 'Russian',
			'icon': null,
		},
	],
	'locales': [
		{
			'id': 'us',
			'title': 'English',
			'icon': null,
		},
		{
			'id': 'es',
			'title': 'Español',
			'icon': null,
		},
		{
			'id': 'pt',
			'title': 'Português',
			'icon': null,
		},
		{
			'id': 'ru',
			'title': 'Русский',
			'icon': null,
		},
	],
	'gender': [
		{
			'id': 'male',
			'title': 'Male',
		},
		{
			'id': 'female',
			'title': 'Female',
		},
		{
			'id': 'other',
			'title': 'Other',
		},
	],
	'tags': [],
	'campaignsPositions': [
		{
			'id': AdvertisingPosition.LEFT_TOP_CORNER,
			'title': 'Left top corner',
		},
		{
			'id': AdvertisingPosition.RIGHT_TOP_CORNER,
			'title': 'Right top corner',
		},
		{
			'id': AdvertisingPosition.RIGHT_BOTTOM_CORNER,
			'title': 'Right bottom corner',
		},
	],
	'campaignsCategories': [
		{
			'id': 1,
			'title': 'Auto',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 2,
			'title': 'Telecom',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 3,
			'title': 'Pharmaceuticals',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 4,
			'title': 'Financial Services',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 5,
			'title': 'Services',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 6,
			'title': 'Entertainment',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 7,
			'title': 'FMCG',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 8,
			'title': 'Hi-Tech',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 9,
			'title': 'Retail',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 10,
			'title': 'Travel',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 11,
			'title': 'Games',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 12,
			'title': 'Restaurants',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 13,
			'title': 'Consumer Electronics',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 14,
			'title': 'Electronics',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 15,
			'title': 'Food',
			'icon': null,
			'darkMarket': false,
		},
		{
			'id': 16,
			'title': 'Gambling',
			'icon': null,
			'darkMarket': true,
		},
		{
			'id': 17,
			'title': 'Other',
			'icon': null,
			'darkMarket': false,
		},
	],
	'exchangeRates': [
		{
			'fromCurrency': CurrencyName.BRL,
			'toCurrency': CurrencyName.EUR,
			'rate': 0.18,
		},
		{
			'fromCurrency': CurrencyName.BRL,
			'toCurrency': CurrencyName.INR,
			'rate': 16.2,
		},
		{
			'fromCurrency': CurrencyName.BRL,
			'toCurrency': CurrencyName.MXN,
			'rate': 3.37,
		},
		{
			'fromCurrency': CurrencyName.BRL,
			'toCurrency': CurrencyName.RUB,
			'rate': 17.74,
		},
		{
			'fromCurrency': CurrencyName.BRL,
			'toCurrency': CurrencyName.USD,
			'rate': 0.2,
		},
		{
			'fromCurrency': CurrencyName.EUR,
			'toCurrency': CurrencyName.BRL,
			'rate': 4.98,
		},
		{
			'fromCurrency': CurrencyName.EUR,
			'toCurrency': CurrencyName.INR,
			'rate': 84.93,
		},
		{
			'fromCurrency': CurrencyName.EUR,
			'toCurrency': CurrencyName.MXN,
			'rate': 17.64,
		},
		{
			'fromCurrency': CurrencyName.EUR,
			'toCurrency': CurrencyName.RUB,
			'rate': 92.96,
		},
		{
			'fromCurrency': CurrencyName.EUR,
			'toCurrency': CurrencyName.USD,
			'rate': 1.04,
		},
		{
			'fromCurrency': CurrencyName.INR,
			'toCurrency': CurrencyName.BRL,
			'rate': 0.06,
		},
		{
			'fromCurrency': CurrencyName.INR,
			'toCurrency': CurrencyName.EUR,
			'rate': 0.01,
		},
		{
			'fromCurrency': CurrencyName.INR,
			'toCurrency': CurrencyName.MXN,
			'rate': 0.2,
		},
		{
			'fromCurrency': CurrencyName.INR,
			'toCurrency': CurrencyName.RUB,
			'rate': 1.04,
		},
		{
			'fromCurrency': CurrencyName.INR,
			'toCurrency': CurrencyName.USD,
			'rate': 0.01,
		},
		{
			'fromCurrency': CurrencyName.MXN,
			'toCurrency': CurrencyName.BRL,
			'rate': 0.27,
		},
		{
			'fromCurrency': CurrencyName.MXN,
			'toCurrency': CurrencyName.EUR,
			'rate': 0.05,
		},
		{
			'fromCurrency': CurrencyName.MXN,
			'toCurrency': CurrencyName.INR,
			'rate': 4.57,
		},
		{
			'fromCurrency': CurrencyName.MXN,
			'toCurrency': CurrencyName.RUB,
			'rate': 5.01,
		},
		{
			'fromCurrency': CurrencyName.MXN,
			'toCurrency': CurrencyName.USD,
			'rate': 0.06,
		},
		{
			'fromCurrency': CurrencyName.RUB,
			'toCurrency': CurrencyName.BRL,
			'rate': 0.05,
		},
		{
			'fromCurrency': CurrencyName.RUB,
			'toCurrency': CurrencyName.EUR,
			'rate': 0.01,
		},
		{
			'fromCurrency': CurrencyName.RUB,
			'toCurrency': CurrencyName.INR,
			'rate': 0.87,
		},
		{
			'fromCurrency': CurrencyName.RUB,
			'toCurrency': CurrencyName.MXN,
			'rate': 0.18,
		},
		{
			'fromCurrency': CurrencyName.RUB,
			'toCurrency': CurrencyName.USD,
			'rate': 0.01,
		},
		{
			'fromCurrency': CurrencyName.USD,
			'toCurrency': CurrencyName.BRL,
			'rate': 4.57,
		},
		{
			'fromCurrency': CurrencyName.USD,
			'toCurrency': CurrencyName.EUR,
			'rate': 0.87,
		},
		{
			'fromCurrency': CurrencyName.USD,
			'toCurrency': CurrencyName.INR,
			'rate': 77.91,
		},
		{
			'fromCurrency': CurrencyName.USD,
			'toCurrency': CurrencyName.MXN,
			'rate': 16.18,
		},
		{
			'fromCurrency': CurrencyName.USD,
			'toCurrency': CurrencyName.RUB,
			'rate': 85.28,
		},
	],
	'timeZones': [
		{
			'id': -12,
			'title': 'UTC-12:00 (Baker Island, Howland Island)',
		},
		{
			'id': -11,
			'title': 'UTC-11:00 (American Samoa, Midway Atoll)',
		},
		{
			'id': -10,
			'title': 'UTC-10:00 (Honolulu, Hilo, Adak)',
		},
		{
			'id': -9,
			'title': 'UTC-09:00 (Anchorage, Juneau, Whitehorse)',
		},
		{
			'id': -8,
			'title': 'UTC-08:00 (Los Angeles, San Francisco, Vancouver)',
		},
		{
			'id': -7,
			'title': 'UTC-07:00 (Denver, Phoenix, Calgary)',
		},
		{
			'id': -6,
			'title': 'UTC-06:00 (Mexico City, Guatemala City, Tegucigalpa)',
		},
		{
			'id': -5,
			'title': 'UTC-05:00 (New York, Toronto, Havana)',
		},
		{
			'id': -4,
			'title': 'UTC-04:00 (Caracas, Santo Domingo, Manaus)',
		},
		{
			'id': -3,
			'title': 'UTC-03:00 (Buenos Aires, São Paulo, Montevideo)',
		},
		{
			'id': -2,
			'title': 'UTC-02:00 (Fernando de Noronha, South Georgia and the South Sandwich Islands)',
		},
		{
			'id': -1,
			'title': 'UTC-01:00 (Ponta Delgada, Praia)',
		},
		{
			'id': 0,
			'title': 'UTC+00:00 (London, Dublin, Lisbon)',
		},
		{
			'id': 1,
			'title': 'UTC+01:00 (Paris, Berlin, Rome)',
		},
		{
			'id': 2,
			'title': 'UTC+02:00 (Athens, Istanbul, Jerusalem)',
		},
		{
			'id': 3,
			'title': 'UTC+03:00 (Moscow, Riyadh, Nairobi)',
		},
		{
			'id': 4,
			'title': 'UTC+04:00 (Dubai, Baku, Tbilisi)',
		},
		{
			'id': 5,
			'title': 'UTC+05:00 (Karachi, Tashkent, Yekaterinburg)',
		},
		{
			'id': 6,
			'title': 'UTC+06:00 (Dhaka, Novosibirsk, Almaty)',
		},
		{
			'id': 7,
			'title': 'UTC+07:00 (Bangkok, Jakarta, Hanoi)',
		},
		{
			'id': 8,
			'title': 'UTC+08:00 (Beijing, Hong Kong, Singapore)',
		},
		{
			'id': 9,
			'title': 'UTC+09:00 (Tokyo, Seoul, Yakutsk)',
		},
		{
			'id': 10,
			'title': 'UTC+10:00 (Sydney, Guam, Port Moresby)',
		},
		{
			'id': 11,
			'title': 'UTC+11:00 (Magadan, Solomon Islands, New Caledonia)',
		},
		{
			'id': 12,
			'title': 'UTC+12:00 (Auckland, Fiji, Kamchatka)',
		},
	],
	'minimumPaymentAmount': [
		{
			'currency': CurrencyName.BRL,
			'value': 250,
		},
		{
			'currency': CurrencyName.EUR,
			'value': 50,
		},
		{
			'currency': CurrencyName.INR,
			'value': 500,
		},
		{
			'currency': CurrencyName.MXN,
			'value': 850,
		},
		{
			'currency': CurrencyName.RUB,
			'value': 5000,
		},
		{
			'currency': CurrencyName.USD,
			'value': 50,
		},
	],
	'sspTextFrequency': [
		{
			'value': 5,
			'title': 'Every 5 minutes',
		},
		{
			'value': 15,
			'title': 'Every 15 minutes',
		},
	],
	'devices': [
		{
			'id': 'desktop',
			'title': 'Desktop',
		},
	],
	'widgetFrequencies': [
		{
			'value': 5,
			'title': 'Every 5 minutes',
		},
	],
}
