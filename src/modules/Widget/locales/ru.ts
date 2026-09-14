import { default as baseDict } from './en'

const dict: typeof baseDict = {
	widget: {
		adForSupport: 'Промокампания от',
		willStartIn: 'начнется через',
		poweredBy: 'Работает на Uplify',
		of: 'из',
		reloginMessage: {
			title: '{platform} обновился!',
			description: 'Ваша версия виджета устарела. Пожалуйста, выйдите и войдите заново в личный кабинет.',
			streamer: {
				label: 'Внимание',
				title: '{platform} обновился!',
				description: 'Ваша версия виджета устарела. Пожалуйста, выйдите и войдите заново в личный кабинет.',
				button: 'Перелогиниться',
			},
		},
		chatbotErrorMessage: {
			title: 'Чат-бот не работает',
			description: 'Пожалуйста, переподключите бота в&nbsp;личном кабинете. Пошаговая инструкция: i.uplify.tech/chatbot',
		},
		resolutionErrorMessage: {
			title: 'Виджет настроен неправильно',
			description: 'Пожалуйста, настройте виджет по&nbsp;инструкции: <span>i.uplify.tech/widget</span>',
		},
		tooManySubscribers: {
			title: 'Виджет заблокирован',
			description: 'Пожалуйста, удалите все копии виджета и обновите слой.',
		},
		platformDisclaimer: 'не спонсирует и не поддерживает эту промокампанию и не несет за нее ответственности.',
		platformDisclaimerYoutube: 'Это промо размещено автором независимо от YouTube.',
		freemium: {
			timeLeft: 'осталось минут: {time}',
			votesLeft: 'Голоса - осталось: {num}',
			pollWinner: 'Победитель',
			goalQrTitle: 'Поддержите меня',
			goalTopSuppoerters: {
				day: 'Топ за сегодня',
				week: 'Топ за неделю',
				quarter: 'Топ за все время',
				alltime: 'Топ за все время',
			},
			supporterWatcherSponsorVideo: 'посмотрел спонсорское видео',
			anonymous: 'Кто-то',
			supportedYou: 'поддержал тебя',
			chatbotMsgs: [
				'Поддержи меня просмотром рекламы {link}',
				'Тут изобрели донаты без денег {link}',
				'Теперь поддержать мой стрим просто: переходи по ссылке и посмотри рекламу {link}',
				'Донейшены, чаевые и пожертвования принимаются тут. Карточка не нужна {link}',
				'Поддержи меня еще, даже если уже переходил по ссылке {link}',
				'Карты банков не нужны, когда донаты бесплатные {link}',
				'Каждый переход по этой ссылке — ваша поддержка моего стрима {link}',
				'Донаты без SMS и регистраций — {link}',
			],
		},
	},
}

export default dict
