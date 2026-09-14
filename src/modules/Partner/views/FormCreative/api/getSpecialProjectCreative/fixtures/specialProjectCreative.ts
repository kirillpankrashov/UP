import { AdFormat, CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import { type ISpecialProjectCreative } from '../types'

export const specialProjectCreative: ISpecialProjectCreative = {
	id: 348,
	adset: {
		id: 369,
		campaign: {
			id: 312,
			slug: 'SP-CMP-1706217507',
			type: CampaignType.SPECIAL_PROJECT,
			title: 'Legal compliance campaign',
			description: 'Campaign for legal compliance testing',
			category: 'Телеком',
			holding: {
				id: 18,
				title: 'Uplify',
				description: '',
				logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
				advertisers: 3,
			},
			advertiser: {
				id: 39,
				title: 'Link strategy',
				description: '',
				wallet: {
					balance: 999995.7,
					currency: {
						code: CurrencyName.RUB,
						enTitle: 'Russian ruble',
						ruTitle: 'Русский рубль',
						flag: CurrencyIcon.RUB,
						visible: true,
						ptTitle: 'Russian ruble',
						esTitle: 'Russian ruble',
					},
					icon: CurrencyIcon.RUB,
				},
				holding: {
					id: 18,
					'title': 'Uplify',
					'description': '',
					'logo': 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
					'advertisers': 3,
				},
			},
			'visible': false,
		},
		'slug': 'SP-GRP-1706361094',
		'format': AdFormat.FULLSCREEN,
		'title': 'Adset for legal compliance',
		'created': '2024-01-22 12:33:35',
		'published': true,
		'visible': false,
	},
	'slug': 'SP-CRV-V-1707179035',
	'title': 'Amet id nobis vero fugit',
	'titleAlternative': '',
	'description': '',
	'attachments': {
		'video': {
			'size': 2298419,
			'path': 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/creatives/caff2676-d73d-4e5c-ac81-d09d7d1b33d7.mp4',
			'basename': 'caff2676-d73d-4e5c-ac81-d09d7d1b33d7.mp4',
			'basedir': 'creatives',
			'properties': {
				'size': 2298419,
				'duration': 15,
				'frames': 25,
				'width': 1920,
				'height': 1080,
				'audio': 'aac',
			},
			'extend': {
				'legal_compliance': {
					'erid': {
						'media': '2VtzqwZ8yu3',
						'text': '2VtzqxFF1mT',
					},
					'marker': {
						'media': '2VtzqwZ8yu3',
						'text': '2VtzqxFF1mT',
					},
				},
				'stream': {
					'bidfloor': 100,
					'bid_cap': 100,
				},
			},
		},
	},
	productUrl: {
		general: 'https://mail.google.com/',
		mobile: 'https://mail.google.com/',
	},
	chatbotText: 'In qui deserunt ex natus amet voluptatibus non laboris dolore at cum reiciendis est el',
	companion: {
		heading: 'done',
		text: 'done',
		cta: 'done',
	},
	qrCode: false,
	scriptCode: '',
	pixelClicks: [
		'Assumenda doloremque',
	],
	pixelClicksScripts: '',
	pixelImpressions: [
		'Et est doloribus ut',
	],
	pixelInspections: [
		'Sed omnis sed porro',
	],
	pixelQuertels25: [],
	pixelQuertels50: [],
	pixelQuertels75: [],
	productUrlAdditionalParams: [],
	legalCompliance: {
		erid: {
			media: '2VtzqwZ8yu3',
			text: '2VtzqxFF1mT',
		},
		marker: {
			media: '2VtzqwZ8yu3',
			text: '2VtzqxFF1mT',
		},
	},
	published: true,
	visible: false,
}
