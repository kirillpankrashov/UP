import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const beginsWith = (startString: string): FormItemRule => ({
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const regexp = new RegExp(`^${startString}`)
		if (!regexp.test(value)) {
			callback(new Error(i18n.global.t('validator.beginsWith', { startString })))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur],
})
