import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'

function hasErrorMessage (value: unknown): value is { message: string } {
	return typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string'
}

export const preloadVideo = (path: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		// VAST ads has xml format
		if (path.includes('.xml')) {
			resolve()
			return
		}

		const video = document.createElement('video')
		const errorTimeout = setTimeout(() => {
			reject(new Error(`Video ${path} is not loaded`))
		}, 60 * 1000)

		video.onloadeddata = function () {
			clearTimeout(errorTimeout)
			video.remove()
			resolve()
		}
		video.setAttribute('src', path)
	})
}

export const preloadImage = (path: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const image = new Image()
		const errorTimeout = setTimeout(() => {
			reject(new Error(`Image ${path} is not loaded`))
		}, 60 * 1000)

		image.onload = function () {
			clearTimeout(errorTimeout)
			image.remove()
			resolve()
		}
		image.setAttribute('src', path)
	})
}

export const preloadUnit = async (path: string): Promise<void> => {
	const lowerCasePath = path.toLowerCase()
	if (/\.mp4|\.webm$/.test(lowerCasePath)) {
		return await preloadVideo(path)
	}
	else if (/\.jpg|\.jpeg|\.png|\.gif$/.test(lowerCasePath)) {
		return await preloadImage(path)
	}
	else {
		throw new Error('Undefined unit format')
	}
}

export const tryPreloadImage = async (ad: ICreative | IDemoCreative | IPromoCreative) => {
	if (ad.attachments.image) {
		try {
			await preloadImage(ad.attachments.image.path)
		}
		catch (err) {
			throw new Error(hasErrorMessage(err) ? err.message : 'Image was not preloaded')
		}
	}
	return null
}

export const tryPreloadVideo = async (ad: ICreative | IDemoCreative | IPromoCreative) => {
	if (ad.attachments.video) {
		try {
			await preloadVideo(ad.attachments.video.path)
		}
		catch (err) {
			throw new Error(hasErrorMessage(err) ? err.message : 'Video was not preloaded')
		}
	}
}

export const tryPreloadUnit = async (ad: ICreative | IDemoCreative | IPromoCreative) => {
	if (ad.attachments.unit) {
		try {
			await preloadUnit(ad.attachments.unit.path)
		}
		catch (err) {
			throw new Error(hasErrorMessage(err) ? err.message : 'Unit was not preloaded')
		}
	}
}
