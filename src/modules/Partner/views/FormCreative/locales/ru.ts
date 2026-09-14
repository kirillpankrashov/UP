import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creative: {
		defaultName: 'Название креатива',
		defaultNameNew: 'Новый креатив',
		loading: 'Загрузка креатива ..',
		fetchError: {
			title: 'Не удалось загрузить креатив',
			description: 'При загрузке креатива, группы или данных кампании произошла ошибка. Пожалуйста, попробуйте позже.',
			retry: 'Повторить',
		},
		form: {
			status: {
				label: 'Статус',
			},
			name: {
				title: 'Название креатива',
				label: 'Название видно только вам',
				placeholder: 'Введите текст',
			},
			altName: {
				addBtn: 'Добавить альтернативное название для авторов',
				label: 'Название креатива для авторов',
				placeholder: 'Например, Spring Promo',
			},
			adtag: {
				title: 'Google Ad Tag',
				label: '',
				placeholder: '',
			},
			files: {
				title: 'Загрузка файлов',
				preview: 'Загрузка файла превью',
				uploadBtn: 'Загрузить файл',
				formats: {
					video: 'Видео',
					videoOrImage: 'Видео или картинка',
					html5: 'HTML5 элемент',
					banner: 'Вспомогательный баннер',
				},
				requirements: {
					title: 'Технические требования',
					fullscreen: 'Длительность: 15 с<br>Разрешение: 1920 x 1080<br>Формат: H.264 (MP4, webm)<br>Аудио: -9dB<br>Битрейт: 2000 - 5500 kbps<br>Частота кадров: 24 – 30<br>Размер: до {size} МБ',
					leaderboard: 'Длительность: 15 с<br>Разрешение: 1920 x 270<br>Формат: H.264 (MP4, webm)<br>Аудио: отключено<br>Битрейт: 2000 – 5500 kbps<br>Частота кадров: 24 – 30<br>Размер: до {size} МБ',
					pip_video: 'Длительность: 15 с<br>Разрешение: от 550 x 310<br>до 1920 x 1080 пикс.<br>Формат: H.264 (MP4, webm)<br>Аудио: отключено<br>Битрейт: 2000 – 5500 kbps<br>Частота кадров: 24 – 30<br>Размер: до {size} МБ',
					custom: 'Длительность: 15 с<br>Разрешение: 1920 x 1080<br>Формат: PNG, JPG or GIF<br>Third party HTML: HTML5 zip file<br>Аудио: отключено<br>Частота кадров: 24 – 30<br>Размер: до {size} МБ',
					extension: '<strong>Первый файл:</strong><br/>Разрешение: 728 x 90<br/>Формат: PNG, JPG, GIF, MP4, WEBM<br/>Аудио: отключено<br>Размер: до {bannerSize} МБ<br/><br/><strong>Второй файл:</strong><br/>Разрешение: 550 x 310<br>Формат: PNG, JPG, GIF, MP4, WEBM<br>Аудио: отключено<br>Размер: до {unitSize} МБ',
					gallery: '<strong>Картинка:</strong><br/>Разрешение: 230 x 350<br/>Формат: PNG, JPG<br/>Размер: до {imageSize} МБ',
				},
				instructions: {
					dragImage: 'Перетащите сюда картинку',
					dragImageOrVideo: 'Перетащите сюда картинку или видео',
					dragVideo: 'Перетащите сюда видео',
					dragZip: 'Перетащите сюда архив с файлами',
				},
				errors: {
					general: 'Загрузите валидный файл креатива',
				},
			},
			creativeManager: {
				messages: {
					deleted: 'Файл был удален',
				},
				errors: {
					unknown: 'Неизвестная ошибка',
				},
			},
			advice: {
				title: 'Превью креатива',
				description: 'Оцените, как будет выглядеть ваши кампании в месте размещения',
				button: 'Посмотреть превью',
			},
			stylesEditor: {
				button: 'Редактор стилей',
			},
			data: {
				title: 'Данные для креатива',
				fields: {
					erid: {
						title: 'ERID (только рынок СНГ)',
						label: 'erid ID',
						placeholder: '',
					},
					productUrl: {
						label: 'Ссылка на продукт',
						placeholder: 'Введите ссылку',
					},
					mobileProductUrl: {
						label: 'Мобильная ссылка на продукт (Deeplink)',
						placeholder: 'Введите ссылку',
					},
					chatbotText: {
						label: 'Текст для чат-бота',
						placeholder: 'Введите текст',
					},
					companionHeading: {
						label: 'Заголовок сопутствующего баннера',
						placeholder: 'Введите заголовок',
					},
					companionText: {
						label: 'Текст сопутствующего баннера',
						placeholder: 'Введите текст',
					},
					companionCta: {
						label: 'Призыв к действию',
						placeholder: 'Введите текст',
					},
					qrCode: {
						label: 'Сгенерировать QR-код для лайвстрима',
					},
					pixelClicks: {
						label: 'IMG Conversion Pixel',
						placeholder: 'Введите ссылку',
					},
					pixelClicksScripts: {
						label: 'JavaScript Conversion Pixel',
						placeholder: 'Введите код',
					},
					pixelImpressions: {
						label: 'Impression Tag',
						placeholder: 'Введите ссылку',
						addLabel: 'Еще один пиксель',
						alert: 'Поддерживаемые теги: Adriver, Weborama <br/>Параметры: {{viewers}}, {{random}}',
					},
					pixelInspections: {
						label: 'Пиксель для проверки',
						placeholder: 'Введите ссылку',
						addLabel: 'Еще один пиксель',
					},
				},
			},
			pixels: {
				title: 'Pixels',
			},
			labels: {
				title: '<strong>Маркировка рекламы</strong>',
				fields: {
					chatbot: {
						label: 'Chatbot erid ID',
					},
					creative: {
						label: 'Creative erid ID',
					},
				},
			},
			formSendStatus: {
				updated: 'Креатив обновлен',
			},
			preview: {
				label: 'Превью',
			},
			quiz: {
				size: {
					limit: {
						exceeded: 'Размер опроса превышает лимит в 5KB. Пожалуйста, сократите количество вопросов или ответов или переработайте свои стили.',
					},
				},
				settings: {
					title: 'Настройки',
					quizStatus: 'Статус опроса',
					correctAnswersVisible: 'Правильные ответы видимы',
					paginationEnabled: 'Пагинация включена',
					resultsVisible: 'Результаты видимы',
				},
				welcome: {
					title: 'Добро пожаловать',
					text: 'Текст приветствия',
					color: 'Цвет приветствия',
				},
				questions: {
					title: 'Вопросы',
					question: 'Вопрос {index}',
					deleteQuestion: 'Удалить вопрос',
					questionText: 'Текст вопроса',
					questionPlaceholder: 'Введите текст',
					explain: 'Объяснение',
					explainPlaceholder: 'Объяснение правильного ответа',
					answer: 'Ответ {index}',
					deleteAnswer: 'Удалить ответ',
					answerPlaceholder: 'Введите текст ответа {index}',
					correctAnswer: 'Это правильный ответ',
					addAnswer: 'Добавить еще один ответ',
					questionBackground: 'Фон вопроса',
					questionColor: 'Цвет вопроса',
					addQuestion: 'Добавить еще один вопрос',
				},
				result: {
					title: 'Результат',
					text: 'Текст результата',
					placeholder: 'Спасибо за участие!',
					background: 'Фон результата',
					color: 'Цвет результата',
				},
				preview: {
					title: 'Предварительный просмотр',
				},
			},
			gallery: {
				title: 'Галерея',
			},
			panel: {
				banner1: {
					label: 'Баннер 1',
				},
				banner2: {
					label: 'Баннер 2',
				},
			},
		},
	},
}

export default dict
