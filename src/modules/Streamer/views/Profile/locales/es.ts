import { default as baseDict } from './en'

const dict: typeof baseDict = {

	profile: {
		header: {
			title: 'Configuración de la cuenta',
		},
		tier: {
			whatIsTier: '¿Qué es un nivel?',
		},
		agency: {
			title: 'Agencia',
		},
		form: {
			howToChangeLanguage: 'Para cambiar el idioma de transmisión y el país, envíenos un mensaje en el chat o en Discord.',
		},
		advice: {
			title: 'Verificación de correo electrónico requerida',
			info: 'Solo te informamos sobre las noticias y actualizaciones más importantes.',
			noSpam: 'Sin spam.',
			clickLink: 'Haga clic en el enlace del correo electrónico de confirmación que le enviamos.',
			link: 'Enviar de nuevo',
			linkClicked: 'Correo enviado',
		},
		platforms: {
			title: 'Plataformas vinculadas',
			writeUsToDetach: 'Escribanos para desvincular',
		},
		discord: {
			title: 'Únete a nuestro servidor de Discord para mantenerte al día, obtener ayuda y subir de nivel.',
			status: {
				caption: 'Tu estado',
				connected: 'Conectado',
				notConnected: 'No conectado',
			},
		},
		deactivation: {
			title: 'Desactivación de cuenta',
			textBlock1: 'Si quieres tomar un descanso de Uplify, puedes desactivar temporalmente tu cuenta en lugar de eliminarla. Tu perfil no aparecerá en Uplify mientras estés ausente.',
			textBlock2: 'Si continúas, tu perfil y detalles de cuenta se eliminarán el <strong>{date}</strong>. No serás visible en Uplify entre ahora y entonces. Si cambias de opinión, puedes iniciar sesión antes de la fecha de eliminación y optar por mantener tu cuenta.',
			deactivateBtn: 'Desactivar',
			drawer: {
				title: 'Desactivar cuenta',
				subtitle: '¿Estás seguro de que quieres desactivar tu cuenta?',
				textBlock1: 'Cuando se desactiva una cuenta de Uplify, suceden lo siguiente con los datos de la cuenta:',
				textBlock2: [
					'El perfil, la página pública y el widget se ocultan de la plataforma y ya no serán visibles para otros usuarios.',
					'Cualquier tipo de campañas ya no estará disponible.',
					'El saldo estará disponible hasta que se elimine la cuenta y solo se puede pagar cuando se alcanza el umbral mínimo.',
					'Uplify conservará los datos de la cuenta mientras esté desactivada. El propietario de la cuenta puede reactivarla en&nbsp;en cualquier momento durante este período.',
					'Si&nbsp;la cuenta&nbsp;no se reactiva dentro de un&nbsp;cierto período de tiempo, Uplify puede eliminar los datos de la cuenta de forma permanente. Uplify afirma que este proceso puede tardar&nbsp;hasta&nbsp;40&nbsp;días.',
					'Uplify también establece que pueden retener cierta información de cuentas desactivadas si&nbsp;es&nbsp;es&nbsp;necesario para&nbsp;cumplir con obligaciones legales, resolver disputas, prevenir fraudes o&nbsp;hacer cumplir sus políticas.',
				],
				textBlock3: 'Es importante&nbsp;tener en cuenta que desactivar una&nbsp;cuenta no es&nbsp;lo mismo que&nbsp;eliminar una&nbsp;cuenta, y es&rsquo;un&nbsp;proceso reversible, donde la cuenta y sus datos pueden ser&nbsp;restaurados.',
				confirmBtn: 'Confirmar',
				cancelBtn: 'Cancelar',
			},
		},
	},
}

export default dict
