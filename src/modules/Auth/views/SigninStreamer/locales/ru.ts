import { default as baseDict } from './en'

const dict: typeof baseDict = {
	signinStreamer: {
		title: 'Привет! 👋',
		subtitle: 'Войдите в свой аккаунт, используя одну из учетных записей',
		startWithTwitch: 'Начать с помощью Twitch',
		startWithYoutube: 'Начать с помощью YouTube',
		startWithTrovo: 'Начать с помощью Trovo',
		partnerLogin: 'Вход для партнеров',
		termsAndPolicy: 'Выполняя вход, вы принимаете условия <a href="https://www.uplify.app/legal/terms-ru" target="_blank">Оферты</a>, <a href="https://www.uplify.app/legal/link-terms-ru" target="_blank">Оферты Link</a>  и <a href="https://www.uplify.app/legal/privacy-policy-ru" target="_blank">Политики Конфиденциальности</a>.',
		tryDemo: 'Try demo account',
		info: {
			block1: {
				title: 'Uplify помогает авторам монетизировать любой произведенный видео-контент.',
				linkText: 'Узнай больше об Uplify',
				linkHref: 'https://www.uplify.ru/sozdatelyam-kontenta',
				videoHref: 'https://youtu.be/RSXTmPTBehU?si=7fkCpRfuTQJnqqXr',
			},
			block2: {
				title: 'Нам доверяют более <strong>4,000&nbsp;авторов</strong>. Мы&nbsp;выплатили более <strong>100&nbsp;000&nbsp;000 рублей</strong>.',
				linkText: 'Присоединяйся к нам в Telegram',
				linkHref: 'https://t.me/UplifyNews',
			},
			block3: {
				title: '<strong>Спонсорские кампании</strong> от&nbsp;всемирно известных брендов.',
				linkText: 'Смотри наши кейсы',
				linkHref: 'https://www.uplify.ru/cases?utm_source=uplify_ru&utm_medium=button_cases&utm_campaign=website',
			},
		},
		errors: {
			demoSignin: 'Ошибка при входе с помощью демо-акканута',
		},
	},
}

export default dict
