import type { TStreamerDemoData, TStreamerDemoResponse } from './types'

export const responseToData = (response: TStreamerDemoResponse): TStreamerDemoData => {
	return {
		accessToken: response.access_token,
	}
}
