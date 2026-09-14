import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const password: FormItemRule = {
	validator (rule: any, value: any, callback: (error?: string | Error | undefined) => void) {
		if (value.length < 8) {
			return callback(new Error(i18n.global.t('validator.shortPassword')))
		}
		callback()
	},
	trigger: [Trigger.Change, Trigger.Blur],
}
