import { default as baseDict } from './en'

const dict: typeof baseDict = {
	settings: {
		header: {
			title: 'Настройки',
			widget: 'Виджет',
			chatbot: 'Чат-бот',
			extension: 'Расширение',
			stream: 'Трансляция',
			disabled: 'OFF',
			enabled: 'ON',
		},
		widgetPlatform: {
			title: 'Платформа для монетизации',
			description: 'Выбери платформу, где Uplify будет показывать кампании, собирать статистику и платить за показы. Выбор платформы влияет на доступные кампании и модули виджета.',
		},
		widgetLink: {
			title: 'Ссылка для виджета',
			description: 'Единая ссылка для отображения спонсорских кампаний через OBS или другие программы для трансляций.',
			optionDrag: {
				label: 'Вариант 1. Перетащите в OBS',
				helpWithSetup: 'Руководство по настройке',
				warn: 'Перетаскивание в OBS не будет работать, если OBS работает от имени администратора.',
				btn: 'Перетащите в OBS',
			},
			optionLink: {
				label: 'Вариант 2: Настройка виджета с нуля',
				helpWithSetup: 'Руководство по настройке',
				warn: 'Убедитесь, что виджет установлен на всю видимую область в вашей программе для трансляций и находится на верхнем слое. Следуйте руководству.',
			},
			optionWithSocket: {
				label: 'Вариант 3: Автоматическая настройка через WebSocket OBS',
				helpWithSetup: 'Руководство по настройке',
				obsSocketPassPlaceholder: 'Пароль WebSocket для OBS',
				obsSocketPortPlaceholder: 'Порт WebSocket для OBS',
				warn: 'Убедитесь, что ваша версия OBS 28.0.0 и выше. Для корректной работы версия WebSocket должна быть 5.0.0 и выше.',
			},
			preview: 'Отобразите тестовую анимацию в программе для трансляций.',
		},
		widgetDelay: {
			title: 'Задержка трансляции',
			new: 'new',
			description: 'Установите время задержки трансляции для корректной работы сервиса и уведомлений чат-бота.',
			howItWorks: 'Как это работает',
			fieldLabel: 'Время задержки (от 0 до 1800 с)',
		},
		chatbot: {
			title: 'Настройка чат-бота',
			description: 'Чат-бот используется для отправки рекламных сообщений и проведения опросов. Настройка является обязательной.',
			surveyDescription: 'Проблема с настройкой Nightbot или конфликт с&nbsp;другим чат-ботом?',
			wantAnotherChatbot: 'Хочу использовать другой чат-бот',
			shareChatbotSetup: 'Пожалуйста, поделитесь с нами своим опытом по настройке чатбота.',
			goThroughTheSurvey: 'Пройти опрос',
			helpWithSetup: 'Помощь в настройке',
			connectNightbot: 'Подключить Nightbot',
			disconnectNightbot: 'Отключить Nightbot',
			checkChatbot: 'Проверить чат-бота',
			sendMessage: 'Отправить сообщение',
			messageSent: 'Сообщение отправлено',
			error: 'Перед подключением бота, <a href="https://nightbot.tv/dashboard" target="_blank">перейди на&nbsp;сайт nighbot</a> и&nbsp;заверши игровую сессию.',
		},
		advertSettings: {
			title: 'Параметры показа кампаний',
			description: 'Выбор желаемой частоты и режима показа спонсорских блоков.',
			moreAboutFormats: 'Подробнее про форматы кампаний',
			bannerTimeout: 'Частота',
			adPlaybackMode: 'Режим показа',
			playbackModeManual: 'Ручной',
			playbackModeAuto: 'Авто',
			manualPlaybackTitle: 'Запуск кампаний',
			pictureInPicturePosition: 'Расположение видео «Картинка в картинке»',
			leaderboardPosition: 'Расположение широкого баннера',
			adsBlocksCountTitle: 'Количество спонсорских блоков',
			adsBlocksCountDuration: 'Длительность: {seconds} сек',
			advice: {
				title: 'Ручной запуск кампаний',
				firstString: 'Запустить кампанию вручную можно, когда виджет и чат-бот активны.',
				secondString: 'Как только кампании будут доступны, кнопка разблокируется.',
			},
		},
		panel: {
			title: 'Панель управления',
			mobileVersion: {
				title: 'Мобильная версия',
				description: 'Отсканируйте QR-код, чтобы открыть настройки показа кампаний на телефоне. Никому не показываейте этот код.',
			},
			obsVersion: {
				title: 'Версия для OBS',
				description: 'Панель управления можно добавить в OBS. Скопируйте ссылку и вставьте в разделе Вид → Док-панели → Пользовательские доки браузера. Никому не показывайте эту ссылку.',
			},
		},
		ignoreCategories: {
			title: 'Категории для игнорирования',
			description: 'Кампании из выбранных категорий будут автоматически выключены для показа в разделе Кампании.',
		},
		attention: {
			title: 'Настройка виджета и чат-бота',
			widgetDisabled: {
				title: 'Виджет отключен',
				reasons: {
					title: 'Возможны следующие причины:',
					broadcast: 'Выключена программа для трансляций.',
					notSetUp: 'Виджет не настроен в программе для трансляций.',
				},
			},
			chatbotDisabled: {
				title: 'Чат-бот отключен',
				reasons: {
					toBeConnected: 'Требуется подключить чат-бота для канала.',
					addChatbotAsModerator: 'Необходимо добавить чат-бота в качестве модератора',
				},
			},
		},
		twitchExtension: {
			title: 'Twitch расширение',
			description: 'Настройте расширение для Twitch, чтобы получить доступ к специальным спонсорским кампаниям.',
			status: 'Статус расширения',
			btns: {
				setup: 'Настроить расширение',
				check: 'Проверить статус',
			},
		},
		ssp: {
			title: 'Партнерские кампании',
			description: 'Управление внешними спонсорскими кампаниями от Partners Uplify.',
			moreAbout: {
				text: 'Узнать больше Partners campaigns',
				link: '',
			},
			instream: {
				title: 'InStream кампании',
				label: 'Включить in-stream кампании',
				hint: 'Включите интеграцию с внешней партнерской сетью, система будет автоматически запрашивать внешние интеграции и стремиться заполнить все доступные слоты в виджете.',
			},
			text: {
				title: 'Спонсорские сообщения в чат',
				label: 'Включить спонсорские сообщения в чат',
				hint: 'Включите интеграцию с внешней партнерской сетью, система будет автоматически отправлять спонсорское сообщение в чат каждые 10 минут.',
				frequency: {
					label: 'Сонсорские сообщения каждые 15 минут',
					options: {
						every15min: 'Раз в 15 минут',
						every30min: 'Раз в 30 минут',
					},
				},
			},
			advice: {
				title: 'Интеграция внешних партнерских сетей',
				lines: 'Наш сервис предоставляет доступ к&nbsp;спонсорским кампаниям от&nbsp;Uplify. Кроме того, вы&nbsp;можете увеличить свой доход, разрешив другим партнерским сетям размещать свои кампании вместе с&nbsp;Uplify в&nbsp;вашем контенте и&nbsp;чате через спонсорские сообщения.',
			},
		},
		adultOnly: {
			title: 'Возрастные ограничения',
			description: 'Разрешить интеграцию рекламных кампаний, которые имеют возрастные ограничения в рамках местных законов. Например, трейлеры боевиков, энергетические напитки и другие виды продуктов, предназначенные только для взрослых.',
			label: 'Разрешить взрослые кампании',
			hint: 'Allow in-stream кампании',
		},
		youtubeText: {
			title: 'YouTube Text',
			description: 'Manage YouTube text sponsored messages.',
			link: {
				text: 'Learn more about YouTube text campaigns',
				href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
			allow: {
				label: 'Allow YouTube description ads',
			},
			blacklist: {
				label: 'Videos to ignore',
				hint: 'Videos to ignore',
				errors: {
					invalidLink: 'Одна или несколько ссылок невалидны',
					notYoutube: 'Одна или несколько ссылок не являются youtube-ссылками',
				},
			},
		},
	},
}

export default dict
