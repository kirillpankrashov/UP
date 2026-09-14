import type { TAttachPlatformModel, TAttachPlatformPayload } from './types'

export const modelToPayload = (model: TAttachPlatformModel): TAttachPlatformPayload => {
	return {
		provider: model.provider,
	}
}
