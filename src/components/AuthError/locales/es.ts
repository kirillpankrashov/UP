import { default as baseDict } from './en'

const dict: typeof baseDict = {
	errors: {
		accountBlocked: 'La cuenta está bloqueada. Si esto es un error, por favor ',
		twitchAuthError: 'Error de autorización. Intenta nuevamente o',
		youtubeAuthError: 'Error de autorización de YouTube. Intenta nuevamente o',
		trovoAuthError: 'Error de autorización de Trovo. Inténtalo de nuevo o',
		vkplayAuthError: 'Error de autorización de VK Play. Inténtalo de nuevo o',
		tiktokAuthError: 'Error de autorización de TikTok. Inténtalo de nuevo o',
		discordAuthError: 'Error de autorización de Discord. Inténtalo de nuevo o',
		accountAlreadyExists: 'Estás intentando conectar una plataforma que está vinculada a un perfil diferente.',
		contactSupport: 'póngase en contacto con el soporte',
		user: 'No&nbsp;fue posible obtener datos sobre el&nbsp;usuario. Si&nbsp;no&nbsp;tiene un&nbsp;canal, lo&nbsp;crea y&nbsp;repite nuevamente.',
	},
}

export default dict
