import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const zeroOrPositive: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const isValid = typeof +value === 'number' && +value >= 0
		if (!isValid) {
			callback(new Error(i18n.global.t('validator.positiveNum')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur, Trigger.Change],
}
