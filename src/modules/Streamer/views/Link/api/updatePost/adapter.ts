import type { ILinkPost } from '@/core/types/link'
import type { ILinkPostModel } from '@/modules/Streamer/views/Link/store'

export const modelToPayload = (model: ILinkPost): ILinkPostModel => {
	return {
		content: model.content || '',
		embed: model.embed || '',
	}
}
