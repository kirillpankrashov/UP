import { default as baseDict } from './en'

const dict: typeof baseDict = {
	advertisers: {
		header: {
			title: 'Рекламодатели',
		},
		tabs: {
			advertisers: 'Рекламодатели',
			holdings: 'Холдинги',
		},
		advertisers: {
			table: {
				advertiser: 'Рекламодатели',
				currency: 'Валюта',
				balance: 'Баланс',
				links: 'Ссылки (Спонсорство)',
			},
			links: {
				campaigns: 'Кампании',
				groups: 'Группы',
				creatives: 'Креативы',
				holdings: 'Холдинги',
			},
		},
		holdings: {
			table: {
				holding: 'Название холдинга',
				description: 'Описание',
			},
		},
	},
}

export default dict
