import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const passwordConfirmation = (password: string): FormItemRule => ({
	validator (rule: any, value: string, callback: (error?: string | Error | undefined) => void) {
		if (value.length < 8) {
			return callback(new Error(i18n.global.t('validator.shortPassword')))
		}
		if (value !== password) {
			return callback(new Error(i18n.global.t('validator.matchPassword')))
		}
		callback()
	},
	trigger: [Trigger.Blur, Trigger.Change],
})
