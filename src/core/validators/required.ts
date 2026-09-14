import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const required: FormItemRule = {
	required: true,
	message: i18n.global.t('validator.required'),
	trigger: [Trigger.Blur],
}
