import type { Router } from 'vue-router'

import { getToken } from '@/core/helpers'
import type { RuleForm } from '@/components/StreamerSettingsForm'
import { RouteName } from '@/modules/Auth/router'

import { checkStreamerParams } from './checkStreamerParams'

export const checkStreamerSettings = (router: Router, model: RuleForm) => {
	if (!getToken()) {
		router.push({ name: RouteName.AUTH_STREAMER })
		return
	}

	checkStreamerParams(model)
}
