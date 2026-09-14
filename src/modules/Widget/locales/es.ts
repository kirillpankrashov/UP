import { default as baseDict } from './en'

const dict: typeof baseDict = {
	widget: {
		adForSupport: 'Promoción por',
		willStartIn: 'comenzará en',
		poweredBy: 'Potenciado por Uplify',
		of: 'de',
		reloginMessage: {
			title: '¡Atención, {plataforma} actualizada!',
			description: 'Versión del widget está desactualizada. Por favor, cierre sesión y vuelva a iniciar sesión en el panel.',
			streamer: {
				label: 'Atención',
				title: '¡{platform} actualizado!',
				description: 'Versión del widget está desactualizada. Por favor, cierra sesión e inicia sesión en el panel.',
				button: 'Vuelve a iniciar sesión en el panel',
			},
		},
		chatbotErrorMessage: {
			title: 'El chatbot no está funcionando',
			description: 'Por favor reconecta el bot en tu cuenta personal. Instrucción paso a paso: i.uplify.tech/chatbot',
		},
		resolutionErrorMessage: {
			title: 'Widget configurado incorrectamente',
			description: 'Por favor configura el widget siguiendo la guía paso a paso: <span>i.uplify.tech/widget</span>',
		},
		tooManySubscribers: {
			title: 'El widget ha sido bloqueado',
			description: 'Elimine todas las copias del widget y actualice la capa.',
		},
		platformDisclaimer: 'no patrocina ni respalda esta promoción y no es responsable de esto.',
		platformDisclaimerYoutube: 'Esta promoción es organizada por el creador, de forma independiente de YouTube.',
		freemium: {
			timeLeft: '{time} minutos restantes',
			votesLeft: 'Votos - {num} restantes',
			pollWinner: 'Ganador',
			goalQrTitle: 'Apóyame en',
			goalTopSuppoerters: {
				day: 'Los principales seguidores: Hoy',
				week: 'Los principales seguidores: Últimos 7 días',
				quarter: 'Los principales seguidores: Todo el tiempo',
				alltime: 'Los principales seguidores: Todo el tiempo',
			},
			supporterWatcherSponsorVideo: 'Vio el video de patrocinio',
			anonymous: 'Alguien',
			supportedYou: 'te apoyó',
			chatbotMsgs: [
				'Apóyame viendo los anuncios {link}',
				'Las donaciones sin dinero se inventaron aquí {link}',
				'Ahora es fácil apoyar mi transmisión: vea el enlace y vea los anuncios {link}',
				'Se aceptan donaciones, propinas y recortes. No se necesita tarjeta {link}',
				'Apóyame de nuevo, incluso si ya has hecho clic en el enlace {link}',
				'No necesitas una tarjeta bancaria cuando las donaciones son gratuitas {link}',
				'Cada clic en este enlace es tu apoyo para mi transmisión {link}',
				'Donaciones sin SMS y registro {link}',
			],
		},
	},
}

export default dict
