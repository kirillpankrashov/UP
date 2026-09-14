import type { ErrorType } from '@/core/client/types'

export const getFirstErrorMessage = (error: ErrorType, prefix = ''): string => {
	let message = ''

	if ('message' in error) {
		message = prefix + error.message
	}

	if ('messages' in error) {
		if (typeof error.messages[0] === 'string') {
			message = error.messages[0]
		}
		else {
			message = prefix + error.messages[0].text
		}
	}

	return message
}
