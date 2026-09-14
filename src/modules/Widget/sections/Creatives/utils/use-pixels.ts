import type { Ref } from 'vue'

import { Logger } from '@/core/helpers'
import type { ICreative, IDemoCreative } from '@/modules/Widget/types'

export const usePixels = () => {
	const getRandomString = () => {
		const random = Date.now().toString(36) + Math.random().toString(36).substr(2)

		return random.slice(0, 10)
	}

	const formatPixels = (pixels: string[], creative: ICreative | IDemoCreative) => {
		return pixels.map(url => {
			if (url.includes('{{viewers}}')) {
				url = url.replaceAll('{{viewers}}', creative.viewersCount.toString())
			}
			if (url.includes('{{random}}')) {
				url = url.replaceAll('{{random}}', getRandomString())
			}
			return url
		})
	}

	const callPixel = (id: string, src: string, ref: Ref<HTMLDivElement | null>) => {
		try {
			const oldPixel = document.getElementById(id)
			if (oldPixel) oldPixel.remove()

			const url = new URL(src)

			const img = document.createElement('img')
			img.id = id
			img.width = 1
			img.height = 1
			img.src = url.href
			ref.value?.appendChild(img)
		}
		catch (err) {
			Logger.error(`Error adding pixel: ${src}`, false, err)
		}
	}

	const callImpressionPixels = (pixels: string[], ref: Ref<HTMLDivElement | null>) => {
		if (pixels?.length) {
			for (let i = 0; i < pixels.length; i++) {
				const pixel = pixels[i]
				callPixel('pixel-impression-' + i, pixel, ref)
			}
		}
	}

	return {
		formatPixels,
		callImpressionPixels,
	}
}
