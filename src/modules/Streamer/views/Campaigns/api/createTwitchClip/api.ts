import axios from 'axios'

import type { ITwitchClipCreateResponse } from './types'

export const createTwitchClip = async ({
	broadcasterId,
	accessToken,
	clientId,
}: {
	broadcasterId: string
	accessToken: string
	clientId: string
}): Promise<ITwitchClipCreateResponse> => {
	const response = await axios.post<ITwitchClipCreateResponse>(
		`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&duration=60`,
		{
			title: 'Stream Highlight',
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-Id': clientId,
			},
		},
	)

	return response.data
}

