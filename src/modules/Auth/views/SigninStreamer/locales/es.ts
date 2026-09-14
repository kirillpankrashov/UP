import { default as baseDict } from './en'

const dict: typeof baseDict = {
	signinStreamer: {
		title: '¡Hola! 👋',
		subtitle: 'Inicia sesión o regístrate en tus cuentas usando una de tus plataformas de streaming.',
		startWithTwitch: 'Continuar con Twitch',
		startWithYoutube: 'Continuar con YouTube',
		startWithTrovo: 'Continuar con Trovo',
		partnerLogin: 'Iniciar sesión para asociados',
		termsAndPolicy: 'Al iniciar sesión aceptas los <a href="https://www.uplify.app/legal/terms" target="_blank">Términos</a> y la <a href="https://www.uplify.app/legal/privacy-policy" target="_blank">Política de privacidad</a>.',
		tryDemo: 'Try demo account',
		info: {
			block1: {
				title: 'Uplify ayuda a&nbsp;monetizar el&nbsp;contenido de&nbsp;transmisi&oacute;n en&nbsp;vivo de&nbsp;una manera moderna.',
				linkText: 'Aprende más sobre nosotros',
				linkHref: 'https://www.uplify.app/es/para-creadores',
				videoHref: 'https://youtu.be/JKWaUjlIML0?si=vVppKgzscrBYX-6S',
			},
			block2: {
				title: 'Contamos con la&nbsp;confianza de&nbsp;<strong>35&nbsp;000 creadores</strong> y&nbsp;hemos pagado m&aacute;s de&nbsp;<strong>$3&nbsp;000&nbsp;000</strong>.',
				linkText: 'Únete a nuestra comunidad de Discord',
				linkHref: 'https://discord.gg/EntbmDUxaZ',
			},
			block3: {
				title: '<strong>Formatos no&nbsp;alterados</strong> de&nbsp;marcas de&nbsp;renombre mundial.',
				linkText: 'Ver nuestros estudios de caso',
				linkHref: 'https://www.uplify.app/cases',
			},
		},
		errors: {
			demoSignin: 'Error al intentar iniciar sesión como demostración',
		},
	},
}

export default dict
