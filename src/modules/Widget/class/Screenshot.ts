import { ErrorMessage, Platform } from '@/core/types'
import { ScreenshotApi } from '@/core/client'
import { Logger } from '@/core/helpers'
import { Widget } from '@/modules/Widget/class/Widget'
import { SCREENSHOT_DELAY, SCREENSHOT_TIMEOUT } from '@/modules/Widget/constants/delays'
import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'
import { wait } from '@/modules/Widget/utils/wait'

export class Screenshot {
	widget: Widget
	enabled = false
	private timer: NodeJS.Timeout | null = null

	constructor (widget: Widget) {
		this.widget = widget
	}

	enable () {
		if (this.enabled) return

		this.enabled = true

		this.timer = setTimeout(() => {
			this.enabled = false
		}, SCREENSHOT_TIMEOUT)
	}

	disable () {
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.enabled = false
	}

	async makeScreenshot (
		creative: ICreative | IDemoCreative | IPromoCreative,
		attempt = 1,
	) {
		if (!this.enabled) {
			if (!creative.adSet?.makeScreenshots) {
				return
			}
		}

		if (this.widget.pusher.subscribersCount.value > 1) return

		if (!creative || !this.widget.data) return

		await wait(SCREENSHOT_DELAY)

		const data = this.getScreenshotData(creative)

		if (!data) return

		if (!data?.impression && data?.ad?.toLowerCase() === 'demo') return

		try {
			await ScreenshotApi.post(
				this.widget.data.value.platform,
				JSON.stringify(data),
				{ showMessage: false },
			)
			Logger.debug(`Make screenshot for: ${creative.slug}`)
		}
		catch (err) {
			if (attempt > 0) {
				setTimeout(() => {
					this.makeScreenshot(creative, attempt - 1)
				}, 45 * 1000)
			}
			else {
				Logger.critical(ErrorMessage.WIDGET_MAKE_SCREENSHOT, false, err)
			}
		}
	}

	private getScreenshotData (creative: ICreative | IDemoCreative | IPromoCreative) {
		const widgetData = this.widget.data.value

		if (widgetData.platform === Platform.YOUTUBE) {
			return {
				slug: this.widget.streamInfo?.id,
				ad: creative.slug,
				impression: creative.impressionSlug,
			}
		}

		switch (widgetData.platform) {
			case Platform.TWITCH:
			case Platform.TROVO:
			case Platform.VK_PLAY:
				return {
					nickname: widgetData[widgetData.platform]?.nickname,
					ad: creative.slug,
					impression: creative.impressionSlug,
				}
			default:
				return null
		}
	}
}
