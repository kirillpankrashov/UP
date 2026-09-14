import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaign: {
		defaultName: 'Название кампании',
		defaultNameNew: 'Новая кампания',
		group: 'Группа',
		loading: 'Загрузка кампании ..',
		fetchError: {
			title: 'Не удалось загрузить кампанию',
			description: 'При загрузке кампании произошла ошибка. Пожалуйста, попробуйте позже.',
			retry: 'Повторить',
		},
		type: {
			title: 'Тип кампании',
			description: 'Выберите тип кампании, соответствующий вашим маркетинговым целям.',
			comingSoon: 'Скоро будет доступно',
		},
		types: {
			awareness: {
				title: 'Sponsorship',
				description: 'Кампании с фиксированной стоимостью по CPM-модели',
			},
			brandLift: {
				title: 'Brand Lift',
				description: 'Исследование, которое позволяет оценить уровень  восприятия бренда или продукта',
			},
			task: {
				title: 'Task',
				description: 'Задание с индивидуальной стоимостью и прямым вовлечением авторов',
			},
			performance: {
				title: 'Interactive',
				description: 'Кампании с оплатой за определенные действия по CPA-модели',
			},
		},
		settings: {
			title: 'Настройки кампании',
			advice: {
				title: 'Что это за данные?',
				name: {
					title: 'Название кампании,',
					description: 'которое будет отображаться у авторов во время трансляции.',
				},
				currency: {
					title: 'Валюта,',
					description: 'в которой будет списываться размещение вашей кампании.',
				},
			},
			form: {
				name: {
					label: 'Название',
					placeholder: 'Например, Spring Promo',
				},
				description: {
					label: 'Описание кампании',
					placeholder: 'Опишите кампанию для авторов',
				},
				externalId: {
					label: 'Внешний ID',
					placeholder: 'Например, PF-CMP-1661693993',
				},
				category: {
					label: 'Категория',
					placeholder: 'Выберите категорию',
					noData: 'Нет категорий',
				},
				currency: {
					label: 'Валюта',
					placeholder: 'Выберите валюту',
				},
				schedule: {
					startedAtLabel: 'Дата начала',
					endedAtLabel: 'Дата окончания',
				},
				holding: {
					label: 'Холдинг рекламодателя',
					placeholder: 'Выберите холдинг',
				},
				advertiser: {
					label: 'Рекламодатель',
					placeholder: 'Выберите рекламодателя',
					noData: 'Нет данных',
				},
				mediaAgency: {
					label: 'Медиа агентство',
					placeholder: 'Выберите медиа агентство',
					noData: 'Нет данных',
				},
				ordMarkup: {
					label: 'ОРД маркировка',
					placeholder: '',
				},
				status: {
					label: 'Статус',
				},
				awareness: {
					description: {
						label: 'Описание кампании',
						placeholder: 'Опишите кампанию для авторов',
					},
				},
				brandlift: {
					description: {
						label: 'Описание',
						placeholder: 'Опишите опрос для авторов',
					},
				},
				timezone: {
					label: 'Часовой пояс',
					placeholder: 'Часовой пояс',
				},
				formSendStatus: {
					updated: 'Кампания обновлен',
				},
			},
		},
		affiliateNetworks: {
			title: 'Партнёрские сети',
			description: 'Интеграция и настройка с внешними партнёрскими сетями.',
			field: {
				label: 'Сеть',
				notSelected: 'Никаких интеграций',
			},
		},
		urlParams: {
			title: 'Конструктор GET параметров',
			description: 'Дополнительные параметры для URL-адреса, которые позволяют  отслеживать эффективность кампаний.',
			field: {
				paramBlock: 'Параметр',
				param: 'Параметр',
				name: 'Значение',
				addParam: 'Добавить ещё один параметр',
				deleteParam: 'Удалить параметр',
			},
		},
		pixel: {
			title: 'Uplify Pixel',
			description: 'Uplify Pixel помогает отслеживать действия пользователей на сайте рекламодателя, чтобы показывать рекламу эффективно.',
			field: {
				label: 'Uplify Pixel',
				btn: 'Копировать pixel ссылку',
			},
		},
	},
}

export default dict
