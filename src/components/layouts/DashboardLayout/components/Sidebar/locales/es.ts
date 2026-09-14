import { default as baseDict } from './en'

const dict: typeof baseDict = {
	navigation: {
		streamer: {
			home: {
				title: 'Inicio',
			},
			dashboard: {
				title: 'Dashboard',
			},
			freemium: {
				title: 'Uplify Link',
			},
			campaigns: {
				title: 'Campañas',
				subitems: {
					live: 'Livestream',
					preroll: 'Preroll',
					extension: 'Extensión',
					special_project: 'Proyectos Especiales',
				},
			},
			wallet: {
				title: 'Billetera',
			},
			widget: {
				title: 'Configuración',
			},
			referrals: {
				title: 'Referencias',
			},
			extension: {
				title: 'Extensión',
			},
			debug: {
				title: 'Debug',
			},
		},
		partner: {
			campaigns: {
				title: 'Campañas',
				subitems: {
					'brand-awareness': 'Patrocinio',
					performance: 'Interactivo',
					preroll: 'Preroll',
					extension: 'Extensión',
					special_project: 'Proyectos Especiales',
				},
			},
			segments: {
				title: 'Audiencia',
			},
			advertisers: {
				title: 'Anunciantes',
			},
			holdings: {
				title: 'Tenencias',
			},
			creators: {
				title: 'Creadores',
			},
			debug: {
				title: 'Debug',
			},
		},
		profile: {
			settings: 'Configuración de la cuenta',
			logout: 'Cerrar sesión',
		},
	},
	links: {
		help: {
			label: 'Ayuda',
			url: 'https://wiki.uplify.app/s/english',
		},
		news: {
			label: '¿Qué hay de nuevo?',
			url: '',
		},
		feedback: {
			label: 'Comentarios',
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
	requestDemo: 'Necesito ayuda',
	socials: {
		title: 'Síguenos',
	},
	intercom: {
		freemium: '¡Hola! Quiero probar Uplify Link',
	},
}

export default dict
