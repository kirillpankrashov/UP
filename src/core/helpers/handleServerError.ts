import axios from 'axios'

import { getFirstErrorCode } from '@/core/client/getFirstErrorCode'
import { getFirstErrorMessage } from '@/core/client/getFirstErrorMessage'
import { Logger } from '@/core/helpers'

export const handleServerError = (error: any, defaultMessage: string = 'Error') => {
	if (axios.isAxiosError(error)) {
		const message = getFirstErrorMessage(error)
		const code = getFirstErrorCode(error)
		Logger.error(`${code}: ${message}`, true, error)
	}
	else {
		Logger.error(defaultMessage, true, error)
	}
}
