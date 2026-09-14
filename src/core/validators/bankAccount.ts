import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const bankAccount: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const regexp = new RegExp('^[0-9]+$')
		if (!regexp.test(value) || value.trim().length !== 20) {
			callback(new Error(i18n.global.t('validator.bankAccount')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur],
}
