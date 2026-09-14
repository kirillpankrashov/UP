import axios from 'axios'
import Echo from 'laravel-echo'
import { type AuthorizerCallback, Channel } from 'pusher-js'

import { SocketEvent } from '@/core/types/socket-event'

export class Socket {
	url = `${import.meta.env.VITE_APP_API_URL}broadcasting/auth`
	Echo: Echo<any> | null = null
	slug: string

	constructor (slug: string) {
		this.slug = slug

		this.init()
	}

	init () {
		this.Echo = new Echo({
			broadcaster: 'pusher',
			key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			forceTLS: true,
			authorizer: (channel: Channel) => ({
				authorize: async (socketId: number, callback: AuthorizerCallback) => {
					const params = {
						socket_id: socketId,
						channel_name: channel.name,
						slug: this.slug,
					}

					try {
						const res = await axios.post(this.url, params)

						callback(null, res.data)
					}
					catch (err) {
						callback(err as Error, null)
					}
				},
			}),
		})
	}

	listen (callback: (event: SocketEvent, payload: any) => void) {
		if (!this.Echo) {
			return
		}

		this.Echo.private(`uplify.ads.${this.slug}`)
			.listen(SocketEvent.WIDGET_UPDATED, (payload: any) => {
				callback(SocketEvent.WIDGET_UPDATED, { ...payload, status: true })
			})
			.listen(SocketEvent.MANUAL_LAUNCH, (payload: any) => {
				callback(SocketEvent.MANUAL_LAUNCH, payload)
			})
			.listen(SocketEvent.AUTO_LAUNCH, (payload: any) => {
				callback(SocketEvent.AUTO_LAUNCH, payload)
			})
			.listen(SocketEvent.FETCHING_AD, (payload: any) => {
				callback(SocketEvent.FETCHING_AD, payload)
			})
			.listen(SocketEvent.CHATBOT_MESSAGE_SENT, (payload: any) => {
				callback(SocketEvent.CHATBOT_MESSAGE_SENT, payload)
			})
			.listen(SocketEvent.REFERRAL_LAUNCH, (payload: any) => {
				callback(SocketEvent.REFERRAL_LAUNCH, payload)
			})
			.listen(SocketEvent.DEMO_REAL_LAUNCH, (payload: any) => {
				callback(SocketEvent.DEMO_LAUNCH, payload)
			})
			.listen(SocketEvent.DEMO_LAUNCH, (payload: any) => {
				callback(SocketEvent.DEMO_LAUNCH, payload)
			})
			.listen(SocketEvent.DEMO_REFERRAL_LAUNCH, (payload: any) => {
				callback(SocketEvent.DEMO_LAUNCH, payload)
			})
	}

	leave () {
		if (!this.Echo) {
			return
		}

		this.Echo.leave(`uplify.ads.${this.slug}`)
	}
}
