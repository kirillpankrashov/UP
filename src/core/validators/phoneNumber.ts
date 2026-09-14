import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const phoneNumber = (isValidPhone: boolean): FormItemRule => ({
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		if (!isValidPhone) {
			callback(i18n.global.t('validator.invalidPhoneNumber'))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur],
})
