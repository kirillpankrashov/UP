import { default as baseDict } from './en'

const dict: typeof baseDict = {
	emailVerification: {
		verifing: 'Подтверждаем почту...',
		verifingSuccess: 'Ваша почта подтверждена',
		verifingError: {
			general: 'Произошла ошибка',
			token: 'Отсутствует токен',
		},
	},
}

export default dict
