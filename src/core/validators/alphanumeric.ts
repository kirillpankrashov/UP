import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const alphanumeric: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const regexp = new RegExp('^[a-zA-Z0-9]+$')
		if (!regexp.test(value)) {
			callback(new Error(i18n.global.t('validator.alphanumeric')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur],
}
