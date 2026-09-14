import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const cyrillic: FormItemRule = {
	validator: (rule: any, value: string, callback: (error?: string | Error | undefined) => void) => {
		const regexp = new RegExp('^[а-яА-ЯёЁ -]+$')
		if (!regexp.test(value)) {
			callback(new Error(i18n.global.t('validator.onlyCyrillic')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur],
}
