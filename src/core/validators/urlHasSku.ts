import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const urlHasSku: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const url = new URL(value)
		const sku = url.searchParams.get('sku')

		if (!sku) {
			callback(new Error(i18n.global.t('validator.urlHasSku')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur, Trigger.Change],
}
