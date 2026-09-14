import type { ISaveTwitchClipData, ISaveTwitchClipPayload } from './types'

export const dataToPayload = (data: ISaveTwitchClipData): ISaveTwitchClipPayload => {
	return {
		ad_set_id: data.adsetSlug,
		ad_set_name: data.adsetTitle,
		creators_id: data.streamerId,
		creators_name: data.streamerName,
		twitch_clip_url: data.clipUrl,
	}
}
