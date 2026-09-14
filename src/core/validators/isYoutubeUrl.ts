import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const isYoutubeUrl: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
		const isYoutubeUrl = youtubeRegex.test(value)

		if (!isYoutubeUrl) {
			callback(new Error(i18n.global.t('validator.youtubeUrl')))
		}
		else {
			callback()
		}
	},
	trigger: [Trigger.Blur, Trigger.Change],
}
