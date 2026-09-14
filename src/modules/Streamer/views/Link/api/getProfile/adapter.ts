import { type ILinkProfile, LinkColorTheme } from '@/core/types/link'

import type { ILinkProfileResponse } from './types'

export const responseToData = (response: ILinkProfileResponse): ILinkProfile => {
	return {
		about: response.about || '',
		gears: response.gears || [],
		socialLinks: response.socialLinks || [],
		schedule: response.schedule || {
			data: [],
			text: '',
		},
		linkName: response.linkName || null,
		telegramChannel: response.telegramChannel || null,
		theme: response.theme || LinkColorTheme.LIGHT,
		banner: response.banner || null,
	}
}
