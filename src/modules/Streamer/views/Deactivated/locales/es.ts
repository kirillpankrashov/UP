import { default as baseDict } from './en'

const dict: typeof baseDict = {
	deactivated: {
		title: 'Tu cuenta está desactivada',
		headline: 'Tu perfil y detalles de cuenta se ocultarán hasta <strong>{date}</strong> y se eliminarán en esa fecha.',
		textBlock1: 'Tu cuenta de Uplify está desactivada, ¿qué significa esto?',
		textBlock2: [
			'El perfil, la página pública y el widget están ocultos de la plataforma y ya no serán visibles para otros usuarios.',
			'No estarán disponibles ningún tipo de campañas.',
			'El saldo estará disponible hasta que se borre la cuenta y sólo se pagará cuando se alcance el umbral mínimo.',
			'Uplify mantendrá los datos de la cuenta mientras esté desactivada. El propietario de la cuenta puede reactivarla en cualquier momento durante este período.',
			'Si la cuenta no se reactiva dentro de un cierto período de tiempo, Uplify puede borrar los datos de la cuenta de forma permanente. Uplify indica que este proceso puede tardar hasta 40 días.',
			'Uplify también afirma que pueden retener cierta información de cuentas desactivadas si es necesario cumplir con obligaciones legales, resolver disputas, prevenir el fraude o hacer cumplir sus políticas.',
		],
		revokeBtn: 'Revocar',
	},
}

export default dict
