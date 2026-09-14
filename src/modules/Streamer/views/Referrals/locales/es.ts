import { default as baseDict } from './en'

const dict: typeof baseDict = {
	referrals: {
		header: {
			title: 'Programa de referidos',
		},
		unavailable: 'Lo sentimos, el programa de referidos no está disponible para ti o para tu región. <br>Escribe a nosotros en <a href="https://discord.gg/EntbmDUxaZ" target="_blank">Discord</a> o en el chat del sitio web si tienes alguna pregunta.',
		invite: {
			title: 'Invita a tus amigos',
			description: 'Recibe {referrer} por cada amigo que invites, y tu amigo recibirá {referral} después de completar el registro y mostrar los primeros anuncios.',
			invited: 'Invitar',
			reward: 'Cantidad para pagar',
			link: 'Enlace de invitación',
			advice: {
				title: '¿Cómo me pagan?',
				description: 'Recibirás un pago cuando un amigo se registre en Uplify, confirme el correo electrónico y muestre campañas para 5,000 vistas',
				link: {
					label: 'Términos del programa de referir a un amigo',
					url: '/',
				},
			},
		},
		promotion: {
			title: 'Promoción en stream',
			switchLabel: 'Promociona Uplify en tu stream.',
			advice: {
				title: 'Cómo funciona:',
				description: 'Puedes promocionar nuestro servicio en tu stream. Recibirás {referrer} y tus referidos recibirán {referral} después de completar todos los términos. <br/><br/>Cada dos horas, Uplify enviará un banner personalizado durante la transmisión en vivo, instando a unirse a nuestro servicio.',
			},
			link: {
				label: 'Lea más sobre la promoción',
				url: '/',
			},
			demo: {
				title: 'Haga clic para ver la vista previa de un banner en el software de transmisión.',
			},
		},
		panels: {
			title: 'Paneles de Twitch',
			description: 'Coloque un banner debajo de su reproductor para invitar a más usuarios.',
		},
		history: {
			title: 'Historial de invitaciones',
			none: 'Aún no has invitado a nadie :(',
			columns: {
				creator: 'Referido',
				date: 'Fecha de unión',
				status: 'Estado',
				impressions: 'Vistas publicitarias',
			},
			paid: 'Pagado',
			waiting: 'Esperando',
		},
		updated: {
			invite: {
				title: 'Invita a tus amigos',
				description: 'Recibe {referrer} por cada amigo que invites, y tu amigo recibirá {referral} después de completar el registro y mostrar los primeros anuncios.',
				invited: 'Invitar',
				reward: 'Cantidad para pagar',
				link: 'Enlace de invitación',
				advice: {
					title: '¿Cómo me pagan?',
					description: 'Puede promocionar UPLIFY en su transmisión en vivo.Ganará el 5% de los ingresos de todos los cretors que se refiere. <br/><br/>Cada dos horas, Uplify enviará un banner personalizado durante la transmisión en vivo, instando a unirse a nuestro servicio.',
					link: {
						label: 'Términos del programa de referir a un amigo',
						url: '/',
					},
				},
			},
			promotion: {
				title: 'Promoción en stream',
				switchLabel: 'Promociona Uplify en tu stream.',
				advice: {
					title: 'Cómo funciona:',
					description: 'Puedes promocionar nuestro servicio en tu stream. Recibirás {referrer} y tus referidos recibirán {referral} después de completar todos los términos.',
				},
				link: {
					label: 'Lea más sobre la promoción',
					url: '/',
				},
				demo: {
					title: 'Haga clic para ver la vista previa de un banner en el software de transmisión.',
				},
			},
			history: {
				advice: {
					title: 'Es importante saber',
					description: '<strong>Invitado</strong>: el&nbsp;usuario se&nbsp;ha&nbsp;registrado pero no&nbsp;ha&nbsp;completado la&nbsp;incorporaci&oacute;n.<br/><br/><strong>Incorporado</strong>: el&nbsp;usuario ha&nbsp;completado la&nbsp;incorporaci&oacute;n y&nbsp;est&aacute; listo para mostrar campa&ntilde;as patrocinadas.',
				},
				invited: 'Invitado',
				hasImpressions: 'Incorporado',
			},
		},
	},
}

export default dict
