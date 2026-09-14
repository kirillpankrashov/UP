import { AdFormat } from '@/core/types'
import { Logger } from '@/core/helpers'
import { isExternalFormat } from '@/core/helpers'
import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'

import {
	tryPreloadImage,
	tryPreloadUnit,
	tryPreloadVideo,
} from './preload-utils'

export const preloadCreatives = async <T extends ICreative | IDemoCreative | IPromoCreative>(
	adSet: Array<T>,
): Promise<{
  preloaded: Array<T>
}> => {
	const preloaded: Array<T> = []

	for (const ad of adSet) {
		const { video, image, unit, zip } = ad.attachments

		if (
			isExternalFormat(ad.adSet.format) ||
			ad.adSet.format === AdFormat.CHATBOT_TEXT
		) {
			preloaded.push(ad)
			continue
		}

		if (!video && !image && !unit && !zip) {
			Logger.warning('Undefined attachment format', false, { creativeSlug: ad.slug })
			return { preloaded }
		}

		try {
			await tryPreloadImage(ad)
			await tryPreloadVideo(ad)
			await tryPreloadUnit(ad)
			// zip does not require preloading
			preloaded.push(ad)
		}
		catch (err) {
			Logger.warning('Attachment was not preloaded before showing ads', false, { err, creativeSlug: ad.slug })
		}
	}

	return { preloaded }
}
