import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'

export const getCreativeDuration = (creatives: ICreative[] | IDemoCreative[] | IPromoCreative[]) => {
	let duration = 0

	creatives.forEach(creative => {
		const { attachments } = creative

		if (attachments.video) {
			duration += Math.floor(attachments.video.properties.duration || 0)
		}
		else if (attachments.unit) {
			if (attachments.unit.properties.duration) {
				duration += Math.floor(attachments.unit.properties.duration || 0)
			}
			// else {
			//   duration += 15
			// }
		}
		else if (attachments.zip) {
			duration += 15
		}
	})

	return duration * 1000
}
