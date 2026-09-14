import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const birthYear: FormItemRule = {
	validator (rule: any, value: any, callback: (error?: string | Error | undefined) => void) {
		const maximumYear = new Date().getFullYear() - 12
		const minimumYear = 1960

		if (value < minimumYear) {
			return callback(new Error(`${i18n.global.t('validator.birthYearMore')} ${minimumYear - 1}`))
		}
		if (value > maximumYear) {
			return callback(new Error(`${i18n.global.t('validator.birthYearLess')} ${maximumYear + 1}`))
		}
		callback()
	},
	trigger: [Trigger.Change, Trigger.Blur],
}
