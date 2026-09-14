import type { Router } from 'vue-router'

import { Platform } from '@/core/types'
import { RouteName } from '@/modules/Streamer/router'
import { attachPlatform } from '@/modules/Streamer/views/Profile/api'

export type TAttachProps = {
	router: Router
	attachId: string
	platform: Platform
	fetchProfile: () => Promise<void>
	attachingPlatforms: boolean[]
}

export const attach = async ({
	router,
	attachId,
	platform,
	fetchProfile,
	attachingPlatforms,
}: TAttachProps) => {
	if (!attachingPlatforms.includes(true)) {
		return
	}

	try {
		await attachPlatform(
			{ provider: attachId },
			platform as Platform,
		)
		await fetchProfile()
	}
	finally {
		await router.push({ name: RouteName.PROFILE })
	}
}
