import type { ILinkProfile } from '@/core/types/link/profile'

export const modelToPayload = (model: ILinkProfile): ILinkProfile => {
	return {
		about: model.about,
		gears: model.gears,
		socialLinks: model.socialLinks,
		schedule: model.schedule,
		linkName: model.linkName,
		telegramChannel: model.telegramChannel,
		theme: model.theme,
		banner: model.banner,
	}
}
