import { ref } from 'vue'
import Echo from 'laravel-echo'
import type { PusherPrivateChannel } from 'laravel-echo/dist/channel'
import type { Channel } from 'pusher-js'

import { PusherDebugEventName, PusherDebuggerEventName, PusherEventName } from '@/core/types'
import { pusher } from '@/core/pusher'
import { responseToWidgetAdapter } from '@/modules/Widget/adapters/widget'
import { Widget } from '@/modules/Widget/class/Widget'
import {
	type IChatbotDisconnect,
	type IConversionAlert,
	type ICreativesResponse,
	type IDemoCreativeResponse,
	type IRealDemoCreativeResponse,
	type IWidgetResponse,
	type PusherEvent,
	RequestType,
} from '@/modules/Widget/types'

export class Pusher {
	private widget: Widget
	private channelName = ''
	subscribersCount = ref<number>(0)

	channel: Channel | null = null
	privateChannel: PusherPrivateChannel | null = null

	constructor (widget: Widget) {
		this.widget = widget
	}

	init () {
		if (!this.widget.slug) return

		if (window.echo) {
			return
		}

		this.channelName = `uplify.ads.${this.widget.slug}`

		const {
			echo,
			subscribersCount,
		} = pusher(this.widget.slug)

		this.subscribersCount.value = subscribersCount

		echo.leaveAllChannels()

		this.listenChannel(echo)
		this.listenPrivateChannel(echo)
		this.listenChannelDebugEvents(echo)
	}

	private listenChannel (echo: Echo<any>) {
		this.channel = echo.channel(this.channelName)
			.listen(PusherEventName.SUBSCRIPTION_COUNT, (event: {subscription_count: number}) => {
				this.subscribersCount.value = event.subscription_count
			})
	}

	private listenPrivateChannel (echo: Echo<any>) {
		this.privateChannel = echo.private(this.channelName)
			.listen(PusherEventName.SUBSCRIPTION_SUCCEEDED, (event: PusherEvent<null>) => {
				this.privateChannel?.whisper(PusherDebugEventName.SESSION_INIT, this.widget.session.getData())
			})
			.listen(PusherEventName.WIDGET_UPDATED, (event: IWidgetResponse) => {
				this.widget.data.value = responseToWidgetAdapter(event)
			})
			.listen(PusherEventName.WIDGET_REFRESH, (event: PusherEvent<null>) => {
				if (event.status) {
					window.location.reload()
				}
			})
			.listen(PusherEventName.MANUAL_LAUNCH, async () => {
				await this.widget.creativesLoop.startAd()
			})
			.listen(PusherEventName.AUTO_LAUNCH, (event: PusherEvent<ICreativesResponse>) => {
				this.widget.requestLoop.resetNextCall(RequestType.BRAND_AWARENESS)

				if (event.status) {
					this.widget.streamInfo = event.data.stream
					this.widget.preparer.prepareCreatives(event)
				}

				this.checkVersion(event.version)
			})
			// .listen(PusherEventName.REFERRAL_LAUNCH, (event: PusherEvent<IPromoCreativeResponse[]>) => {
			// 	this.widget.requestLoop.resetNextCall(RequestType.REFERRAL_PROMO)
			// 	if (event.status) {
			// 		this.widget.preparer.preparePromoCreatives(event)
			// 	}
			// })
			.listen(PusherEventName.DEMO_REAL_LAUNCH, (event: PusherEvent<IRealDemoCreativeResponse[]>) => {
				if (event.status) {
					this.widget.preparer.prepareDemoCreatives(event)
				}
			})
			.listen(PusherEventName.DEMO_LAUNCH, (event: PusherEvent<IDemoCreativeResponse[]>) => {
				if (event.status) {
					this.widget.preparer.prepareDemoCreatives(event)
				}
			})
			.listen(PusherEventName.DEMO_REFERRAL_LAUNCH, (event: PusherEvent<IDemoCreativeResponse[]>) => {
				if (event.status) {
					this.widget.preparer.prepareDemoCreatives(event)
				}
			})
			.listen(PusherEventName.CHATBOT_DISCONNECT, (event: PusherEvent<IChatbotDisconnect>) => {
				if (event.status) {
					this.widget.data.value.botEnabled = false
				}
			})
			.listen(PusherEventName.CONVERTION_ALERT, (event: PusherEvent<IConversionAlert>) => {
				if (event.status) {
					this.widget.conversionAlert.showAlert(event.data)
				}
			})

	}

	private listenChannelDebugEvents (echo: Echo<any>) {
		echo.private(this.channelName)
			.listen(`.client-${PusherDebuggerEventName.DEBUGGER_CONNECTION}`, async () => {
				const obs = this.widget.obsWebSocket
				const userSettings = await obs.getUserSettings()

				this.privateChannel?.whisper(PusherDebugEventName.OBS_SETTINGS, userSettings)
			})
			.listen(`.client-${PusherDebuggerEventName.OBS_SETTINGS_DEFAULTS}`, async () => {
				const obs = this.widget.obsWebSocket

				obs.setupWidget()
			})
			.listen(`.client-${PusherDebuggerEventName.OBS_SETTINGS_CUSTOM}`, async (payload: { settings?: any }) => {
				const obs = this.widget.obsWebSocket

				if (payload?.settings) {
					obs.setupWidget(payload.settings)
				}
			})
			.listen(`.client-${PusherDebuggerEventName.WIDGET_REFRESH}`, async () => {
				window.location.reload()
			})
			.listen(`.client-${PusherDebuggerEventName.PING_SESSIONS}`, async () => {
				this.privateChannel?.whisper(PusherDebugEventName.SESSION_INIT, this.widget.session.getData())
			})
			.listen(`.client-${PusherDebuggerEventName.DELETE_SESSION}`, async (payload: { uuid: string }) => {
				if (this.widget.session?.uuid === payload.uuid) {
					this.widget.obsWebSocket.closeLayer()
				}
			})
	}

	private checkVersion (version: string) {
		if (version !== this.widget.version) {
			if (this.widget.version === null) {
				this.widget.version = version
			}
			else {
				window.location.reload()
			}
		}
	}
}
