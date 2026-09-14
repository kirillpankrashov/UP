import { default as baseDict } from './en'

const dict: typeof baseDict = {
	navigation: {
		streamer: {
			home: {
				title: 'Главная',
			},
			dashboard: {
				title: 'Дэшборд',
			},
			freemium: {
				title: 'Uplify Link',
			},
			campaigns: {
				title: 'Кампании',
				subitems: {
					live: 'Livestream',
					preroll: 'Preroll',
					extension: 'Расширение',
					special_project: 'Спецпроекты',
				},
			},
			wallet: {
				title: 'Кошелек',
			},
			widget: {
				title: 'Настройки',
			},
			referrals: {
				title: 'Рефералы',
			},
			extension: {
				title: 'Расширение',
			},
			debug: {
				title: 'Debug',
			},
		},
		partner: {
			campaigns: {
				title: 'Кампании',
				subitems: {
					'brand-awareness': 'Спонсорство',
					performance: 'Интерактив',
					preroll: 'Преролл',
					extension: 'Расширение',
					special_project: 'Спецпроекты',
				},
			},
			segments: {
				title: 'Аудитория',
			},
			advertisers: {
				title: 'Рекламодатели',
			},
			holdings: {
				title: 'Холдинги',
			},
			creators: {
				title: 'Креаторы',
			},
			debug: {
				title: 'Debug',
			},
		},
		profile: {
			settings: 'Настройки профиля',
			logout: 'Выход из Uplify',
		},
	},
	links: {
		help: {
			label: 'Помощь',
			url: 'https://wiki.uplify.app/s/russian',
		},
		news: {
			label: 'Что нового',
			url: '',
		},
		feedback: {
			label: 'Обратная связь',
			url: 'https://discord.com/channels/465868803268542475/1118478966467080283',
		},
		discord: {
			label: 'Discord',
			url: 'https://discord.gg/EntbmDUxaZ',
		},
		facebook: {
			label: 'Facebook',
			url: 'https://www.facebook.com/TryUplify',
		},
		twitter: {
			label: 'Twitter',
			url: 'https://twitter.com/TryUplify',
		},
		telegram: {
			label: 'Telegram',
			url: 'https://t.me/UplifyNews',
		},
		youtube: {
			label: 'YouTube',
			url: 'https://www.youtube.com/{\'@\'}uplify3289',
		},
		vk: {
			label: 'VK',
			url: 'https://vk.com/uplify',
		},
	},
	requestDemo: 'Мне нужна помощь',
	socials: {
		title: 'Мы в соцсетях',
	},
	intercom: {
		freemium: 'Привет! Я хочу попробовать Uplify Link',
	},
}

export default dict
