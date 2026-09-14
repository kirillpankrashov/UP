import { CurrencyIcon, CurrencyName } from '@/core/types'

import type { IAdvertiser } from '../types'

export const advertisers: IAdvertiser[] = [
	{
		'id': 8,
		'title': 'Adrenaline Rush',
		'description': '',
		'wallet': {
			'balance': 0,
			'currency': {
				'code': CurrencyName.USD,
				'enTitle': 'US Dollar',
				'ruTitle': 'Доллар США',
				'flag': CurrencyIcon.USD,
				'visible': true,
				'ptTitle': 'US Dollar',
				'esTitle': 'US Dollar',
			},
			'icon': CurrencyIcon.USD,
		},
		'holding': {
			'id': 6,
			'title': 'PepsiCo',
			'description': '',
			'logo': 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/Adrenaline.png',
			'advertisers': 3,
		},
	},
]
