import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const isUrl: FormItemRule = {
	type: 'url',
	message: i18n.global.t('validator.urlIsInvalid'),
	trigger: [Trigger.Blur],
}
