import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const isArrayOfUrls: FormItemRule = {
	validator: (rule: any, value: string[], callback: (error?: string | Error | undefined) => void) => {
		for (const url of value.filter(val => val !== '')) {
			if (!/^https?:\/\/.+\..+/.test(url)) {
				return callback(new Error(i18n.global.t('validator.urlsAreInvalid')))
			}
		}
		callback()
	},
	trigger: [Trigger.Blur],
}
