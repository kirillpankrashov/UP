import { ErrorMessage } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as WidgetApi from '@/modules/Widget/api'
import { Widget } from '@/modules/Widget/class/Widget'
import { BRAND_AWARENESS_COOLDOWN, BS_CHECK_BEFORE_REQUEST, REQUEST_INTERVAL, REQUEST_LOOP_TICK } from '@/modules/Widget/constants/delays'
import { RequestType } from '@/modules/Widget/types'
import { wait } from '@/modules/Widget/utils/wait'

interface IRequest {
  nextCall: number
  cooldown: number
  call: () => void | Promise<void>
}

export class RequestLoop {
	widget: Widget
	pause = false
	isSafe = true
	interval: NodeJS.Timeout | null = null
	requests: Record<RequestType, IRequest> = {
		[RequestType.BRAND_SAFETY]: {
			nextCall: new Date().getTime(),
			cooldown: REQUEST_INTERVAL + BRAND_AWARENESS_COOLDOWN,
			call: async () => {
				if (this.widget.pusher.subscribersCount.value > 1) return

				if (!this.widget.data.value.bsRequired) {
					return
				}

				if (this.widget.isLowFrequency) {
					return
				}

				Logger.debug('BS CHECK')

				try {
					const res = await WidgetApi.checkForBS({ slug: this.widget.slug })
					this.isSafe = res.status
				}
				catch (err) {
					Logger.error(ErrorMessage.WIDGET_BRAND_SAFETY, false, err)
					this.isSafe = false
				}
			},
		},
		[RequestType.BRAND_AWARENESS]: {
			nextCall: new Date().getTime(),
			cooldown: REQUEST_INTERVAL + BRAND_AWARENESS_COOLDOWN,
			call: async () => {
				if (this.widget.pusher.subscribersCount.value > 1) return

				if (this.widget.data.value.bsRequired && !this.isSafe) {
					return
				}

				Logger.debug('AD REQUEST')

				const data = {
					width: window.innerWidth,
					height: window.innerHeight,
				}
				await WidgetApi.fetchBrandAwareness({ slug: this.widget.slug, data })
			},
		},
		// [RequestType.REFERRAL_PROMO]: {
		// 	nextCall: new Date().getTime() + REFERRAL_PROMO_COOLDOWN,
		// 	cooldown: REFERRAL_PROMO_COOLDOWN,
		// 	call: () => {
		// 		if (this.widget.pusher.subscribersCount.value > 1) return

		// 		Logger.debug('REFERRAL REQUEST')

		// 		WidgetApi.fetchReferralPromo({ slug: this.widget.slug })
		// 	},
		// },
	}

	constructor (widget: Widget) {
		this.widget = widget
	}

	async init () {
		this.check(RequestType.BRAND_SAFETY)

		await wait(BS_CHECK_BEFORE_REQUEST)

		this.interval = setInterval(async () => {
			if (!this.widget.widgetResolutionIsCorrect) return
			if (this.widget.pusher.subscribersCount.value > 1) return

			const isCreativesQueueFullfilled = this.widget.creativesLoop.queue.length > 10
			if (isCreativesQueueFullfilled) return

			for (const key in this.requests) {
				this.check(key as RequestType)
			}
		}, REQUEST_LOOP_TICK)
	}

	resetNextCall (type: RequestType, _coolDown = 0) {
		const coolDown = _coolDown || this.requests[type].cooldown
		this.requests[type].nextCall = new Date().getTime() + coolDown
	}

	async check (type: RequestType) {
		const now = new Date().getTime()
		const request = this.requests[type]

		if (now > request.nextCall) {
			this.resetNextCall(type)
			this.callRequest(request, type)
		}
	}

	async callRequest (request: IRequest, type: RequestType) {
		try {
			await request.call()
		}
		catch (error) {
			this.catchRequestError(error, type)
		}
	}

	catchRequestError (error: unknown, type: RequestType) {
		if (typeof error === 'string') {
			Logger.warning(`Failed request for ${type}: ${error}`, false)
			return
		}

		if (typeof error === 'object' && error !== null) {
			if ('code' in error) {
				const isRequiremenetsNotMet = error.code === 'ADS_ERRORS_REQUIRES'
				const isNoActiveCampaigns = error.code === 'ADS_ERRORS_EMPTY'
				const isBlocked = error.code === 'ADS_ERRORS_BLOCKED'

				// skip unimportant errors
				if (isRequiremenetsNotMet || isNoActiveCampaigns || isBlocked) {
					return
				}
			}

			if ('message' in error) {
				Logger.warning(`Failed request for ${type}: ${error.message}`, false, { error })
			}
			else if ('code' in error) {
				Logger.warning(`Failed request for ${type}: ${error.code}`, false, { error })
			}

			return
		}

		Logger.warning(`Failed request for ${type}: undefined error`, false, { error })
	}

	reinit () {
		this.destroy()

		this.requests[RequestType.BRAND_SAFETY].cooldown = this.widget.frequency + BRAND_AWARENESS_COOLDOWN
		this.requests[RequestType.BRAND_AWARENESS].cooldown = this.widget.frequency + BRAND_AWARENESS_COOLDOWN

		this.init()

		for (const key in this.requests) {
			this.resetNextCall(key as RequestType)
		}
	}

	destroy () {
		if (this.interval) {
			clearInterval(this.interval)
			this.interval = null
		}
	}
}
