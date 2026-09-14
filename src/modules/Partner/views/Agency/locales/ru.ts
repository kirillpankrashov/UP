import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creators: {
		header: {
			title: 'Креаторы',
		},
		tabs: {
			overview: 'Обзор',
			history: 'История транзакций',
			campaignsActive: 'Кампании',
			campaignsClosed: 'Завершенные',
			creators: 'Авторы',
			billing: 'Выставление счетов',
		},
		invite: {
			title: 'Пригласить авторов',
			invited: 'Приглашенные авторы',
			amount: 'Сумма для вывода',
			link: 'Пригласительная ссылка',
			advice: {
				title: 'Получите долю дохода',
				description: 'Получайте долю дохода от ваших авторов, которых вы пригласили, пока они активны на Uplify.',
				link: {
					url: '/',
					label: 'Как это работает',
				},
			},
		},
		creatorsList: 'Список авторов',
		billing: {
			companyInformation: {
				title: 'Информация о компании',
				name: {
					label: 'Имя',
					placeholder: 'Название компании',
				},
				email: {
					label: 'Электронная почта',
					placeholder: 'email@email.com',
				},
				address: {
					label: 'Адрес',
					placeholder: 'Адрес компании',
				},
				phone: {
					label: 'Телефон',
					placeholder: '+1 (123) 456 789',
				},
			},
			paymentDetails: {
				title: 'Детали оплаты',
				bankName: {
					label: 'Название банка',
					placeholder: '',
				},
				bankAccountName: {
					label: 'Название банковского счета',
					placeholder: '',
				},
				bankAccountHolderAddress: {
					label: 'Адрес владельца банковского счета',
					placeholder: '',
				},
				bankAddress: {
					label: 'Адрес банка',
					placeholder: '',
				},
				bankAccountNumber: {
					label: 'Номер банковского счета',
					placeholder: '',
				},
				BIC: {
					label: 'БИК/SWIFT-код',
					placeholder: '',
				},
				routingNumber: {
					label: 'Маршрутный номер',
					placeholder: '',
				},
			},
			invoices: {
				title: 'Счета-фактуры',
				date: 'Дата',
				amount: 'Количество',
				invoice: 'Счет',
			},
		},
		history: {
			title: 'История транзакций',
			payments: 'Транзакции за все время',
			none: 'Транзакций не было',
			columns: {
				date: 'Дата',
				payment: 'Payment per day',
				details: 'Детали',
			},
			detailed: {
				title: 'Детали транзакции',
				description: 'Список авторов, которые принесли деньги в этот день.',
			},
		},
		list: {
			title: 'Список авторов',
			description: 'Список авторов, которых вы пригласили. Платежи за все время ',
			none: 'Авторов нет',
			columns: {
				creator: 'Автор',
				lastActivity: 'Последний день активности',
				earnings: 'Заработок',
			},
		},
		creatorsPayout: {
			title: 'Выплаты авторам',
			description: 'Пожалуйста, введите сумму, которую ваши авторы будут получать, размещая ваши кампании. Укажите цену за тысячу просмотров (CPM).',
			link: {
				text: 'Подробнее о форматах креативов',
				href: 'https://help.uplify.app/en/articles/5640856-in-stream-campaign-formats',
			},
			thirdParty: {
				checkbox: 'Разрешить сторонним партнерам размещать кампании',
				popover: {
					label: 'Подсказка',
					text: 'Введите базовую сумму, включающую комиссию и выплаты авторам. Укажите стоимость тысячи просмотров (CPM).',
				},
			},
			comission: {
				label: 'Комиссия',
				popover: {
					label: 'Подсказка',
					text: 'Используется для кампаний с индивидуальными договоренностями со спонсорами или если не установлены выплаты авторам.',
				},
			},
			darkMarket: {
				checkbox: 'Включить повышенную ставку для сегмента дарк-маркет',
				popover: {
					label: 'Подсказка',
					text: 'Введите базовую сумму для сегмента дарк-маркет (гемблинг, казино, криптовалюта и т.д.) Укажите стоимость за тысячу просмотров (CPM).',
				},
			},
			cpaLabel: 'Выплаты авторам',
			darkMarketLabel: 'Цены сторонних партнеров (вкл. комиссию)',
			fields: {
				video: 'Оверлей 50%',
				custom: 'Кастом',
				pip_video: 'Оверлей 15%',
				interactive: 'Интерактив',
				preroll: 'Pre-Roll',
				cpa: 'CPA cost',
				cpc: 'CPC cost',
			},
		},
		creatorsTable: {
			columns: {
				creators: 'Автор',
				lastActivity: 'Последняя активность',
				balance: 'Баланс',
				campaign: 'Кампании',
			},
			status: {
				checkList: {
					label: 'Онбординг',
					text: 'Автор еще не завершил процесс онбординга.',
				},
				payable: {
					label: 'Проверьте настройки выплат',
					text: 'Автор еще не настроил данные для выплат.',
				},
				lowCtr: {
					label: 'Низкий CTR',
					text: 'Проблемы с CTR в кампаниях.',
				},
			},
			none: 'Нет данных',
		},
		settings: {
			title: 'Настройки',
			custom: {
				headline: 'Персональные выплаты',
				descr: 'Пожалуйста, введите сумму, которую {streamer} должен получить при размещении спонсорства. Укажите стоимость тысячи просмотров (CPM).',
			},
			darkMarket: {
				headline: 'Ставки для сегмента дарк-маркет',
			},
			cpaLabel: 'Выплаты автору',
			darkMarketLabel: 'Цены сторонних партнеров (вкл. комиссию)',
			fields: {
				video: 'Оверлей 50%',
				custom: 'Кастом',
				pip: 'Оверлей 15%',
				interactive: 'Интерактив',
			},
		},
		stats: {
			columns: {
				campaign: 'Кампания',
				creator: 'Автор',
				income: 'Доход',
				views: 'Просмотры',
				avgCtr: 'Ср. CTR',
				ctr: 'CTR',
				status: 'Статус',
			},
			none: 'Нет данных',
		},
		campaignCreators: {
			title: 'Отчет по кампании: {title}',
		},
		creatorCampaigns: {
			title: 'Кампании {streamer}',
		},
		categoriesStopList: {
			title: 'Стоп-лист категорий',
			description: 'Кампании из выбранных категорий будут автоматически отключены для просмотра вашими авторами.',
		},
		campaigns: {
			active: {
				title: 'Активные кампании',
				description: 'Список кампаний, доступных вашим авторам',
			},
			closed: {
				title: 'Завершенные камании',
				description: 'Список завершенных кампаний',
			},
			reportBtn: {
				full: 'Отчет о кампании',
				short: 'Отчет',
			},
			none: 'Спонсорские кампании скоро появятся',
		},
		campaignRow: {
			of: 'из',
			dailyActions: 'Дневных действий',
			dailyLimit: 'Показов на сегодня',
			dailyActionsLimit: 'Действий на сегодня',
			dailyActionsLimitLabel: 'Общее количество доступных действий для всего сообщества',
			dailyImpressions: 'Дневных просмотров',
			potentialIncome: 'Потенциальный доход',
			yourIncome: 'Твой доход',
			yourCTR: 'Твой CTR',
			averageCTR: 'Средний CTR',
			dateStart: 'Дата начала',
			dateEnd: 'Дата окончания',
			enable: 'Включить',
			disable: 'Выключить',
			attended: 'Участвовало',
			toggling: 'Отправка..',
			tags: {
				undefinedFormat: 'Неизвестный формат',
				dailyLimitDepleted: 'Сегодня лимит исчерпан',
				totalLimitDepleted: 'Сегодня лимит исчерпан',
				setupExtension: 'Настроить расширение',
				checkExtension: 'Проверить статус расширения',
				extension: 'Расширение',
				actionBonus: 'Бонус за действия',
				dailyActionsLimitDepleted: 'Лимит действий исчерпан',
				performanceDailyDepleted: 'Сегодня лимит исчерпан',
			},
			disabledUntil: 'Недоступна до: {date}',
			reasons: {
				lowCTR: '🔥 Причина: низкий CTR',
				lowCTRLink: {
					text: 'Как улучшить мой CTR?',
					href: 'https://www.notion.so/CTR-1-eb41fe74e1f54f8b8ca46e03eedcb22b',
				},
				moderator: 'Причина: решение модератора',
			},
			format: {
				fullscreen: 'Overlay 50%',
				pip: 'Overlay 15%',
			},
			totalImpressions: 'Доступных просмотров',
		},
		campaignSidebar: {
			potentialRevenue: 'Потенциальный доход',
			totalRevenue: 'Твой общий доход',
			revenue: 'Твой доход',
			estimatedRevenue: 'Ожидаемый доход',
			ctr: 'Твой CTR',
			target_ctr: 'Целевой CTR',
			evr: 'Качество конверсий',
			clicks: 'Количество кликов',
			date: 'Дней осталось',
			dateStart: 'Дата начала',
			dateEnd: 'Дата окончания',
			paymentType: 'Тип оплаты',
			pricePerViews: 'Цена за 1000 просмотров',
			pricePerAction: 'Цена за 1 действие',
			pricePerClick: 'Цена за 1 клик',
			frequency: 'Частота просмотров',
			adFormat: 'Формат кампании',
			advertiserCategory: 'Категория рекламодателя',
			description: 'Описание кампании',
			creativePreview: 'Превью креатива',
			messageInDescription: 'Сообщение в описании',
			chatMessage: 'Сообщение в чат-бот',
			campaignOn: 'Кампания включена',
			campaignOff: 'Кампания выключена',
			productLink: 'Ссылка на продукт',
			copyProductLink: 'Копировать вашу ссылку на продукт',
			deliveredAtions: 'Выполненные действия',
			deliveredImpressions: 'Кол-во просмотров',
			deliveredDailyActions: 'Выполненные действия',
			deliveredClicks: 'Клики по ссылке',
			downloadCreative: 'Скачать креатив',
			copyDescription: 'Копировать описание',
			videos: 'Ссылка на видео',
			addNewVideo: 'Добавить ещё одно видео',
			howToIncreaseCtr: 'Как повысить CTR?',
			howToIncreaseEvr: 'Как повысить EVR?',
			evrList: 'EVR события',
			scale: {
				poor: 'Плохо',
				fair: 'Слабо',
				good: 'Хорошо',
				veryGood: 'Очень хорошо',
				excellent: 'Отлично',
			},
		},
	},
}

export default dict
