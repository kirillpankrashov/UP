import { default as baseDict } from './en'

const dict: typeof baseDict = {
	dashboard: {
		title: 'Dashboard',
		greeting: 'Bienvenido de nuevo, {name} 👋',
		setup: {
			finishYourSetup: 'Finaliza tu configuración',
			stepsLeft: 'paso restante | pasos restantes',
			aboutXMin: 'Acerca de {min} min',
			steps: {
				fillYourProfile: 'Completa tu perfil',
				configureWidget: 'Configura el widget',
				connectChatbot: 'Conecta un chatbot',
				getFirstSponsorship: 'Obtén tu primera patrocinio',
				freemium: 'Gana más con tu comunidad',
				connectExtension: 'Conecta la extensión',
			},
			shareChatbotSetup: 'Por favor, comparte con nosotros tu experiencia sobre la configuración del chatbot.',
			goThroughTheSurvey: 'Completa el formulario',
			guides: {
				fillYourProfile: 'https://www.youtube-nocookie.com/embed/ykLXIguDxeA?rel=0&controls=0&showinfo=0&autoplay=1&modestbranding=1&version=3&hl=en_US&autohide=1',
				configureWidget: 'https://www.youtube-nocookie.com/embed/7yTaaRcvnNQ?rel=0&controls=0&showinfo=0&autoplay=1&modestbranding=1&version=3&hl=en_US&autohide=1',
				connectChatbot: 'https://www.youtube-nocookie.com/embed/TKvlptfQ0ZE?rel=0&controls=0&showinfo=0&autoplay=1&modestbranding=1&version=3&hl=en_US&autohide=1',
				getFirstSponsorship: 'https://help.uplify.app/en/articles/5640840-running-in-stream-campaigns',
				freemium: 'https://fanatical-fly-511.notion.site/Streamer-support-page-6c5d0c3b3e62448e94aa2ce1223e4986',
				connectExtension: 'https://wiki.uplify.app/s/russian/doc/interaktivnoe-rasshirenie-dlya-twitch-z4QKdiHmZM',
			},
			stepByStepGuide: 'Guía paso a paso',
			closeChecklist: 'Cerrar',
		},
		values: {
			estimatedEarnings: 'Ingresos estimados para&nbsp;{month}',
			turnOnUplifyPromo: 'Revisa tu billetera',
			earnedByReferalls: 'Ganado por referidos',
			getReferalLink: 'Obtén el enlace de referencia',
			newCampaignsComingSoon: 'Próximamente nuevas campañas',
			activeCampaignsToday: 'Campaña activa hoy | Campañas activas hoy',
			goToCampaigns: 'Ve a las campañas',
			earnedByFreemium: 'Ganado con Uplify Link',
			freemiumLink: 'Establece una meta',
			cpaEarnings: 'Pagos CPA pendientes',
		},
		resources: {
			discordText: 'Únete a nuestro servidor de Discord y comparte tu experiencia con la comunidad',
			blogText: 'Obtén las últimas actualizaciones y consejos de los streamers en nuestro blog',
			helpCenterText: 'Aprende todo sobre Uplify en nuestro Centro de Ayuda',
		},
		advice: {
			heading: '¿por qué importa?',
			title: 'Consigue desde $100 por mes',
			description: 'Para comenzar a monetizar tu canal y tener acceso a los mejores patrocinadores, necesitas completar ',
			steps: '{n} pasos | {n} paso | {n} pasos',
			descriptionEnd: '¡Vamos a hacerlo!',
		},
		levels: {
			heading: 'Tu crecimiento',
			goals: 'Objetivos de nivel {level}',
			perks: 'Ventajas del nivel {level}',
			lvl: 'LVL',
			days: 'días',
			discord: {
				active: 'Unido',
				notActive: 'Unirse',
			},
			twitch: {
				active: 'Activo',
				notActive: 'Configuración',
			},
			advice: {
				label: 'sobre niveles',
				title: 'Nivelarse para desbloquear más ventajas y funciones',
				description: 'El Programa de Lealtad de Uplify es una serie de objetivos incrementales que puedes esforzarte por lograr mientras transmitas en cualquiera de las plataformas admitidas. A medida que continúes creciendo y ganes nuevos niveles, habrá diferentes características y ventajas que se hagan disponibles para ti.',
				link: {
					text: 'Sobre niveles',
					url: 'https://help.uplify.app/en/articles/6563236-streamer-loyalty-program',
				},
			},
		},
	},
}

export default dict
