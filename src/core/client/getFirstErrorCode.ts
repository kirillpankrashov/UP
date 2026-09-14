import type { ErrorType } from '@/core/client/types'

export const getFirstErrorCode = (error: ErrorType): string | undefined => {
	if ('messages' in error) {
		const firstItem = error.messages[0]
		const isObject = firstItem && typeof firstItem === 'object'
		if (isObject && 'code' in firstItem) {
			return firstItem.code
		}
	}

	return undefined
}
