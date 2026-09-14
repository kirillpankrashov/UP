import { default as baseDict } from './en'

const dict: typeof baseDict = {
	wallet: {
		header: {
			title: 'Кошелек',
		},
		tabs: {
			overview: 'Обзор',
			history: 'История выплат',
		},
		balance: {
			heading: 'Ваш доход',
			title: 'Баланс',
			currentBalance: {
				label: 'Текущий баланс',
				popover: 'Сумма подтвержденного дохода',
			},
			minimumPayout: 'Минимальный размер выплаты',
			payoutAmount: 'Сумма для выплаты',
			nearestDatePayout: 'Ближайшая дата выплаты',
			howPayoutsWork: 'Как работают выплаты?',
			referralInfo: 'Поздравляем! Вы получили бонус за регистрацию {sum}. <br/><br/>Обратите внимание, что для сохранения этого бонуса по условиям программы требуют достижения определенного количества просмотров к {date}. <br/><br/>Просмотры: {imps} / {impsTotal}.',
			estimatedEarnings: {
				label: 'Ожидаемый доход за&nbsp;{month}',
				popover: 'Доход будет корректироваться после проверки на&nbsp;возможный фрод',
			},
			auditedEarnings: {
				label: 'Сумма U.Link на проверке',
				popover: 'Сумма, подлежащая проверке',
			},
			cpaOnReview: {
				label: 'Ожидаемые CPA-выплаты',
			},
			nextPayout: 'Сумма к выплате {date}',
		},
		paymentServices: {
			all: {
				title: 'Платежные сервисы',
				loading: 'загрузка',
				active: 'Активно для выплат',
				activate: 'Счёт по-умолчанию',
				learnMore: 'Подробнее про комиссии',
				paypal: 'PayPal',
				wireTransfer: 'Банковский перевод',
				paypalData: 'Подключение PayPal',
				billingsData: 'Привязка счета',
				whyDoWeNeedThisData: 'Зачем нам эти данные?',
				setUp: 'Настроить',
			},
			razorPay: {
				title: 'Платежные сервисы',
				loading: 'загрузка',
				learnMore: 'Подробнее про комиссии',
				setUp: 'Настроить',
				statuses: {
					yourStatus: 'Ваш статус',
					paymentMethod: 'Метод оплаты',
					payable: 'Payable',
					notPayable: 'Not payable',
					notAdd: 'Не добавлен',
				},
				form: {
					title: 'Billings data',
					whyDoWeNeedThisData: 'Why do we need this data?',
				},
			},
			tochkaBank: {
				title: 'Платежные сервисы',
				loading: 'загрузка',
				learnMore: 'Подробнее про комиссии',
				setUp: 'Настроить',
				employment: {
					type: 'Тип занятости',
					physical: 'Физическое лицо',
					physicalShort: 'Физлицо',
					selfEmployed: 'Самозанятый',
					taxHintSelf: 'Из-за изменения в законодательстве РФ для граждан РФ мы будем производить выплаты только на счета самозанятых. \n \n Самозанятые обязаны платить налоги с доходов в размере 6% из суммы вознаграждения. Самозанятый сам выплачивает налог по квитанции от налоговой.',
					taxHintPhysical: 'Физлица обязаны платить налоги с доходов в размере 13% из суммы вознаграждения. Мы сами переведем данную сумму в налоговую.',
					selfRegisterHint: 'Для начала подключите сервис-партнер «WinWork» и обязательно дайте разрешение Uplify на взамодействие с сервисом. \n \n Интеграция с «WinWork» позволяет автоматически производить выплаты, генерировать чеки, расчитывать и выплачивать налог с дохода автора.',
					formHint: 'Перед заполнением данных ниже убедитетесь, что вы предоставили разрешение Uplify на взаимодействие с сервисом «WinWork». Пожалуйста, продублируйте данные в полях ниже для проверки интеграции с сервисом-партнером.',
					status: 'Статус',
					registered: 'Зарегистрирован',
					notRegistered: 'Не зарегистрирован',
					register: 'Подключить',
				},
				statuses: {
					yourStatus: 'Ваш статус',
					paymentMethod: 'Метод оплаты',
					payable: 'Payable',
					notPayable: 'Not payable',
					notAdd: 'Не добавлен',
				},
				form: {
					title: 'Привязка счёта',
					whyDoWeNeedThisData: 'Зачем нам эти данные?',
				},
				paymentStatus: {
					lastTransaction: 'Последний платёж',
					status: {
						inProgress: 'В обработке',
						error: 'Ошибка',
						success: 'Переведено',
					},
					fields: {
						amount: 'Сумма',
						date: 'Дата',
						status: 'Статус',
						methods: 'Способы оплаты',
					},
				},
			},
		},
		analytics: {
			heading: 'Аналитика дохода',
			categories: {
				awareness: 'Спонсорские форматы',
				performance: 'Интерактивные форматы',
				actions: 'Бонус за действия',
				freemium: 'Uplify Link',
				referrals: 'Рефералы',
				youtube_text: 'Youtube Text',
				extension: 'Расширение',
			},
			source: {
				title: 'Источники дохода',
			},
		},
		payoutHistory: {
			title: 'История выплат',
			columns: {
				date: 'Дата',
				amount: 'Сумма',
				service: 'Метод оплаты',
				invoice: 'Инвойс',
			},
			loading: 'загрузка',
			noData: 'Выплат ещё не было.',
		},
		tipaltiAdvice: {
			title: 'Для настройки платежных реквизитов для выплат необходимо иметь {amount} на балансе.',
			description: 'Настройка выплат доступна только тем авторам, которые хотя бы один раз заработали 80% от минимальной выплаты.',
		},
		tochkaAdvice: {
			title: 'Подключите один из сервисов оплаты',
			description: 'Нет подключенных сервисов. Подключите наиболее удобный вам для получения выплат.',
		},
	},
}

export default dict
