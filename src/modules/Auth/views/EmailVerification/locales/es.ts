import { default as baseDict } from './en'

const dict: typeof baseDict = {
	emailVerification: {
		verifing: 'Verificar su correo electrónico...',
		verifingSuccess: 'Su correo electrónico verificado',
		verifingError: {
			general: 'Se ha producido un error',
			token: 'No se proporciona token',
		},
	},
}

export default dict
