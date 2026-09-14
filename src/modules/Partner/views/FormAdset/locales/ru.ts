import { default as baseDict } from './en'

const dict: typeof baseDict = {
	adset: {
		defaultName: 'Название группы',
		defaultNameNew: 'Новая группа',
		loading: 'Загрузка группы ..',
		fetchError: {
			title: 'Не удалось загрузить группу',
			description: 'При загрузке данных группы или кампании произошла ошибка. Пожалуйста, попробуйте позже.',
			retry: 'Повторить',
		},
		settings: {
			title: 'Настройка группы',
			description: 'Сгруппируйте ваши кампании по параметрам и выставите таргетинг, чтобы эффективно отcлеживать каждую из них.',
			form: {
				name: {
					title: 'Название группы',
					label: 'Название видно только вам',
					placeholder: 'Группа',
				},
				description: {
					title: 'Описание группы',
					label: 'Описание группы',
					placeholder: 'Опишите группу для автора',
				},
				altName: {
					addBtn: 'Добавить альтернативное название для авторов',
					label: 'Название кампании для авторов',
					placeholder: 'Например, Spring Promo',
				},
				externalId: {
					title: 'External ID',
					placeholder: 'Например, PF-CMP-1661693993',
				},
				platform: {
					title: 'Платформа для размещения',
				},
				format: {
					title: 'Формат',
					moreAbout: 'Подобнее про форматы креативов',
					formats: {
						fullscreen: {
							label: 'Видео на весь экран',
							description: 'Mid-roll размещенный в прямом потоке трансляции на полный экран',
						},
						smallVideo: {
							label: 'Видео в отдельном окне',
							description: 'Mid-roll размещенный в прямом потоке трансляции на 1/4 экрана',
						},
						custom: {
							label: 'Кастомизированное решение',
							description: 'Мультиформатный креатив в прямом потоке трансляции на любой видимой области экрана',
						},
					},
				},
				formatSettings: {
					duration: {
						label: 'Длительность, сек',
						tooltip: 'Время отображения креатива на экране. Для видеокреативов используется длина видео — поле игнорируется. Актуально только для изображений.',
					},
					frequency: {
						label: 'Частота, сек',
						tooltip: 'Интервал, через который креатив будет показан одному зрителю снова. Оставить пустым для постоянного показа',
					},
				},
				schedule: {
					title: 'Расписание',
					startedAtLabel: 'Дата начала',
					endedAtLabel: 'Дата окончания',
				},
				viewTime: {
					label: 'Время показа рекламы',
					from: 'С',
					to: 'До',
				},
				payType: {
					payPerImpression: 'Оплата за просмотры',
					payPerAction: 'Оплата за действие',
				},
				budget: {
					title: 'Бюджет',
					costPerUnitLabel: 'Стоимость спонсорской интерграции за единицу',
					impressionsLabel: 'Количество просмотров',
					totalBudget: 'Общий бюджет',
					costPerActionLabel: 'Cтоимость одного действия',
					budgetLabel: 'Бюджет',
					totalActions: 'Ожидаемое количество действий:',
					bidCap: 'Стоимость одной мили, CPM',
					impressions: 'Количество показов',
					cpc: 'Стоимость клика',
					clicks: 'Количество кликов',
					conversions: 'Количество конверсий',
					margin: 'Маржа Uplify',
					agencyCommission: 'Комиссия агентства',
					cpmPercent: 'Разделение бюджета, CPM',
					cpa: 'Стоимость конверсии',
					creatorsPayout: 'Выплата создателям',
					conversion: 'Количество конверсий',
					infoMessage: 'Только для внутреннего использования',
					dailyClickCap: 'Ежедневный лимит кликов',
					dailyConversionCap: 'Ежедневный лимит конверсии',
					creatorsCPM: 'Оплата создателям за CPM',
					creatorsCPA: 'Оплата создателям за конверсию',
				},
				targets: {
					title: 'Цели',
					ctrLabel: 'Целевой CTR',
					evrLabel: 'Целевой EVR',
					cpaLabel: 'Целевой CPA',
				},
				frequency: {
					title: 'Частота',
					standard: {
						label: 'Стандартная',
						description: 'Стандартная — рекомендуемая частота просмотров с оптимальным охватом: подходит для долгосрочных кампаний.',
					},
					accelerated: {
						label: 'Ускоренная',
						description: 'Ускоренная — частота просмотров с максимальным охватом: подходит для краткосрочных кампаний.',
					},
					customizable: {
						label: 'Настраиваемая',
						description: 'Настраиваемая — частота просмотров с учетом специальных параметров по охвату: подходит для нестандартных кампаний.',
					},
					impressionsCount: 'Количество вставок',
					period: 'Период',
				},
				streamerDayLimit: {
					label: 'Дневной лимит вставок на креатора',
					placeholder: '100',
				},
				status: {
					label: 'Статус',
				},
				timezone: {
					label: 'Часовой пояс',
					placeholder: 'Часовой пояс',
				},
				formSendStatus: {
					updated: 'Группа обновлена',
				},
			},
		},
		alerts: {
			title: 'Алерты',
			description: {
				label: 'Описание алерта',
				placeholder: 'Installs {{current_actions}} / {{target_actions}}.\nInstall Opera GX and win iPhone\n',
			},
		},
		targeting: {
			title: 'Таргетинг по креаторам',
			addition: {
				onlySelected: 'только выбранные',
				exceptSelected: 'все, кроме выбранных',
				excludeSelected: 'Исключить выбранные категории из таргетинга',
			},
			evaluation: {
				label: 'Оценка аудитории',
				description: 'Выберите язык трансляции, чтобы получить предварительную оценку по аудитории.',
				size: 'Размер',
				reach: 'Охват',
				streamersNumber: 'Количество авторов',
				howCalculated: 'Как считаются показатели?',
			},
			form: {
				agencies: {
					label: 'Настройка сети',
					placeholder: 'Выберите агентство',
					warning: {
						title: 'Ваша стоимость для CPM ниже цены сети',
						text: 'Введенное значение для CPM ниже стоимости, которую требует партнерская сеть. Вы&nbsp;сможете сохранить кампанию, но&nbsp;она не&nbsp;будет работать до&nbsp;тех пор, пока не&nbsp;будет исправлена стоимость.',
					},
				},
				streamers: {
					label: 'Выбор авторов',
					placeholder: 'Выберите авторов',
					pricePlaceholder: 'Цена',
					addBtn: 'Добавить',
					nameColumn: 'Автор',
					priceColumn: 'Цена',
				},
				language: {
					label: 'Язык трансляции',
					placeholder: 'Выберите язык',
				},
				countries: {
					label: 'Страны',
					placeholder: 'Выберите страну',
				},
				devices: {
					label: 'Устройства',
					placeholder: 'Выберите устройство',
				},
				gender: {
					label: 'Пол',
					placeholder: 'Выберите пол',
				},
				age: {
					label: 'Возраст авторов',
					fromPlaceholder: 'от',
					toPlaceholder: 'до',
				},
				ageRestrictions: {
					label: 'У автора включены возрастные ограничения (18+)',
				},
				tags: {
					label: 'Теги',
					placeholder: 'Выберите тег',
				},
			},
		},
		targetingAudience: {
			title: 'Таргетинг по аудитории',
		},
		labels: {
			title: 'Маркировка рекламы',
			fields: {
				chatbot: {
					label: 'Chatbot erid ID',
				},
				creative: {
					label: 'Creative erid ID',
				},
			},
		},
		chatBot: {
			title: 'Настройки чат-бота',
			form: {
				productUrl: {
					label: 'Ссылка на продукт',
					placeholder: 'Введите ссылку',
				},
				mobileProductUrl: {
					label: 'Мобильная ссылка на продукт (Deeplink)',
					placeholder: 'Введите ссылку',
				},
				productUrlShort: {
					label: 'Короткая ссылка',
					placeholder: '',
				},
				chatBotText: {
					label: 'Текст для чат-бота',
					placeholder: 'Введите текст',
				},
			},
		},
		creative: {
			title: 'Креатив',
			form: {
				productUrl: {
					label: 'Ссылка на продукт',
					placeholder: 'Введите ссылку',
				},
				mobileProductUrl: {
					label: 'Мобильная ссылка на продукт (Deeplink)',
					placeholder: 'Введите ссылку',
				},
				videoDescriptionText: {
					label: 'Текст описания',
					placeholder: 'Введите текст',
				},
			},
		},
		preview: {
			title: 'Креатив',
			advice: {
				title: 'Требования',
				requirements: 'Разрешение: 1920 x 1080 px.<br/>Формат: MP4<br/>Размер: до {size} МБ',
			},
			errors: {
				unknown: 'Неизвестная ошибка',
			},
		},
		messages: {
			groupUpdatedSuccesfully: 'Группа успешно обновлена',
		},
		analytics: {
			title: 'Pixels',
			pixelClicks: {
				label: 'IMG Conversion Pixel',
				placeholder: 'Введите ссылку',
				addLabel: 'Добавить еще один трекер',
			},
			pixelClicksScripts: {
				label: 'JavaScript Conversion Pixel',
				placeholder: 'Введите код',
			},
			erid: {
				title: 'ERID (только рынок СНГ)',
				label: 'erid ID',
				placeholder: '',
			},
		},
	},
}

export default dict
