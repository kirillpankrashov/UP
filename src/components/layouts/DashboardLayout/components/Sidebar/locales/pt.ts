import { default as baseDict } from './en'

const dict: typeof baseDict = {
	navigation: {
		streamer: {
			home: {
				title: 'Início',
			},
			dashboard: {
				title: 'Dashboard',
			},
			freemium: {
				title: 'Uplify Link',
			},
			campaigns: {
				title: 'Campanhas',
				subitems: {
					live: 'Livestream',
					preroll: 'Preroll',
					extension: 'Extensão',
					special_project: 'Projetos Especiais',
				},
			},
			wallet: {
				title: 'Carteira',
			},
			widget: {
				title: 'Configurações',
			},
			referrals: {
				title: 'Referrals',
			},
			extension: {
				title: 'Extensões',
			},
			debug: {
				title: 'Debug',
			},
		},
		partner: {
			campaigns: {
				title: 'Campanhas',
				subitems: {
					'brand-awareness': 'Patrocínio',
					performance: 'Interativo',
					preroll: 'Preroll',
					extension: 'Extensão',
					special_project: 'Projetos Especiais',
				},
			},
			segments: {
				title: 'Audiência',
			},
			advertisers: {
				title: 'Anunciantes',
			},
			holdings: {
				title: 'Holdings',
			},
			creators: {
				title: 'Criadores',
			},
			debug: {
				title: 'Debug',
			},
		},
		profile: {
			settings: 'Configurações de conta',
			logout: 'Sair',
		},
	},
	links: {
		help: {
			label: 'Ajuda',
			url: 'https://wiki.uplify.app/s/english',
		},
		news: {
			label: 'O que há de novo',
			url: '',
		},
		feedback: {
			label: 'Feedback',
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
	requestDemo: 'Eu preciso de ajuda',
	socials: {
		title: 'Siga-nos',
	},
	intercom: {
		freemium: 'Oi! Quero experimentar o Uplify Link',
	},
}

export default dict
