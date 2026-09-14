import axios from 'axios'

import type { ITwitchClipGetResponse } from './types'

export const getTwitchClip = async ({
	clipId,
	accessToken,
	clientId,
}: {
	clipId: string
	accessToken: string
	clientId: string
}): Promise<ITwitchClipGetResponse> => {
	const response = await axios.get<ITwitchClipGetResponse>(
		`https://api.twitch.tv/helix/clips?id=${clipId}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-Id': clientId,
			},
		},
	)

	return response.data
}

