import { default as baseDict } from './en'

const dict: typeof baseDict = {
	emailVerification: {
		verifing: 'Verificando seu email ...',
		verifingSuccess: 'Seu email verificado',
		verifingError: {
			general: 'ocorreu um erro',
			token: 'Sem token fornecido',
		},
	},
}

export default dict
