import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const email: FormItemRule = {
	type: 'email',
	message: i18n.global.t('validator.invalidEmail'),
	trigger: [Trigger.Blur],
}
