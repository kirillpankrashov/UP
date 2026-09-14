import { default as baseDict } from './en'

const dict: typeof baseDict = {
	panel: {
		tabs: {
			widget: 'Настройки',
			campaigns: 'Кампании',
		},
		states: {
			title: 'Состояние модулей',
		},
		statuses: {
			chatbot: 'Чат-бот',
			extension: 'Виджет',
			stream: 'Стрим',
		},
		params: {
			title: 'Параметры показа кампаний',
			previewCaption: 'Показать превью',
			locationCaption: 'Позиция на стриме',
		},
		campaigns: {
			title: 'Доступные кампании',
			none: 'Нет доступных кампаний',
			comeBack: 'Сегодня все кампании закончились.<br>Приходи завтра!',
		},
		error: {
			title: 'Ссылка устарела',
			text: 'Перейдите в личный кабинет за новой ссылкой',
		},
		statusesMustBeOn: 'Для запуска кампаний, все модули должны быть активными',
		logger: {
			copy: 'Копировать лог',
			copied: 'Лог скопирован!',
		},
		settings: {
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
		},
	},
}

export default dict
