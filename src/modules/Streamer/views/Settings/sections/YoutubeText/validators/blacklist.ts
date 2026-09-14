import type { ComposerTranslation } from 'vue-i18n'
import type { FormItemRule } from 'element-plus'

import { useYoutube } from '@/core/hooks'
import { Trigger } from '@/core/validators/consts/types'

const { getYouTubeVideoId, isYouTubeLink } = useYoutube()

export const blacklist = (t: ComposerTranslation): FormItemRule => ({
	validator: (rule: any, value: string, callback: (error?: string | Error | undefined) => void) => {
		try {
			if (value === '') {
				callback()
			}
			const list = value
				.trim()
				.replaceAll('\n', ',')
				.split(',')
				.filter(url => !!url.trim())

			list.forEach(url => {
				new URL(url)
				if (!isYouTubeLink(url)) {
					throw new Error(t('settings.youtubeText.blacklist.errors.notYoutube'))
				}
				const videoId = getYouTubeVideoId(url)
				if (!videoId) {
					throw new Error(t('settings.youtubeText.blacklist.errors.notYoutube'))
				}
			})
			callback()
		}
		catch(err) {
			if (err instanceof TypeError) {
				callback(new Error(t('settings.youtubeText.blacklist.errors.invalidLink')))
			}
			else {
				if (err instanceof Error) {
					callback(new Error(err.message))
				}
			}
		}
	},
	trigger: [Trigger.Change],
})
