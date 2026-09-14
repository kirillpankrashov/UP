import { ref } from 'vue'
import * as Sentry from '@sentry/vue'

import { AdvertisingMode, Role } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as WidgetApi from '@/modules/Widget/api'
import { ConvertionAlert } from '@/modules/Widget/class/ConvertionAlert'
import { CreativesLoop } from '@/modules/Widget/class/CreativesLoop'
import { CreativesManager } from '@/modules/Widget/class/CreativesManager'
import { ObsWebSocket } from '@/modules/Widget/class/ObsWebSocket'
import { Preparer } from '@/modules/Widget/class/Preparer'
import { Pusher } from '@/modules/Widget/class/Pusher'
import { RequestLoop } from '@/modules/Widget/class/RequestLoop'
import { Screenshot } from '@/modules/Widget/class/Screenshot'
import { Session } from '@/modules/Widget/class/Session'
import { AdFrequencyMap } from '@/modules/Widget/constants/ad-frequency-map'
import { defaultWidget } from '@/modules/Widget/constants/default-widget'
import { BS_CHECK_BEFORE_REQUEST, PRIMAL_TIMER_TIMEOUT } from '@/modules/Widget/constants/delays'
import type { GeoResponse, IStreamInfo, IWidget } from '@/modules/Widget/types'
import { AdFrequency } from '@/modules/Widget/types'
import { wait } from '@/modules/Widget/utils/wait'

export class Widget {
	slug: string
	pusher: Pusher
	session: Session = new Session(this)
	obsWebSocket: ObsWebSocket = new ObsWebSocket(this)
	version: string | null = null
	data = ref<IWidget>(defaultWidget)
	isLoaded = ref(false)
	isDebug = ref(false)
	requestLoop = new RequestLoop(this)
	creativesLoop = new CreativesLoop(this)
	creativesManager = new CreativesManager(this)
	preparer = new Preparer(this)
	conversionAlert = new ConvertionAlert(this)
	screenshot = new Screenshot(this)
	streamInfo: IStreamInfo | null = null
	initialFrequency: number = AdFrequencyMap[AdFrequency.FAST]
	frequency: number = this.initialFrequency

	constructor (slug = '') {
		this.slug = slug
		if (slug) {
			this.init()
		}
		this.pusher = new Pusher(this)
	}

	get isManual () {
		return this.data.value.advertising.mode === AdvertisingMode.MANUAL
	}

	get isStreamerDeactivated () {
		return this.data.value.streamer?.deleted || this.data.value.streamer?.deleted_request
	}

	get widgetResolutionIsCorrect () {
		if (window.innerWidth < 1200 || window.innerHeight < 700) {
			return false
		}
		return true
	}

	get isLowFrequency () {
		return [AdFrequencyMap[AdFrequency.FIVE], AdFrequencyMap[AdFrequency.TEN]].includes(this.frequency)
	}

	async init (): Promise<void> {
		this.disableStuff()

		Logger.debug('WIDGET INIT', false, { frequency: this.frequency })

		this.setIsDebug()
		await this.activateWidget()
		await this.fetchWidget()

		try {
			await this.obsWebSocket.init()
		}
		catch (error) {
			Logger.error('Error initializing OBS WebSocket', false)
		}

		if (this.isStreamerDeactivated) {
			return
		}

		this.pusher.init()
		this.isLoaded.value = true
		this.creativesLoop.init()

		await wait(PRIMAL_TIMER_TIMEOUT - BS_CHECK_BEFORE_REQUEST)

		this.requestLoop.init()
		this.screenshot.enable()
	}

	private setSentryContext (data: IWidget) {
		if (!Sentry || !data.streamer) return

		Sentry.setUser({
			id: data.streamer.user_id,
			email: data.streamer.email,
			username: data.streamer.name,
		})
		Sentry.setTag('version', data.version)
		Sentry.setTag('domain', data.streamer.domain)
		Sentry.setTag('role', Role.STREAMER)
		Sentry.setTag('platform', data.platform)
		Sentry.setContext('Widget', {
			slug: data.slug,
			platform: data.platform,
		})

		// Logger.error('Widget initialized')
	}

	restartWithNewFrequency (frequency: number) {
		Logger.debug('RESTARTING WIDGET WITH NEW FREQUENCY', false, { frequency })
		this.initialFrequency = frequency
		this.frequency = frequency

		this.requestLoop.reinit()
	}

	setIsDebug () {
		const url = new URL(window.location.href)
		this.isDebug.value = !!url.searchParams.get('debug')
	}

	async activateWidget (): Promise<void> {
		if (!this.slug) return
		try {
			await WidgetApi.enable({ slug: this.slug })
		}
		catch (error) {
			Logger.warning('Widget activating error', false, { slug: this.slug, error })

			// @ts-ignore
			if (error?.origin?.response?.status !== 404) {
				setTimeout(() => {
					this.activateWidget()
				}, 10000)
			}
			else {
				throw new Error(`Incorrect widget slug: ${this.slug}`)
			}
		}
	}

	async fetchWidget (): Promise<void> {
		if (!this.slug) return
		try {
			const res = await WidgetApi.fetch({ slug: this.slug })
			this.data.value = res
			this.version = res.version

			Logger.debug('WIDGET FETCHED', false, { version: this.version })

			// this.setSentryContext(res)
		}
		catch (err) {
			Logger.warning('Widget fetching error', false, { slug: this.slug, err })
		}
	}

	private disableStuff () {
		try {
			// @ts-ignore
			if ('Beamer' in window) window.Beamer?.destroy()
			// @ts-ignore
			if ('Intercom' in window) window.Intercom('shutdown')
		}
		catch (err) {
			Logger.warning('Error disabling analytics', false, { err })
		}
	}

	destroy () {
		// this.creativesLoop.destroy()
		this.requestLoop.destroy()
		// this.pusher.destroy()
	}
}
