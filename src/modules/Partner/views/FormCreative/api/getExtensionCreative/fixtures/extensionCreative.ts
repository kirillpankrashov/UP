import { AdFormat, CampaignType, CurrencyIcon, CurrencyName } from '@/core/types'

import { type IExtensionCreative } from '../types'

export const extensionCreative: IExtensionCreative = {
	id: 348,
	adset: {
		id: 369,
		campaign: {
			id: 312,
			slug: 'EXT-CMP-1706217507',
			type: CampaignType.EXTENSION,
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
		'slug': 'EXT-GRP-1706361094',
		'format': AdFormat.FULLSCREEN,
		'title': 'Adset for legal compliance',
		'created': '2024-01-22 12:33:35',
		'published': true,
		'visible': false,
	},
	'slug': 'EXT-CRV-V-1707179035',
	'title': 'Amet id nobis vero fugit',
	'description': '',
	'attachments': {
		'quiz': {
			'id': '1',
			'providerId': '1',
			'quizStatus': true,
			'welcomeText': 'Первый опрос',
			'welcomeBlob': 'extensions/794113257/1752681174005-1221612.jpg',
			'welcomeColor': '#b609d4',
			'resultText': 'Ваш результат',
			'resultBlob': 'extensions/794113257/1752681225766-1221612.jpg',
			'resultColor': '#29e12c',
			'questions': [
				{
					'id': 1,
					'quizId': '1',
					'questionText': 'Первый вопрос',
					'description': 'Пример вопроса',
					'questionBlob': 'extensions/794113257/1752843828613-red_moon.jpg',
					'questionColor': '#50af4d',
					'answers': [
						{
							'id': 1,
							'questionId': 1,
							'answerText': 'Правильный вариант ответа',
							'isCorrect': true,
						},
						{
							'id': 2,
							'questionId': 1,
							'answerText': 'Неправильный вариант ответа',
							'isCorrect': false,
						},
					],
				},
				{
					'id': 2,
					'quizId': '1',
					'questionText': 'Второй вопрос',
					'description': 'Ещё один пример вопроса',
					'questionBlob': 'extensions/794113257/1752843890917-1221612.jpg',
					'questionColor': '#1248b3',
					'answers': [
						{
							'id': 1,
							'questionId': 2,
							'answerText': 'Неправильный вариант ответа',
							'isCorrect': false,
						},
						{
							'id': 2,
							'questionId': 2,
							'answerText': 'Правильный вариант ответа',
							'isCorrect': true,
						},
					],
				},
			],
			'correctAnswersVisible': true,
			'paginationEnabled': true,
			'resultsVisible': true,
			'styles': '',
		},
		'panel': undefined,
	},
	productUrl: {
		general: 'https://mail.google.com/',
		mobile: 'https://mail.google.com/',
	},
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
	preview: null,
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
