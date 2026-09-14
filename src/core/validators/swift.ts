import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const swift: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		if (typeof value === 'number') {
			value = value.toString()
		}

		if (/[^a-zA-Z0-9]/.test(value)) {
			callback(new Error(i18n.global.t('validator.swiftAllowedCharacters')))
		}
		else if (value.length !== 8 && value.length !== 11) {
			callback(new Error(i18n.global.t('validator.swiftLengthDescription')))
		}

		callback()
	},
	trigger: [Trigger.Change, Trigger.Blur],
}
