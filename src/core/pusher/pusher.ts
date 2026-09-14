import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher, { type AuthorizerCallback, type Channel } from 'pusher-js'

// @ts-ignore
window.Pusher = Pusher

const url = `${import.meta.env.VITE_APP_API_URL}broadcasting/auth`

export const pusher = (slug: string) => {
	const key = import.meta.env.VITE_APP_PUSHER_APP_KEY
	const cluster = import.meta.env.VITE_APP_PUSHER_APP_CLUSTER

	let subscribersCount = 0

	const echo = new Echo({
		broadcaster: 'pusher',
		key,
		cluster,
		forceTLS: true,
		authorizer: (channel: Channel) => ({
			authorize: async (socketId: number, callback: AuthorizerCallback) => {
				const params = {
					socket_id: socketId,
					channel_name: channel.name,
					slug: slug,
				}

				subscribersCount = channel.subscriptionCount as unknown as number

				try {
					const res = await axios.post(url, params)
					callback(null, res.data)
				}
				catch (error) {
					callback(error as Error, null)
				}
			},
		}),
	})

	window.echo = echo

	return { echo, subscribersCount }
}
