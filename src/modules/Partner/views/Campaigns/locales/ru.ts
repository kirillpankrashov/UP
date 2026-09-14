import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaigns: {
		header: {
			title: {
				'brand-awareness': 'Спонсорские кампании',
				performance: 'Интерактивные кампании',
				preroll: 'Preroll кампании',
				extension: 'Расширенные кампании',
				specialProject: 'Спецпроекты кампании',
			},
		},
		balance: 'Текущий баланс',
		tabs: {
			'brand-awareness': 'Awareness',
			performance: 'Interactive',
			preroll: 'Preroll',
			extension: 'Расширенные',
			specialProject: 'Спецпроекты',
		},
		types: {
			campaign: 'Кампании',
			group: 'Группы',
			creative: 'Креативы',
		},
		tables: {
			actions: {
				downloadReport: 'Скачать отчет',
				viewReport: 'Смотреть отчёт',
				duplicate: 'Дублировать',
				remove: 'Удалить',
			},
			columns: {
				name: 'Название',
				state: 'Статус',
				disabledStatusReason: {
					closed: 'Обратитесь в поддержку для включения',
					parentIsDisabled: 'Выключен родитель',
				},
				clicks: 'Клики',
				ctr: 'CTR',
				impressions: 'Просмотры',
				reach: 'Охват',
				id: 'ID',
				relatedCampaign: 'Связанная кампания',
				relatedGroup: 'Связанная группа',
				format: 'Формат',
				budget: 'Бюджет',
				budgetUsed: 'Использованный бюджет',
				totalBudget: 'Общий бюджет',
				advertiser: 'Рекламодатель',
				startedAt: 'Дата начала',
				endedAt: 'Дата окончания',
				platform: 'Платформа',
				moderation: 'Модерация',
				moderationStatus: {
					pending: 'В процессе',
					complete: 'Пройдена',
				},
				filterLabel: 'Настройка колонок',
				channels: 'Channels',
				daysRemaining: 'Осталось дней',
				externalId: 'Внешний ID',
				bid_cap: 'Bid cap',
				bid_cpa: 'Bid CPA',
				actions: 'Actions',
			},
			noCampaigns: 'Вы ещё не создали ни одной кампании',
			noGroups: 'Вы ещё не создали ни одной группы',
			noCreatives: 'Вы ещё не создали ни одного креатива',
		},
		newCreative: {
			title: 'Новый креатив',
			description: 'Выберите группу, которой будет принадлежать креатив',
		},
		newGroup: {
			title: 'Новая группа',
			description: 'Выберите кампанию, которой будет принадлежать группа',
		},
		partnerSearchFilter: {
			add: 'Фильтр',
			status: 'Статус',
			platform: 'Платформа',
			advertiser: 'Рекламодатель',
			allAdvertisers: 'Все рекламодатели',
		},
	},
}

export default dict
