import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const bic: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		if (typeof value === 'number') {
			value = value.toString()
		}
		else if (/[^0-9]/.test(value)) {
			callback(new Error(i18n.global.t('validator.bic')))
		}
		else if (value.length !== 9) {
			callback(new Error(i18n.global.t('validator.bic')))
		}
		callback()
	},
	trigger: [Trigger.Blur],
}
